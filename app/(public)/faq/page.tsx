import { FAQ } from '@/lib/api/faqs'

export const metadata = {
  title: 'FAQ - Cabin Rentals of Georgia',
  description: 'Frequently asked questions about our cabin rentals',
}

async function fetchFAQs(): Promise<FAQ[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  console.log(API_URL)
  try {
    const params = new URLSearchParams({
      page: '1',
      page_size: '100',
      status: 'published',
    })
    
    const response = await fetch(`${API_URL}/api/v1/faqs?${params.toString()}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch FAQs: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data.faqs || []
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
}

export default async function FAQPage() {
  const faqs = await fetchFAQs()

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {faqs.length === 0 ? (
          <div className="rounded">
            <p>No FAQs available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {faqs.map((faq) => (
              <>
                <h1 className="text-[210%]">{faq.question}</h1>
                <div 
                  className="prose prose-sm max-w-none block"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
                {faq.category && (
                  <div className="mt-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {faq.category}
                    </span>
                  </div>
                )}
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
