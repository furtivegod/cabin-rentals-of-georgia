export const metadata = {
  title: 'Property Management - Cabin Rentals of Georgia',
  description: 'Learn about our property management services for cabin owners',
}

export default function PropertyManagementPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blue Ridge Property Management</h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            Are you a cabin owner looking to maximize your rental income? Cabin Rentals of Georgia 
            offers comprehensive property management services to help you turn your cabin into a 
            profitable vacation rental.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Services</h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
            <li>Professional marketing and listing management</li>
            <li>24/7 guest communication and support</li>
            <li>Cleaning and maintenance coordination</li>
            <li>Revenue optimization and pricing strategies</li>
            <li>Regular property inspections</li>
            <li>Financial reporting and accounting</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us</h2>
          <p className="text-lg text-gray-700 mb-6">
            With years of experience in the North Georgia vacation rental market, we understand 
            what guests are looking for and how to maximize your property's potential. Our team 
            handles everything so you can enjoy passive income from your investment.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold mb-4">Interested in Property Management?</h3>
            <p className="text-gray-700 mb-4">
              Contact us today to learn more about our property management services and how we 
              can help you maximize your cabin rental income.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:7064322140"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition text-center font-semibold"
              >
                Call 706-432-2140
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

