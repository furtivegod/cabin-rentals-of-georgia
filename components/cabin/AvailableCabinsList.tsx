'use client'

import { useEffect, useState } from 'react'
import { Property } from '@/lib/types'
import CabinCard from './CabinCard'
import { getAvailableCabins, AvailableCabinsResponse } from '@/lib/api/calendar'

interface AvailableCabinsListProps {
  cabins: Property[]
  arrivalDate: string
  departureDate: string
}

export default function AvailableCabinsList({
  cabins,
  arrivalDate,
  departureDate,
}: AvailableCabinsListProps) {
  const [availableCabins, setAvailableCabins] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<AvailableCabinsResponse | null>(null)

  useEffect(() => {
    async function checkAvailability() {
      setLoading(true)
      setError(null)
      
      try {
        // Call the backend API that efficiently checks all cabins
        const response = await getAvailableCabins(arrivalDate, departureDate)
        
        // Store debug info
        setDebugInfo(response)
        
        // Filter cabins to only include available ones
        const availableIds = new Set(response.available_cabin_ids)
        const filtered = cabins.filter(cabin => availableIds.has(cabin.id))
        
        setAvailableCabins(filtered)
      } catch (err: any) {
        console.error('Error checking availability:', err)
        setError(err.message || 'Failed to check availability')
        // On error, show all cabins (graceful degradation)
        setAvailableCabins(cabins)
      } finally {
        setLoading(false)
      }
    }

    if (arrivalDate && departureDate && cabins.length > 0) {
      checkAvailability()
    }
  }, [cabins, arrivalDate, departureDate])

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7c2c00] mx-auto mb-4"></div>
        <p className="text-[#533e27] italic">
          Checking availability for {cabins.length} cabins...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mb-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
          <p className="text-yellow-800 italic">
            Note: Could not verify availability ({error}). Showing all cabins.
          </p>
        </div>
        <div className="flex flex-col gap-[20px]">
          {availableCabins.map((property: Property) => (
            <CabinCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    )
  }

  if (availableCabins.length === 0) {
    return (
      <div>
        <div className="text-center py-10 bg-[#f5f0e6] border border-[#d4c4a8] rounded-lg mb-6">
          <p className="text-[#7c2c00] text-xl italic mb-2">
            No cabins available for these dates
          </p>
          <p className="text-[#533e27]">
            Please try different dates or contact us for assistance.
          </p>
        </div>
        
        {/* Debug info - show which cabins were checked */}
        {debugInfo && (
          <details className="mt-4 p-4 bg-gray-100 rounded text-sm">
            <summary className="cursor-pointer text-gray-600">Debug Info</summary>
            <pre className="mt-2 overflow-auto text-xs">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </details>
        )}
      </div>
    )
  }

  return (
    <div>
      <p className="text-[#533e27] mb-4 italic">
        Found {availableCabins.length} available cabin{availableCabins.length !== 1 ? 's' : ''} out of {cabins.length} total
      </p>
      <div className="flex flex-col gap-[20px]">
        {availableCabins.map((property: Property) => (
          <CabinCard key={property.id} property={property} />
        ))}
      </div>
      
      {/* Debug info */}
      {debugInfo && (
        <details className="mt-4 p-4 bg-gray-100 rounded text-sm">
          <summary className="cursor-pointer text-gray-600">Debug Info</summary>
          <pre className="mt-2 overflow-auto text-xs">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </details>
      )}
    </div>
  )
}

