import FeaturedCabins from '@/components/home/FeaturedCabins'
import Link from 'next/link'
import { getAllCabins } from '@/lib/api/cabins'
import CabinCard from '@/components/cabin/CabinCard'
import { Property } from '@/lib/types'
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


export default async function Home() {
  const cabins = await getAllCabins()
  return (
    <div className="mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
      <div className="mb-8">
        <h1 className="font-normal italic text-[220%] text-[#7c2c00] leading-[100%] my-[15px] mx-0">
          <em>Luxury Cabins in Blue Ridge, GA</em>
        </h1>
        <p className="text-[120%] text-[#533e27] mb-4">
          As a family owned and operated Blue Ridge, GA vacation rental provider for over 20 years,
          Cabin Rentals of Georgia offers a boutique collection of luxury vacation rentals. Just 90
          miles north of Atlanta, GA, escape the city and spend a weekend (or longer) in the best
          cabins in Georgia.&nbsp;
        </p>
        <div className="space-y-2 mb-4">
          <p>
            <strong>
              <Link href="/cabins/all/family-reunion" className="text-[#7c2c00] text-[120%] underline hover:text-[#b7714b]">
                Family Reunion&nbsp;
              </Link>
            </strong>
          </p>
          <p>
            <strong>
              <Link href="/amenities/hot-tub" className="text-[#7c2c00] text-[120%] underline hover:text-[#b7714b]">
                Cabins With Hot Tubs
              </Link>
            </strong>
          </p>
          <p>
            <strong>
              <Link href="/cabins/all/mountain-view" className="text-[#7c2c00] text-[120%] underline hover:text-[#b7714b]">
                Mountain View Cabins
              </Link>
            </strong>
          </p>
          <p>
            <strong>
              <Link href="/cabins/all/river-front" className="text-[#7c2c00] text-[120%] underline hover:text-[#b7714b]">
                Creek + Riverfront Cabins
              </Link>
            </strong>
          </p>
          <p>
            <strong>
              <Link href="/cabins/all/lake-view" className="text-[#7c2c00] text-[120%] underline hover:text-[#b7714b]">
                Lake View Cabins
              </Link>
            </strong>
          </p>
          <p>
            <Link href="/cabins/all/cabin-in-the-woods" className="text-[#7c2c00] text-[120%] underline hover:text-[#b7714b]">
              <strong>Cabins in the Woods</strong>
            </Link>
          </p>
          <p>
            <strong>
              <Link href="/cabins/all/pet-friendly" className="text-[#7c2c00] text-[120%] underline hover:text-[#b7714b]">
                Pet Friendly Cabins
              </Link>
            </strong>
          </p>
        </div>
        <h2 className="font-normal italic text-[170%] leading-[100%] text-[#7c2c00] mt-6 mb-4">
          <em>North Georgia Cabin Rentals</em>
        </h2>
        <p className="text-[120%] text-[#533e27]">
          Cabin Rentals of Georgia offers you a variety of hand-picked North Georgia cabin rentals
          ranging from cozy 2-bedrooms to magnificent 5-bedroom mountain lodges. Our properties offer
          deluxe hot tubs, fun game rooms with billiards, shuffleboard, arcade machines, along with
          fire pits, Toccoa River access, and other exciting amenities you expect from your private
          cabin rental.&nbsp;
        </p>
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
      </div>
      <div className="mt-5 pt-5 bg-[url('https://media.cabin-rentals-of-georgia.com/sites/all/themes/crog/images/cabin_separator.png')] bg-center bg-no-repeat bg-top">
        <div className="flex flex-col gap-8 mt-5">
          {cabins.length > 0 && cabins.map((property: Property) => (
            <CabinCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  )
}
