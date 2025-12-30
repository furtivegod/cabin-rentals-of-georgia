export const metadata = {
  title: 'Blue Ridge Experience - Cabin Rentals of Georgia',
  description: 'Discover the Blue Ridge experience',
}

export default function BlueRidgeExperiencePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blue Ridge Experience</h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            Discover what makes Blue Ridge, Georgia special and why our cabins offer the perfect 
            escape for your vacation.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">About Blue Ridge, GA</h2>
          <p className="text-lg text-gray-700 mb-6">
            Blue Ridge is a charming mountain town located in North Georgia, just 90 miles north 
            of Atlanta. Known for its stunning mountain views, outdoor activities, and small-town 
            charm, Blue Ridge is the perfect destination for your next vacation.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Blue Ridge Activities</h2>
          <p className="text-lg text-gray-700 mb-6">
            From hiking and fishing to shopping and dining, Blue Ridge offers something for everyone. 
            Explore the Toccoa River, visit local wineries, or simply relax and enjoy the mountain views.
          </p>
        </div>
      </div>
    </div>
  )
}

