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
        {/* Favorite heart icon on image */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 left-2 z-10 w-8 h-8 flex items-center justify-center"
          title={isPropertyFavorite ? 'Remove from comparison' : 'Add to comparison'}
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-7 h-7 transition-all ${isPropertyFavorite ? 'fill-red-600 stroke-red-600' : 'fill-white/50 stroke-red-600'}`}
            strokeWidth="2"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {/* Add to compare icon */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 left-11 z-10 w-8 h-8 flex items-center justify-center"
          title={isPropertyFavorite ? 'Remove from comparison' : 'Add to comparison'}
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-6 h-6 transition-all ${isPropertyFavorite ? 'fill-green-600 stroke-green-600' : 'fill-white/50 stroke-green-700'}`}
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

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
          {/* Daily Rate */}
          {property.today_rate && (
            <div className="-mt-2 text-[110%] text-[#533e27]">
              from ${Math.round(property.today_rate)}/night
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={handleFavoriteClick}
            className={`bg-center bg-no-repeat w-[100px] h-[30px] text-white text-[110%] transition-opacity ${
              isPropertyFavorite 
                ? "bg-[url('/images/icon_save_favorite5.png')] opacity-100" 
                : "bg-[url('/images/icon_save_favorite5.png')] opacity-70 hover:opacity-100"
            }`}
            title={isPropertyFavorite ? 'Remove from comparison' : 'Add to comparison'}
          />
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

