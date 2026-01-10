import { Metadata } from 'next'
import { Suspense } from 'react'
import { getTermBySlug } from '@/lib/api/taxonomy'
import { getTestimonials, Testimonial } from '@/lib/api/testimonials'
import { cleanHtmlContent, stripHtmlTags } from '@/lib/utils/html-utils'
import PageLoading from '@/components/ui/PageLoading'
import Link from 'next/link'

const slug = 'blue-ridge-memories'

async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const data = await getTestimonials({
      page: 1,
      page_size: 100, // Fetch a large number to show all testimonials
      status: 'published',
    })
    return data.testimonials
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

async function BlueRidgeMemoriesContent() {
  try {
    const [term, testimonials] = await Promise.all([
      getTermBySlug(slug),
      fetchTestimonials(),
    ])
    
    // Use page title if available, otherwise use term name
    const title = term.page_title || term.name

    return (
      <div className="w-[67%] mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
        <h1 className="text-4xl mb-8">{title}</h1>
        <div
          className="prose prose-lg mx-auto mb-8 block"
          dangerouslySetInnerHTML={{ __html: term.description || 'No description available' }}
        />
        <div className="flex flex-col">
          <h2 className="text-2xl mb-4">Our Memories</h2>
          {testimonials.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700">No testimonials available at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-4 rounded-lg shadow-md">
                  {/* Testimonial Title */}
                  <h3 className="text-lg font-bold mb-2 text-[#7c2c00]">
                    {testimonial.title}
                  </h3>
                  {/* Cabin Name / Source */}
                  {testimonial.cabin_name && (
                    <p className="text-sm text-gray-600 mb-2">
                      This review is from:{' '}
                      <Link 
                        href={`/${testimonial.cabin_slug}`}
                        className="text-[#7c2c00] underline hover:text-[#533e27]"
                      >
                        {testimonial.cabin_name}
                      </Link>
                    </p>
                  )}
                  
                  {/* Customer Image */}
                  {testimonial.customer_image_url && (
                    <div className="mb-3">
                      <img
                        src={testimonial.customer_image_url}
                        alt={testimonial.customer_image_alt || testimonial.title}
                        title={testimonial.customer_image_title || undefined}
                        className="w-full h-auto rounded"
                        width={testimonial.customer_image_width || undefined}
                        height={testimonial.customer_image_height || undefined}
                      />
                    </div>
                  )}
                  
                  {/* Testimonial Body */}
                  {testimonial.body ? (
                    <div 
                      className="text-gray-700 italic text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: cleanHtmlContent(testimonial.body) }}
                    />
                  ) : testimonial.body_summary ? (
                    <p className="text-gray-700 italic text-sm leading-relaxed">
                      {stripHtmlTags(testimonial.body_summary)}
                    </p>
                  ) : null}
                  
                  {/* Author Name */}
                  {testimonial.author_name && (
                    <p className="text-xs text-gray-500 mt-2">
                      — {testimonial.author_name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  } catch (error: any) {
    // If term not found or error, show fallback content
    console.error('Error fetching taxonomy term:', error)
    return (
      <div className="w-[67%] mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
        <div className="mb-8">
          <h1 className="font-normal italic text-[220%] text-[#7c2c00] leading-[100%] my-[15px] mx-0">
            <em>Blue Ridge Memories</em>
          </h1>
          <div className="text-center py-10">
            <p className="text-[#533e27] text-lg">
              {error?.response?.status === 404
                ? 'Page not found. Please check the URL and try again.'
                : 'Unable to load page content. Please try again later.'}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default async function BlueRidgeMemoriesPage() {
  return (
    <Suspense fallback={<PageLoading message="Loading cabin listings..." variant="cabin" />}>
      <BlueRidgeMemoriesContent />
    </Suspense>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const term = await getTermBySlug(slug)
  if (!term) {
    return {
      title: 'Blue Ridge Memories | Blue Ridge Memories',
      description: 'Browse our complete collection of luxury cabin rentals in Blue Ridge, GA. From cozy 2-bedrooms to spacious 5-bedroom lodges, find your perfect mountain getaway.',
    } as Metadata
  }
  return {
    title: `${term.name} | Blue Ridge Memories`,
    description: term.description,
  } as Metadata
}
