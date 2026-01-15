import { Metadata } from 'next'
import { Suspense } from 'react'
import { getActivityByActivitySlug } from '@/lib/api/activities'
import PageLoading from '@/components/ui/PageLoading'
import Image from 'next/image'
import { cleanHtmlContent } from '@/lib/utils/html-utils'

interface PageProps {
  params: {
    slug: string[] // This will capture all segments after /activity/
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  const slugString = slug.join('/') // Joins ['hiking', 'bell-mountain'] into 'hiking/bell-mountain'

  try {
    const activity = await getActivityByActivitySlug(slugString)
    
    return {
      title: `${activity.title} | Activities | Cabin Rentals of Georgia`,
      description: activity.body_summary
        ? activity.body_summary.replace(/<[^>]*>/g, '').substring(0, 160)
        : `Learn more about ${activity.title} in Blue Ridge, GA.`,
    }
  } catch (error) {
    return {
      title: 'Activity | Cabin Rentals of Georgia',
      description: 'Explore activities in Blue Ridge, GA.',
    }
  }
}

async function ActivityContent({ slug }: { slug: string[] }) {
  const slugString = slug.join('/') // Joins ['hiking', 'bell-mountain'] into 'hiking/bell-mountain'

  try {
    const activity = await getActivityByActivitySlug(slugString)

    return (
      <div className="mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
        <h1 className="text-4xl mb-8 text-[#7c2c00]">{activity.title}</h1>

        {/* Featured Image */}
        {activity.featured_image_url && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={activity.featured_image_url}
              alt={activity.featured_image_alt || activity.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Activity Details */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {activity.activity_type && (
            <div>
              <span className="font-semibold text-[#7c2c00]">Activity Type: </span>
              <span className="text-[#533e27]">{activity.activity_type}</span>
            </div>
          )}
          {activity.area && (
            <div>
              <span className="font-semibold text-[#7c2c00]">Area: </span>
              <span className="text-[#533e27]">{activity.area}</span>
            </div>
          )}
          {activity.difficulty_level && (
            <div>
              <span className="font-semibold text-[#7c2c00]">Difficulty Level: </span>
              <span className="text-[#533e27]">{activity.difficulty_level}</span>
            </div>
          )}
          {activity.season && (
            <div>
              <span className="font-semibold text-[#7c2c00]">Season: </span>
              <span className="text-[#533e27]">{activity.season}</span>
            </div>
          )}
          {activity.ages && (
            <div>
              <span className="font-semibold text-[#7c2c00]">Ages: </span>
              <span className="text-[#533e27]">{activity.ages}</span>
            </div>
          )}
          {activity.people && (
            <div>
              <span className="font-semibold text-[#7c2c00]">Group Size: </span>
              <span className="text-[#533e27]">{activity.people}</span>
            </div>
          )}
        </div>

        {/* Gallery Images */}
        {activity.gallery_images && activity.gallery_images.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#7c2c00] mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activity.gallery_images.map((image: any, index: number) => (
                <div key={index} className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src={image.url || ''}
                    alt={image.alt || activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Body Content */}
        {activity.body && (
          <div
            className="prose prose-lg max-w-none mb-8 text-[#533e27] block"
            dangerouslySetInnerHTML={{ __html: cleanHtmlContent(activity.body.replaceAll("https://www.cabin-rentals-of-georgia.com", "")) }}
          />
        )}

        {/* Location Map (if coordinates available) */}
        {activity.latitude && activity.longitude && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-[#7c2c00] mb-4">Location</h2>
            {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
              <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${activity.latitude},${activity.longitude}`}
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <a
                  href={`https://www.google.com/maps?q=${activity.latitude},${activity.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7c2c00] hover:underline font-semibold"
                >
                  View on Google Maps
                </a>
              </div>
            )}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8">
          <a
            href="/activities"
            className="text-[#7c2c00] hover:underline font-semibold"
          >
            ← Back to Activities
          </a>
        </div>
      </div>
    )
  } catch (error: any) {
    console.error('Error fetching activity:', error)
    return (
      <div className="mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
        <div className="mb-8">
          <h1 className="font-normal italic text-[220%] text-[#7c2c00] leading-[100%] my-[15px] mx-0">
            <em>Activity Not Found</em>
          </h1>
          <div className="text-center py-10">
            <p className="text-[#533e27] text-lg">
              {error?.response?.status === 404
                ? 'The activity you are looking for could not be found. Please check the URL and try again.'
                : 'Unable to load activity content. Please try again later.'}
            </p>
            <a
              href="/activities"
              className="mt-4 inline-block text-[#7c2c00] hover:underline font-semibold"
            >
              ← Back to Activities
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default async function ActivityPage({ params }: PageProps) {
  const { slug } = params

  return (
    <Suspense fallback={<PageLoading message="Loading activity..." variant="cabin" />}>
      <ActivityContent slug={slug} />
    </Suspense>
  )
}

