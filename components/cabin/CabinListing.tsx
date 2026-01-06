'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getProperties, PropertyListResponse } from '@/lib/api/properties'
import { Property } from '@/lib/types'

interface CabinListingProps {
  title: string
  description?: string
  category?: string
  amenity?: string
  bedrooms?: number
}

const amenityIcons: Record<string, string> = {
  internet: '/images/icons/icon_internet_0.png',
  'hot-tub': '/images/icons/icon_hot_tub_0.png',
  coffee: '/images/icons/icon_keurig2.png',
  'gas-grill': '/images/icons/icon_gas_grill.png',
  'outdoor-fireplace': '/images/icons/icon_outdoor_fireplace_0.png',
  'indoor-fireplace': '/images/icons/icon_indoor_fireplace_0.png',
  'no-smoking': '/images/icons/icon_no_smoking_0.png',
  pets: '/images/icons/icon_pets.png',
  'game-room': '/images/icons/icon_video_games_0.png',
  billiards: '/images/icons/icon_billiards_0.png',
  motorcycle: '/images/icons/motorcycle_icon_4.25KB_matched.png',
}

export default function CabinListing({ title, description, category, amenity, bedrooms }: CabinListingProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true)
        const params: any = {
          page,
          page_size: 12,
          status: 'published',
        }

        if (category) {
          params.category = category
        }
        if (amenity) {
          params.amenity = amenity
        }
        if (bedrooms) {
          params.bedrooms = bedrooms
        }

        const response = await getProperties(params)
        setProperties(response.properties)
        setTotalPages(response.total_pages)
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Failed to load cabins')
        console.error('Error fetching properties:', err)
      } finally {
        setLoading(false)
      }
    }

    // fetchProperties()
  }, [page, category, amenity, bedrooms])

  if (loading) {
    return (
      <div className="w-[67%] mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
        <div className="text-center py-10">
          <p className="text-[#533e27] text-lg">... Please wait...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-[67%] mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
        <div className="text-center py-10">
          <p className="text-red-600 text-lg">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[67%] mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
      <div className="mb-8">
        <h1 className="font-normal italic text-[220%] text-[#7c2c00] leading-[100%] my-[15px] mx-0">
          <em>{title}</em>
        </h1>
        {description && (
          <p className="text-[120%] text-[#533e27] mb-4">
            {description}
          </p>
        )}

        {properties.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-[#533e27] text-lg">No cabins found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/cabin/${property.slug}`}>
                    <div className="relative h-48 w-full">
                      <Image
                        src="/images/IMG_9616-HDR.jpg" // Placeholder - replace with actual property image
                        alt={property.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#7c2c00] mb-2 hover:text-[#b7714b]">
                        {property.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-[#533e27] mb-2">
                        <span>{property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' : ''}</span>
                        <span>•</span>
                        <span>Sleeps {property.max_guests}</span>
                      </div>
                      {property.amenities && property.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {property.amenities.slice(0, 4).map((amenity) => {
                            const icon = amenityIcons[amenity.toLowerCase().replace(/\s+/g, '-')]
                            return icon ? (
                              <Image
                                key={amenity}
                                src={icon}
                                alt={amenity}
                                width={24}
                                height={24}
                                className="object-contain"
                              />
                            ) : null
                          })}
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-[#7c2c00] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#b7714b]"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-[#533e27]">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-[#7c2c00] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#b7714b]"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

