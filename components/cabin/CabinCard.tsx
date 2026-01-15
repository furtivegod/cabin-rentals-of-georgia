'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Property } from '@/lib/types'

interface CabinCardProps {
  property: Property
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

export default function CabinCard({ property }: CabinCardProps) {
  console.log(property, "property")
  return (
    <div
      className={`relative w-full`}
    >
      {/* Property Image */}
      <div className="relative">
        {/* Wide Image */}
        <div className="block">
          <Link href={`/cabin/${property.cabin_slug}`}>
            <Image
              src={property?.featured_image_url || ''}
              alt={`${property?.title || ''} | Cabin Rentals of Georgia`}
              width={609}
              height={390}
              className="w-full h-auto"
            />
          </Link>
        </div>

        <div className="-mt-[45px] relative float-right text-white bg-[url('/images/bg_camera2.png')] bg-center bg-no-repeat w-[65px] h-[65px] leading-[70px] text-center -right-[15px]">
          <Link
            href={`/cabin/${property.cabin_slug}`}
            className="p-2.5 text-white no-underline"
          >
            {property.gallery_images?.length}
          </Link>
        </div>
      </div>

      <div className='flex justify-between w-full'>
        <div className='flex flex-col'>
          {/* Title */}
          <div className="-mt-1.5 relative ml-1 text-[140%] mt-0">
            <Link href={`/cabin/${property.cabin_slug}`} className="text-[#7c2c00] underline">
              {property?.title}
            </Link>
          </div>

          {/* Bedrooms */}
          <span className="-mt-2 text-[110%] text-[#533e27]">
            {property?.bedrooms}
          </span>

          {/* Sleeps */}
          <div className="-mt-2 text-[110%] text-[#533e27]">
            Sleeps {property?.sleeps}
          </div>
          {/* Minimum Rate */}
          <div className="-mt-2 text-[110%] text-[#533e27]">
            {/* {property.rate} */}
            from $465/night
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="bg-[url('/images/icon_save_favorite5.png')] bg-center bg-no-repeat w-[100px] h-[30px] text-white text-[110%]" />
          {/* <div className="flex mt-5">
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
          </div> */}
        </div>
      </div>
    </div>
  )
}

