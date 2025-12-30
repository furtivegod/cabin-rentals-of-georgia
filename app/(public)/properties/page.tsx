export const metadata = {
  title: 'Properties - Cabin Rentals of Georgia',
  description: 'Browse all available cabin rentals in North Georgia',
}

export default function PropertiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">All Properties</h1>
        <p className="text-lg text-gray-700 mb-8">
          Browse our complete collection of luxury cabin rentals in the North Georgia mountains.
        </p>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium mb-2">
                Bedrooms
              </label>
              <select
                id="bedrooms"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Any</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-2">
                Location Type
              </label>
              <select
                id="location"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Any</option>
                <option value="mountain">Mountain View</option>
                <option value="river">River Front</option>
                <option value="lake">Lake Front</option>
                <option value="woods">In The Woods</option>
              </select>
            </div>
            <div>
              <label htmlFor="sort" className="block text-sm font-medium mb-2">
                Sort By
              </label>
              <select
                id="sort"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="bedrooms">Bedrooms</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Property Image {i}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Cabin Name {i}</h3>
                <p className="text-gray-600 mb-2">Blue Ridge, GA</p>
                <p className="text-gray-600 mb-4">3 Bedrooms • 2 Bathrooms • Sleeps 8</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-blue-600">From $200/night</span>
                  <a
                    href={`/properties/cabin-${i}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">3</button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

