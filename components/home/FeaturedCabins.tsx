'use client'

import Link from 'next/link'
import Image from 'next/image'

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
          {featuredCabins.map((cabin, index) => (
            <div
              key={cabin.id}
              className={`relative w-full`}
            >
              {/* Property Image */}
              <div className="relative">
                {/* Wide Image */}
                <div className="block">
                  <Link href={cabin.href}>
                    <Image
                      src={cabin.image}
                      alt={`${cabin.name} | Cabin Rentals of Georgia`}
                      width={609}
                      height={390}
                      className="w-full h-auto"
                    />
                  </Link>
                </div>

                {/* Photo Count */}
                {cabin.photoCount > 0 && (
                  <div className="-mt-[45px] relative float-right text-white bg-[url('/images/bg_camera2.png')] bg-center bg-no-repeat w-[65px] h-[65px] leading-[70px] text-center -right-[15px]">
                    <Link
                      href={cabin.href}
                      className="p-2.5 text-white no-underline"
                    >
                      {cabin.photoCount}
                    </Link>
                  </div>
                )}
              </div>

              <div className='flex justify-between w-full'>
                <div className='flex flex-col'>
                  {/* Title */}
                  <div className="-mt-1.5 relative ml-1 text-[140%] mt-0">
                    <Link href={cabin.href} className="text-[#7c2c00] underline">
                      {cabin.name}
                    </Link>
                  </div>

                  {/* Bedrooms */}
                  <span className="-mt-2 text-[110%] text-[#533e27]">
                    {cabin.bedrooms}
                  </span>

                  {/* Sleeps */}
                  <div className="-mt-2 text-[110%] text-[#533e27]">
                    {cabin.sleeps}
                  </div>
                  {/* Minimum Rate */}
                  <div className="-mt-2 text-[110%] text-[#533e27]">
                    {cabin.rate}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    className="bg-[url('/images/icon_save_favorite5.png')] bg-center bg-no-repeat w-[100px] h-[30px] text-white text-[110%]" />
                  <div className="flex mt-5">
                    {cabin.amenities.map((amenity) => (
                      <Image
                        key={amenity}
                        src={amenityIcons[amenity] || '/images/icon_internet_0.png'}
                        alt={amenity.replace('-', ' ')}
                        title={amenity.replace('-', ' ')}
                        width={24}
                        height={24}
                        className='cursor-pointer'
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

