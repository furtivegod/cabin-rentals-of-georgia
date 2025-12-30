export const metadata = {
  title: 'Property Details - Cabin Rentals of Georgia',
  description: 'View detailed information about this cabin rental',
}

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Property Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Cabin Name</h1>
          <p className="text-xl text-gray-600">Blue Ridge, GA</p>
        </div>
        
        {/* Main Image */}
        <div className="mb-8">
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
            Main Property Image
          </div>
        </div>
        
        {/* Property Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">About This Cabin</h2>
              <p className="text-gray-700 mb-4">
                This beautiful cabin offers stunning mountain views and all the amenities you need 
                for a perfect vacation. Located in the heart of North Georgia, you'll have easy 
                access to hiking, fishing, and all the area has to offer.
              </p>
              <p className="text-gray-700">
                The cabin features a fully equipped kitchen, comfortable living area with fireplace, 
                and spacious bedrooms. The outdoor deck offers a hot tub and seating area perfect for 
                enjoying the mountain views.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Property Features</h2>
              <ul className="grid grid-cols-2 gap-2">
                <li className="text-gray-700">• Hot Tub</li>
                <li className="text-gray-700">• Fireplace</li>
                <li className="text-gray-700">• Fully Equipped Kitchen</li>
                <li className="text-gray-700">• Wi-Fi</li>
                <li className="text-gray-700">• Mountain View</li>
                <li className="text-gray-700">• Outdoor Deck</li>
                <li className="text-gray-700">• Parking</li>
                <li className="text-gray-700">• Pet Friendly</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Availability</h2>
              <p className="text-gray-700 mb-4">
                Check availability and book your stay. Calendar will be displayed here.
              </p>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                Availability Calendar
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-4">
              <div className="mb-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">From $200/night</div>
                <p className="text-sm text-gray-600">Rates vary by season</p>
              </div>
              
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bedrooms:</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bathrooms:</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sleeps:</span>
                  <span className="font-semibold">8</span>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold mb-4">
                Book Now
              </button>
              
              <a
                href="/availability"
                className="block w-full text-center bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition font-semibold"
              >
                Check Availability
              </a>
            </div>
          </div>
        </div>
        
        {/* Photo Gallery */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-sm">
                Photo {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

