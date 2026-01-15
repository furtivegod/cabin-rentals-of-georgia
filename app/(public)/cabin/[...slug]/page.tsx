import { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getCabinBySlug, Cabin } from '@/lib/api/cabins'
import { cleanHtmlContent, stripHtmlTags } from '@/lib/utils/html-utils'
import PageLoading from '@/components/ui/PageLoading'
import Image from 'next/image'

interface PageProps {
  params: {
    slug: string[]  // Array of URL segments after /cabin
    // Examples:
    // /cabin/cherry-log/creekside-green -> slug = ['cherry-log', 'creekside-green']
    // /cabin/happy-ours-lodge -> slug = ['happy-ours-lodge']
  }
}

/**
 * Generate metadata for the cabin page
 * 
 * Handles URLs like:
 * - /cabin/cherry-log/creekside-green (sends 'cherry-log/creekside-green' to API)
 * - /cabin/happy-ours-lodge (sends 'happy-ours-lodge' to API)
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  // Join slug segments with '/' to create the full slug path (everything after /cabin)
  const slugString = slug.join('/')

  try {
    const cabin = await getCabinBySlug(slugString)

    if (!cabin || cabin.status !== 'published') {
      return {
        title: 'Cabin Not Found | Cabin Rentals of Georgia',
        description: 'The cabin you are looking for could not be found.',
      }
    }

    const metaTitle = cabin.meta_title || cabin.title
    const metaDescription = cabin.meta_description ||
      (cabin.body_summary ? stripHtmlTags(cabin.body_summary) :
        cabin.body ? stripHtmlTags(cabin.body).substring(0, 160) :
          `Book ${cabin.title} - Cabin Rentals of Georgia`)

    return {
      title: `${metaTitle} | Cabin Rentals of Georgia`,
      description: metaDescription,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        type: 'website',
        ...(cabin.featured_image_url && {
          images: [{ url: cabin.featured_image_url }],
        }),
      },
    }
  } catch (error) {
    return {
      title: 'Cabin Not Found | Cabin Rentals of Georgia',
      description: 'The cabin you are looking for could not be found.',
    }
  }
}

/**
 * Cabin content component
 * 
 * Fetches cabin data using the slug path (everything after /cabin)
 * Examples:
 * - /cabin/cherry-log/creekside-green -> fetches with slug 'cherry-log/creekside-green'
 * - /cabin/happy-ours-lodge -> fetches with slug 'happy-ours-lodge'
 */
async function CabinContent({ slug }: { slug: string[] }) {
  // Join slug segments to create the full slug path to send to API
  // This removes the '/cabin' prefix and sends only the slug part
  const slugString = slug.join('/')

  try {
    // Fetch cabin data using the slug (tries cabin_slug first, then slug field)
    const cabin = await getCabinBySlug(slugString)

    if (!cabin || cabin.status !== 'published') {
      notFound()
    }

    return (
      <div className="mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5 block">
        {/* Featured Image */}
        {cabin.featured_image_url && (
          <div className="mb-6">
            <Image
              src={cabin.featured_image_url}
              alt={cabin.featured_image_alt || cabin.title}
              title={cabin.featured_image_title || undefined}
              width={cabin.featured_image_width || 800}
              height={cabin.featured_image_height || 600}
              className="w-full h-auto rounded-lg shadow-md"
              priority
            />
          </div>
        )}

        {/* Cabin Title */}
        <div className='flex items-center justify-between'>
          <h1 className="font-normal italic text-[220%] text-[#7c2c00] leading-[100%] my-[15px] mx-0">
            <em>{cabin.title}</em>
          </h1>
          <button
            className="bg-[url('/images/icon_save_favorite5.png')] bg-center bg-no-repeat w-[100px] h-[30px] text-white text-[110%]" />
        </div>

        {/* Property Details */}
        <div className="mb-6 flex flex-wrap gap-4 text-[#533e27]">
          {cabin.bedrooms && (
            <span className="font-semibold">Bedrooms: {cabin.bedrooms}</span>
          )}
          {cabin.bathrooms && (
            <span className="font-semibold">Bathrooms: {cabin.bathrooms}</span>
          )}
          {cabin.sleeps && (
            <span className="font-semibold">Sleeps: {cabin.sleeps}</span>
          )}
          {/* {cabin.property_type && (
            <span className="font-semibold">Type: {cabin.property_type}</span>
          )} */}
        </div>

        {/* Body Content */}
        {cabin.body ? (
          <div
            className="prose prose-lg max-w-none mb-8 text-[#533e27]"
            dangerouslySetInnerHTML={{ __html: cleanHtmlContent(cabin.body.replaceAll("https://www.cabin-rentals-of-georgia.com", "")) }}
          />
        ) : cabin.body_summary ? (
          <p className="mb-8 text-[#533e27] text-lg">
            {stripHtmlTags(cabin.body_summary)}
          </p>
        ) : null}

        {/* Features */}
        {cabin.features && cabin.features.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#7c2c00]">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-[#533e27]">
              {cabin.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Amenities */}
        {cabin.amenities && cabin.amenities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#7c2c00]">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {cabin.amenities.map((amenity: any, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#7c2c00] text-white rounded-full text-sm"
                >
                  {amenity.name || amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Images */}
        {cabin.gallery_images && cabin.gallery_images.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#7c2c00]">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cabin.gallery_images.map((image: any, index: number) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image.url || ''}
                    alt={image.alt || cabin.title}
                    title={image.title || undefined}
                    width={image.width || 300}
                    height={image.height || 300}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location */}
        {(cabin.city || cabin.state || cabin.address) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#7c2c00]">Location</h2>
            <div className="text-[#533e27]">
              {cabin.address && <p>{cabin.address}</p>}
              {(cabin.city || cabin.state) && (
                <p>
                  {cabin.city}
                  {cabin.city && cabin.state && ', '}
                  {cabin.state}
                  {cabin.zip_code && ` ${cabin.zip_code}`}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    )
  } catch (error: any) {
    console.error('Error fetching cabin:', error)

    if (error?.response?.status === 404) {
      notFound()
    }

    return (
      <div className="mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
        <div className="mb-8">
          <h1 className="font-normal italic text-[220%] text-[#7c2c00] leading-[100%] my-[15px] mx-0">
            <em>Cabin Not Found</em>
          </h1>
          <div className="text-center py-10">
            <p className="text-[#533e27] text-lg">
              The cabin you are looking for could not be found. Please check the URL and try again.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default async function CabinPage({ params }: PageProps) {
  const { slug } = params

  return (
    <Suspense fallback={<PageLoading message="Loading cabin details..." variant="cabin" />}>
      <CabinContent slug={slug} />
    </Suspense>
  )
}

