import { Metadata } from 'next'
import { Suspense } from 'react'
import { getTermBySlug } from '@/lib/api/taxonomy'
import PageLoading from '@/components/ui/PageLoading'

const slug = 'blue-ridge-cabins'

async function BlueRidgeCabinsContent() {
  try {
    const term = await getTermBySlug(slug)
    // Use page title if available, otherwise use term name
    const title = term.page_title || term.name

    return (
      <div className="mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
        <h1 className="text-4xl mb-8">{title}</h1>
        <div
          className="prose prose-lg mx-auto mb-8 block"
          dangerouslySetInnerHTML={{ __html: term.description?.replaceAll("https://www.cabin-rentals-of-georgia.com", "") || 'No description available' }}
        />
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

export default async function BlueRidgeCabinsPage() {
  return (
    <Suspense fallback={<PageLoading message="Loading cabin listings..." variant="cabin" />}>
      <BlueRidgeCabinsContent />
    </Suspense>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const term = await getTermBySlug(slug)
  if (!term) {
    return {
      title: 'Blue Ridge Cabins | Cabin Rentals of Georgia',
      description: 'Browse our complete collection of luxury cabin rentals in Blue Ridge, GA. From cozy 2-bedrooms to spacious 5-bedroom lodges, find your perfect mountain getaway.',
    } as Metadata
  }
  return {
    title: `${term.name} | Cabin Rentals of Georgia`,
    description: term.description,
  } as Metadata
}
