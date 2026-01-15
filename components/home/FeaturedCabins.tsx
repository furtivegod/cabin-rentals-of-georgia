'use client'

import Link from 'next/link'
import CabinCard from '../cabin/CabinCard'

// Sample cabin data - replace with actual data from API
const featuredCabins = [
  {
    id: 3213,
    name: 'Skyfall',
    href: '/cabin/morganton/skyfall',
    image: '/images/IMG_9616-HDR.jpg',
    bedrooms: '4 Bedroom',
    sleeps: 'Sleeps 8',
    amenities: ['internet', 'hot-tub', 'coffee', 'gas-grill', 'outdoor-fireplace', 'indoor-fireplace', 'no-smoking'],
    rate: 'from $325/night',
    photoCount: 48,
  },
  {
    id: 3200,
    name: 'Chase Mountain Dreams',
    href: '/cabin/chase-mountain-dreams',
    image: '/images/IMG_9054-HDR-2.jpg',
    bedrooms: '4 Bedroom',
    sleeps: 'Sleeps 10',
    amenities: ['pets', 'internet', 'game-room', 'hot-tub', 'billiards', 'coffee', 'gas-grill', 'indoor-fireplace', 'no-smoking'],
    rate: 'from $299/night',
    photoCount: 30,
  },
  {
    id: 2454,
    name: 'Above The Timberline',
    href: '/cabin/blue-ridge/above-the-timberline',
    image: '/images/05.17.2019.02.jpg',
    bedrooms: '4 Bedroom',
    sleeps: 'Sleeps 8',
    amenities: ['pets', 'internet', 'game-room', 'hot-tub', 'billiards', 'coffee', 'gas-grill', 'outdoor-fireplace', 'indoor-fireplace', 'no-smoking'],
    rate: 'from $325/night',
    photoCount: 36,
  }
]

export default function FeaturedCabins() {
  return (
    <>
      <div className="flex items-center justify-between bg-[url('/images/bg_featured_cabins.png')] p-[35px] h-[82px]  mt-[25px]">
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
          >
            <option value="">- Any -</option>
            {featuredCabins.map((cabin) => (
              <option key={cabin.id} value={cabin.name}>
                {cabin.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Cabin Grid */}
      <div className="mt-5 pt-5 bg-[url('https://media.cabin-rentals-of-georgia.com/sites/all/themes/crog/images/cabin_separator.png')] bg-center bg-no-repeat bg-top">
        <div className="flex flex-col gap-8 mt-5">
          {featuredCabins.map((cabin) => (
            <CabinCard
              key={cabin.id}
              cabin={cabin}
            />
          ))}
        </div>
      </div>
    </>
  )
}

