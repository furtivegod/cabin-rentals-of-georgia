export const metadata = {
  title: 'Blue Ridge Cabins - Cabin Rentals of Georgia',
  description: 'Browse our collection of luxury Blue Ridge cabin rentals',
}

export default function BlueRidgeCabinsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blue Ridge Cabins</h1>
        <p className="text-lg text-gray-700 mb-8">
          Explore our collection of luxury cabin rentals in Blue Ridge, Georgia.
        </p>
        
        {/* Cabin grid - placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Cabin Name {i}</h3>
                <p className="text-gray-600 mb-4">Beautiful cabin description...</p>
                <a
                  href={`/cabin/blue-ridge/cabin-${i}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

