import { Policy } from '@/lib/api/policies'

export const metadata = {
  title: 'Rental Policies - Cabin Rentals of Georgia',
  description: 'Review our rental policies, terms and conditions',
}

// Utility function to clean HTML content
function cleanHtmlContent(html: string): string {
  if (!html) return ''
  
  // Remove literal \r\n escape sequences
  let cleaned = html.replace(/\\r\\n/g, '\n')
  // Remove literal \n escape sequences
  cleaned = cleaned.replace(/\\n/g, '\n')
  // Remove literal \r escape sequences
  cleaned = cleaned.replace(/\\r/g, '')
  // Remove literal \t escape sequences
  cleaned = cleaned.replace(/\\t/g, ' ')
  // Remove literal backslashes before quotes
  cleaned = cleaned.replace(/\\"/g, '"')
  cleaned = cleaned.replace(/\\'/g, "'")
  
  return cleaned
}

async function fetchRentalPolicies(): Promise<Policy | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  
  try {
    const response = await fetch(`${API_URL}/api/v1/policies`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Rental Policies: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching Rental Policies:', error)
    return null
  }
}

export default async function RentalPoliciesPage() {
  const policy = await fetchRentalPolicies()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {policy ? (
          <>
            <h1 className="text-4xl font-bold mb-8">{policy.title}</h1>
            
            {policy.body ? (
              <div 
                className="prose prose-lg mx-auto mb-8 block"
                dangerouslySetInnerHTML={{ __html: cleanHtmlContent(policy.body) }}
              />
            ) : (
              <div className="space-y-6">
                <p>
                  No policy content available at the moment. Please check back later.
                </p>
              </div>
            )}
          </>
        ) : (
          <p>No policy content available at the moment. Please check back later.</p>
        )}
      </div>
    </div>
  )
}

