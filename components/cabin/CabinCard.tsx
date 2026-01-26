'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Property } from '@/lib/types'
import { amenityIcons } from '@/lib/constants/amenity-icons'

interface CabinCardProps {
  property: Property
}

export default function CabinCard({ property }: CabinCardProps) {
  if (!property) {
    return null
  }
  
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
              src={property?.featured_image_url?.replace("/sites/default/files/", "/images/styles/cabins_listing_large2/public/") || ''}
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
            from ${property?.minimum_rate || 0}/night
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="bg-[url('/images/icon_save_favorite5.png')] bg-center bg-no-repeat w-[100px] h-[30px] text-white text-[110%]" />
          <div className="flex mt-5 justify-center items-center gap-[3px]">
            {property.amenities?.map((amenity) => (
              <Image
                key={amenity.name}
                src={amenityIcons[amenity.name] || '/images/icon_internet_0.png'}
                alt={amenity.name}
                title={amenity.name}
                width={24}
                height={24}
                className='cursor-pointer'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

