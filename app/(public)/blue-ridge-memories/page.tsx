import Link from 'next/link'

export const metadata = {
  title: 'Blue Ridge Memories - Cabin Rentals of Georgia',
  description: 'Read testimonials and reviews from our guests',
}

export default function BlueRidgeMemoriesPage() {
  const testimonials = [
    {
      name: 'The Sandlot Crew',
      cabin: 'High Hopes',
      text: 'The Sandlot Crew, college friends for 42+ years, enjoyed our stay for fun, football, and relaxing! The cabin was perfect for us with the perfect accommodations. Hope to stay here again! Thank you for your hospitality!',
    },
    {
      name: 'Guest',
      cabin: 'Riverview Lodge',
      text: 'Our stay in Blue Ridge was wonderful! It was really relaxing. The view was gorgeous! The cabin was quiet, spacious, and nice. The cabin was well stocked with all the must-haves! Thank you for all the accommodations!',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blue Ridge Memories</h1>
        <p className="text-lg text-gray-700 mb-8">
          See what our guests are saying about their experiences with Cabin Rentals of Georgia.
        </p>
        
        <div className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div>
                  <Link
                    href={`/cabin/blue-ridge/${testimonial.cabin.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    {testimonial.cabin}
                  </Link>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

