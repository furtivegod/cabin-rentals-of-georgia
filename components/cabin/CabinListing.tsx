'use client'

import { useState, useEffect } from 'react'
import { getProperties } from '@/lib/api/properties'
import { Property } from '@/lib/types'
import CabinCard from './CabinCard'

interface CabinListingProps {
  category?: string
  amenity?: string
  bedrooms?: number
  tid?: number
}

export default function CabinListing({ category, amenity, bedrooms, tid }: CabinListingProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true)
        const params: any = {
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
        // Add tid filter if provided
        if (tid) {
          params.tid = tid
        }

        const response = await getProperties(params)
        setProperties(response)
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Failed to load cabins')
        console.error('Error fetching properties:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [category, amenity, bedrooms, tid])

  if (loading) {
    return (
      <div className="mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
        <div className="text-center py-10">
          <p className="text-[#533e27] text-lg">... Please wait...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
        <div className="text-center py-10">
          <p className="text-red-600 text-lg">Error: {error}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
      <div className="mb-8">
        {properties.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-[#533e27] text-lg">No cabins found matching your criteria.</p>
          </div>
        ) : (
          properties.map((property) => (
            <CabinCard key={property.id} property={property} />
          ))
        )}
      </div>
    </div>
  )
}

