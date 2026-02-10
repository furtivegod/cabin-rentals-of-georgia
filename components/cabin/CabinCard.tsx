'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Property } from '@/lib/types'
import { amenityIcons } from '@/lib/constants/amenity-icons'
import { useFavorites } from '@/lib/hooks/useFavorites'

interface CabinCardProps {
  property: Property
}

export default function CabinCard({ property }: CabinCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const isPropertyFavorite = isFavorite(property?.id)

  if (!property) {
    return null
  }

  const handleFavoriteClick = () => {
    toggleFavorite(property)
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

        <div className="-mt-[45px] absolute text-white bg-[url('/images/bg_camera2.png')] bg-center bg-no-repeat w-[65px] h-[65px] leading-[70px] text-center -right-[15px]">
          <Link
            href={`/cabin/${property.cabin_slug}`}
            className="p-2.5 !text-white !no-underline"
          >
            {property.gallery_images?.length}
          </Link>
        </div>
      </div>

      <div className='flex justify-between w-full mt-[6px]'>
        <div className='flex flex-col  gap-[8px]'>
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
          {/* Daily Rate */}
          {property.today_rate && (
            <div className="-mt-2 text-[110%] text-[#533e27]">
              from ${Math.round(property.today_rate)}/night
            </div>
          )}
        </div>
        <div className="flex flex-col items-center max-[460px]:hidden">
          <button
            onClick={handleFavoriteClick}
            className={`flex bg-[center_right] bg-no-repeat w-[100px] h-[30px] text-white text-[110%] transition-opacity ${
              isPropertyFavorite 
                ? "bg-[url('/images/icon_remove_favorite5.png')]" 
                : "bg-[url('/images/icon_save_favorite5.png')]"
            }`}
            title={isPropertyFavorite ? 'Remove from comparison' : 'Add to comparison'}
          />
          <div className="flex mt-5 justify-end items-center gap-[3px] min-w-[267px]">
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

