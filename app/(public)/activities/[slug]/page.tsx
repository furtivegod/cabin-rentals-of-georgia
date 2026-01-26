import { Metadata } from 'next'
import { Suspense } from 'react'
import { getTermBySlug } from '@/lib/api/taxonomy'
import { getActivities } from '@/lib/api/activities'
import PageLoading from '@/components/ui/PageLoading'
import Image from 'next/image'
import Link from 'next/link'
import ProcessedHTML from '@/components/content/ProcessedHTML'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params

  try {
    const term = await getTermBySlug(slug, 10) // vid = 10 for activities
    const title = term.page_title || term.name

    return {
      title: `${title} | Cabin Rentals of Georgia`,
      description: term.description
        ? term.description.replace(/<[^>]*>/g, '').substring(0, 160)
        : `Explore ${term.name} activities in Blue Ridge, GA.`,
    }
  } catch (error) {
    return {
      title: 'Activities | Cabin Rentals of Georgia',
      description: 'Explore activities in Blue Ridge, GA.',
    }
  }
}

async function ActivitiesContent({ slug }: { slug: string }) {
  try {
    // Fetch taxonomy term data from Supabase (vid = 10 for activities)
    const term = await getTermBySlug(slug, 10)

    // Use page title if available, otherwise use term name
    const title = term.page_title || term.name

    // Fetch activities filtered by activity type term ID
    const activitiesData = await getActivities({
      page: 1,
      page_size: 50,
      status: 'published',
      activity_type_tid: term.tid,
    })

    return (
      <div className="mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
        <h1 className="text-4xl mb-8">{title}</h1>
        <ProcessedHTML
          html={term.description?.replaceAll("https://www.cabin-rentals-of-georgia.com", "") || 'No description available'}
          className="prose prose-lg mx-auto mb-8 block"
        />
        
        {activitiesData.activities.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-[#533e27] text-lg">
              No activities found for this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activitiesData.activities.map((activity) => (
              <div key={activity.id} className="border border-gray-200 rounded-lg overflow-hidden">
                {activity.featured_image_url && (
                  <div className="relative w-full h-48">
                    <Image
                      src={activity.featured_image_url}
                      alt={activity.featured_image_alt || activity.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-[#7c2c00] mb-2">
                    <Link 
                      href={activity.activity_slug ? `/activity/${activity.activity_slug}` : `/activity/${activity.slug}`} 
                      className="hover:underline"
                    >
                      {activity.title}
                    </Link>
                  </h3>
                  {activity.body_summary && (
                    <p className="text-[#533e27] text-sm mb-2 line-clamp-3">
                      {activity.body_summary.replace(/<[^>]*>/g, '')}
                    </p>
                  )}
                  {activity.area && (
                    <p className="text-[#533e27] text-xs">
                      Location: {activity.area}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  } catch (error: any) {
    // If term not found or error, show fallback content
    console.error('Error fetching activities:', error)
    return (
      <div className="mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
        <div className="mb-8">
          <h1 className="font-normal italic text-[220%] text-[#7c2c00] leading-[100%] my-[15px] mx-0">
            <em>Activities</em>
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

export default async function ActivitiesPage({ params }: PageProps) {
  const { slug } = params

  return (
    <Suspense fallback={<PageLoading message="Loading activities..." variant="cabin" />}>
      <ActivitiesContent slug={slug} />
    </Suspense>
  )
}

