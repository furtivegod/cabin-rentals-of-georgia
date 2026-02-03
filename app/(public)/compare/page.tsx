'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useFavorites } from '@/lib/hooks/useFavorites'
import { amenityIcons } from '@/lib/constants/amenity-icons'

export default function ComparePage() {
  const { favorites, toggleFavorite, removeFavorite } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-[#7c2c00] text-3xl italic font-serif mb-6">Cabin Comparison</h1>
        <div className="text-center py-12">
          <p className="text-[#533e27] text-lg mb-4">No cabins selected for comparison yet.</p>
          <p className="text-[#533e27]">
            Browse our <Link href="/blue-ridge-cabins" className="text-[#7c2c00] underline">cabin listings</Link> and click the heart icon to add cabins to compare.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-[#7c2c00] text-3xl italic font-serif mb-6">Cabin Comparison</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 table-fixed">
          <tbody>
            {/* Cabin Names Row */}
            <tr>
              {favorites.map((property, index) => (
                <td 
                  key={`name-${property.id}`} 
                  className={`p-4 text-center align-top border-b w-[250px] border-[#a08060] ${index > 0 ? 'border-l' : ''}`}
                >
                  <Link 
                    href={`/cabin/${property.cabin_slug}`} 
                    className="text-[#7c2c00] underline text-lg font-medium"
                  >
                    {property.title}
                  </Link>
                </td>
              ))}
            </tr>

            {/* Images Row */}
            <tr>
              {favorites.map((property, index) => (
                <td 
                  key={`image-${property.id}`} 
                  className={`p-4 text-center align-top border-b border-[#a08060] ${index > 0 ? 'border-l' : ''}`}
                >
                  <div className="relative inline-block">
                    {/* Favorite heart icon */}
                    <button
                      onClick={() => toggleFavorite(property)}
                      className="absolute top-2 left-2 z-10 w-6 h-6 flex items-center justify-center"
                      title="Remove from comparison"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-red-600 stroke-red-600"
                        strokeWidth="2"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>

                    {/* Plus icon */}
                    <div className="absolute top-2 left-9 z-10 w-5 h-5 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 fill-green-600 stroke-green-600"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>

                    <Link href={`/cabin/${property.cabin_slug}`}>
                      <Image
                        src={property?.featured_image_url?.replace("/sites/default/files/", "/images/styles/cabins_listing_large2/public/") || ''}
                        alt={`${property?.title || ''} | Cabin Rentals of Georgia`}
                        width={300}
                        height={200}
                        className="w-[280px] h-auto"
                      />
                    </Link>
                  </div>
                </td>
              ))}
            </tr>

            {/* Instant Quote Button Row */}
            <tr>
              {favorites.map((property, index) => (
                <td 
                  key={`quote-${property.id}`} 
                  className={`p-4 text-center align-middle border-b border-[#a08060] ${index > 0 ? 'border-l' : ''}`}
                >
                  <Link href={`/cabin/${property.cabin_slug}`}>
                    <Image
                      src='/images/btn_instant_quote_small.png'
                      alt='Instant Quote'
                      width={196}
                      height={40}
                      className='cursor-pointer object-contain mx-auto'
                    />
                  </Link>
                </td>
              ))}
            </tr>

            {/* Bedrooms Row */}
            <tr>
              {favorites.map((property, index) => (
                <td 
                  key={`bedrooms-${property.id}`} 
                  className={`p-3 text-center text-[#533e27] border-b border-[#a08060] ${index > 0 ? 'border-l' : ''}`}
                >
                  {property.bedrooms}
                </td>
              ))}
            </tr>

            {/* Bathrooms Row */}
            <tr>
              {favorites.map((property, index) => (
                <td 
                  key={`bathrooms-${property.id}`} 
                  className={`p-3 text-center text-[#533e27] border-b border-[#a08060] ${index > 0 ? 'border-l' : ''}`}
                >
                  {property.bathrooms} Bath
                </td>
              ))}
            </tr>

            {/* Sleeps Row */}
            <tr>
              {favorites.map((property, index) => (
                <td 
                  key={`sleeps-${property.id}`} 
                  className={`p-3 text-center text-[#533e27] border-b border-[#a08060] ${index > 0 ? 'border-l' : ''}`}
                >
                  Sleeps {property.sleeps}
                </td>
              ))}
            </tr>

            {/* Price Row */}
            <tr>
              {favorites.map((property, index) => (
                <td 
                  key={`price-${property.id}`} 
                  className={`p-3 text-center text-[#533e27] border-b border-[#a08060] ${index > 0 ? 'border-l' : ''}`}
                >
                  {property.today_rate ? `from $${Math.round(property.today_rate)}/night` : 'Contact for rates'}
                </td>
              ))}
            </tr>

            {/* Amenities Row */}
            <tr>
              {favorites.map((property, index) => (
                <td 
                  key={`amenities-${property.id}`} 
                  className={`p-4 text-center border-b border-[#a08060] ${index > 0 ? 'border-l' : ''}`}
                >
                  <div className="flex justify-center items-center gap-1 flex-wrap">
                    {property.amenities?.map((amenity) => (
                      <Image
                        key={amenity.name}
                        src={amenityIcons[amenity.name] || '/images/icon_internet_0.png'}
                        alt={amenity.name}
                        title={amenity.name}
                        width={24}
                        height={24}
                        className="cursor-pointer"
                      />
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Description Row */}
            <tr>
              {favorites.map((property, index) => (
                <td 
                  key={`desc-${property.id}`} 
                  className={`p-4 text-[#533e27] text-sm leading-relaxed align-top border-b border-[#a08060] ${index > 0 ? 'border-l' : ''}`}
                >
                  {property.body ? (
                    <div 
                      className="line-clamp-[8]"
                      dangerouslySetInnerHTML={{ 
                        __html: property.body.replace(/<[^>]*>/g, '').substring(0, 400) + '...' 
                      }} 
                    />
                  ) : (
                    <p>{property.tagline || 'No description available.'}</p>
                  )}
                </td>
              ))}
            </tr>

            {/* Remove Button Row */}
            <tr>
              {favorites.map((property, index) => (
                <td 
                  key={`remove-${property.id}`} 
                  className={`p-4 text-center ${index > 0 ? 'border-l border-[#a08060]' : ''}`}
                >
                  <button
                    onClick={() => removeFavorite(property.id)}
                    className="text-red-700 hover:text-red-900 text-sm underline"
                  >
                    Remove from comparison
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

