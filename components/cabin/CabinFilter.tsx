'use client'

import { useState } from 'react'
import { Property } from '@/lib/types'
import CabinCard from './CabinCard'

interface CabinFilterProps {
  cabins: Property[]
}

export default function CabinFilter({ cabins }: CabinFilterProps) {
  const [selectedCabin, setSelectedCabin] = useState<string>('')

  const filteredCabins = selectedCabin
    ? cabins.filter((property) => property.title === selectedCabin)
    : cabins

  return (
    <>
      <div className="flex items-center justify-between bg-[url('/images/bg_featured_cabins.png')] p-[35px] h-[82px] mt-[25px]">
        <h2 className="text-center bg-center bg-no-repeat text-white text-[170%] italic">
          Featured Cabins
        </h2>
        <div className="flex items-center gap-2">
          <label htmlFor="cabin-filter" className="text-white mr-1.5 h-6 leading-6 text-[0.9em] italic">
            See Only
          </label>
          <select
            id="cabin-filter"
            name="title"
            className="border border-gray-300 px-2 py-1 rounded w-[170px]"
            value={selectedCabin}
            onChange={(e) => setSelectedCabin(e.target.value)}
          >
            <option value="">- Any -</option>
            {cabins.map((property) => (
              <option key={property.id} value={property.title}>
                {property.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5 pt-5 bg-[url('https://media.cabin-rentals-of-georgia.com/sites/all/themes/crog/images/cabin_separator.png')] bg-center bg-no-repeat bg-top">
        <div className="flex flex-col gap-8 mt-5">
          {filteredCabins.length > 0 && filteredCabins.map((property: Property) => (
            <CabinCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </>
  )
}

