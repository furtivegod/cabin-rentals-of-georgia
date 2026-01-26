import { Metadata } from 'next'
import { Suspense } from 'react'
import { getTermBySlug } from '@/lib/api/taxonomy'
import PageLoading from '@/components/ui/PageLoading'
import { getAllActivities } from '@/lib/api/activities'
import Image from 'next/image'
import Link from 'next/link'
import ProcessedHTML from '@/components/content/ProcessedHTML'

const slug = 'blue-ridge-experience'
async function BlueRidgeExperienceContent() {
  try {
    const term = await getTermBySlug(slug)
    // Use page title if available, otherwise use term name
    const title = term.page_title || term.name

    const activities = await getAllActivities()
    return (
      <div className="mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
        <h1 className="text-4xl mb-8">{title}</h1>
        <ProcessedHTML
          html={term.description?.replaceAll("https://www.cabin-rentals-of-georgia.com", "") || 'No description available'}
          className="prose prose-lg mx-auto mb-8 block"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {activities.map((activity) => (
            <div key={activity.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {activity.featured_image_url && <Image src={activity.featured_image_url} alt={activity.title} width={100} height={100} />}
              <Link href={`/activity/${activity.activity_slug}`} className="hover:underline">
                <h2 className="font-normal text-white text-[19px] m-0">{activity.title}</h2>
              </Link>

              <p className="text-white text-[16px] italic">{activity.activity_type}</p>
            </div>
          ))}
        </div>
      </div>
    )
  } catch (error: any) {
    // If term not found or error, show fallback content
    console.error('Error fetching taxonomy term:', error)
    return (
      <div className="mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
        <div className="mb-8">
          <h1 className="font-normal italic text-[220%] text-[#7c2c00] leading-[100%] my-[15px] mx-0">
            <em>Cabin Rentals</em>
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

export default async function BlueRidgeExperiencePage() {
  return (
    <Suspense fallback={<PageLoading message="Loading information about Blue Ridge Experience..." variant="cabin" />}>
      <BlueRidgeExperienceContent />
    </Suspense>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const term = await getTermBySlug(slug)
  if (!term) {
    return {
      title: 'Blue Ridge Experience | Cabin Rentals of Georgia',
      description: 'Browse our complete collection of luxury cabin rentals in Blue Ridge, GA. From cozy 2-bedrooms to spacious 5-bedroom lodges, find your perfect mountain getaway.',
    } as Metadata
  }
  return {
    title: `${term.name} Experience | Cabin Rentals of Georgia`,
    description: term.description,
  } as Metadata
}
