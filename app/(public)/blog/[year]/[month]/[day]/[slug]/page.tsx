import { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Blog, getBlogBySlug } from '@/lib/api/blogs'
import { cleanHtmlContent, stripHtmlTags } from '@/lib/utils/html-utils'
import PageLoading from '@/components/ui/PageLoading'
import Link from 'next/link'
import ProcessedHTML from '@/components/content/ProcessedHTML'

interface PageProps {
  params: {
    year: string
    month: string
    day: string
    slug: string
  }
}

/**
 * Generate metadata for the blog post page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params

  try {
    const blog = await getBlogBySlug(slug)
    
    if (!blog || blog.status !== 'published') {
      return {
        title: 'Blog Post Not Found | Cabin Rentals of Georgia',
        description: 'The blog post you are looking for could not be found.',
      }
    }

    const metaTitle = blog.meta_title || blog.title
    const metaDescription = blog.meta_description || 
      (blog.body_summary ? stripHtmlTags(blog.body_summary) : 
       blog.body ? stripHtmlTags(blog.body).substring(0, 160) : 
       `Read ${blog.title} on Cabin Rentals of Georgia`)

    return {
      title: `${metaTitle} | Cabin Rentals of Georgia`,
      description: metaDescription,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        type: 'article',
        publishedTime: blog.published_at || blog.created_at,
        modifiedTime: blog.updated_at || blog.created_at,
        ...(blog.featured_image_url && {
          images: [{ url: blog.featured_image_url }],
        }),
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post | Cabin Rentals of Georgia',
      description: 'Read our latest blog posts about North Georgia, cabin living, and travel tips',
    }
  }
}

/**
 * Validate that the date in the URL matches the blog post's published date
 * This ensures URLs like blog/2025/11/11/slug match the actual publication date
 */
function validateDate(blog: Blog, year: string, month: string, day: string): boolean {
  if (!blog.published_at && !blog.created_at) {
    return false
  }

  const blogDate = new Date(blog.published_at || blog.created_at)
  const urlYear = parseInt(year, 10)
  const urlMonth = parseInt(month, 10)
  const urlDay = parseInt(day, 10)

  // Validate date parts match
  return (
    blogDate.getFullYear() === urlYear &&
    blogDate.getMonth() + 1 === urlMonth && // getMonth() returns 0-11
    blogDate.getDate() === urlDay
  )
}

/**
 * Format date for display
 */
function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

async function BlogPostContent({ params }: PageProps) {
  const { year, month, day, slug } = params

  try {
    // Fetch blog by slug (ignoring date parts for lookup)
    const blog = await getBlogBySlug(slug)

    // Check if blog exists and is published
    if (!blog || blog.status !== 'published') {
      notFound()
    }

    // Optionally validate that the date in URL matches the blog's date
    // This ensures URLs are accurate but doesn't block access if dates don't match
    const dateMatches = validateDate(blog, year, month, day)
    
    // If date doesn't match, we could redirect to the correct URL
    // For now, we'll just show a warning in development
    if (!dateMatches && process.env.NODE_ENV === 'development') {
      console.warn(
        `Date mismatch: URL date ${year}/${month}/${day} doesn't match blog date ${blog.published_at || blog.created_at}`
      )
    }

    const publishedDate = blog.published_at || blog.created_at
    const formattedDate = formatDate(publishedDate)

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Blog header */}
          <header className="mb-8">
            <h1 className="text-4xl">{blog.title}</h1>

            {/* Featured image */}
            {blog.featured_image_url && (
              <div className="mb-8">
                <img
                  src={blog.featured_image_url}
                  alt={blog.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            )}
          </header>

          {/* Blog body */}
          {blog.body ? (
            <ProcessedHTML
              html={cleanHtmlContent(blog.body)}
              className="prose prose-lg max-w-none mb-8 block"
            />
          ) : (
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700">
                No content available for this blog post.
              </p>
            </div>
          )}

          {/* Blog summary/excerpt if available */}
          {blog.body_summary && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              <ProcessedHTML
                html={cleanHtmlContent(blog.body_summary)}
                className="prose prose-sm"
              />
            </div>
          )}
        </div>
      </div>
    )
  } catch (error: any) {
    // If blog not found or error, show 404
    console.error('Error fetching blog post:', error)
    
    if (error?.response?.status === 404) {
      notFound()
    }

    // For other errors, show error message
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-10">
            <h1 className="text-3xl font-bold mb-4">Error Loading Blog Post</h1>
            <p className="text-gray-700 mb-6">
              We encountered an error while loading this blog post. Please try again later.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  return (
    <Suspense fallback={<PageLoading message="Loading blog post..." variant="container" />}>
      <BlogPostContent params={params} />
    </Suspense>
  )
}

