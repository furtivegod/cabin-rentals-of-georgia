'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function PropertySearch() {
  const [arrivalDate, setArrivalDate] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'search' | 'property'>('search')

  // Sync active tab with current pathname
  useEffect(() => {
    if (pathname?.includes('blue-ridge-property-management')) {
      setActiveTab('property')
    } else {
      setActiveTab('search')
    }
  }, [pathname])

  const isSearchActive = activeTab === 'search'
  const isPropertyActive = activeTab === 'property'

  const handlePropertyTabClick = () => {
    setActiveTab('property')
    if (!pathname?.includes('blue-ridge-property-management')) {
      router.push('/blue-ridge-property-management')
    }
  }

  return (
    <div
      className={`bg-[50%_50%] bg-no-repeat w-[1010px] h-[136px] mx-auto relative z-[3] -mt-[109px] ${isSearchActive
          ? "bg-[url('/images/bg_search_bar_search_active.png')]"
          : "bg-[url('/images/bg_search_bar_pm_active.png')]"
        }`}
    >
      <div className="px-[35px]">
        <div className="h-[136px]">
          <div className="relative">
            <h2
              onClick={() => setActiveTab('search')}
              className="text-left italic text-white text-[30px] relative h-[30px] mb-[21px] mt-[20px] pt-0 inline-block cursor-pointer"
              style={{ textShadow: '1px 1px 2px #333' }}
            >
              Search Available Cabins
            </h2>
            <h2
              onClick={handlePropertyTabClick}
              className="absolute top-[5px] left-[371px]"
            >
              <span
                className="text-left italic text-white text-[30px] relative h-[30px] pt-0 inline-block cursor-pointer"
                style={{ textShadow: '1px 1px 2px #333' }}
              >
                Manage Your Property With Us
              </span>
            </h2>
          </div>
          <div className="relative">
            {isSearchActive ? (
              <form action="/" method="post">
                <div>
                  <div className='flex items-center gap-8'>
                    <div className="float-left relative">
                      <div>
                        <div className='flex items-center gap-2'>
                          <label htmlFor="arrival-date" className='text-[#533e27] text-[105%] font-bold'>Arrival </label>
                          <input
                            type="text"
                            id="arrival-date"
                            name="arrival[date]"
                            value={arrivalDate}
                            onChange={(e) => setArrivalDate(e.target.value)}
                            size={20}
                            maxLength={30}
                            className="h-[29px] leading-[29px] pl-[15px] border-none bg-[url('/images/bg_date_field.png')] bg-no-repeat bg-[right_center] text-base text-white rounded-tl-[20px] rounded-bl-[20px] outline-none bg-transparent w-[150px]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="float-left relative">
                      <div>
                        <div className='flex items-center gap-2'>
                          <label htmlFor="departure-date" className='text-[#533e27] text-[105%] font-bold'>Departure </label>
                          <input
                            type="text"
                            id="departure-date"
                            name="departure[date]"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            size={20}
                            maxLength={30}
                            className="h-[29px] leading-[29px] pl-[15px] border-none bg-[url('/images/bg_date_field.png')] bg-no-repeat bg-[right_center] text-base text-white rounded-tl-[20px] rounded-bl-[20px] outline-none bg-transparent w-[150px]"
                          />
                        </div>
                      </div>
                    </div>
                    <input type="hidden" name="difference" value="172800000" />
                    <input type="hidden" name="dest" value="node" />
                    <input type="hidden" name="search_by" value="type" />
                    <input
                      type="submit"
                      name="op"
                      value="Search"
                      className="relative italic text-[140%] w-[99px] h-[39px] bg-[url('/images/bg_search.png')] text-white"
                    />
                    <Link
                      href="/availability"
                      className="pt-[5px] pb-0 pl-[4px] pr-0 inline-block leading-[90%] text-[#533e27] no-underline font-normal text-[105%] text-right bg-[url('/images/master_calendar_checkmark.png')] bg-no-repeat bg-[0px_0px] bg-transparent bg-[length:18px] hover:text-[#2f0f00]"
                      style={{ textShadow: '0 0 1px #533e27' }}
                      title="View a master availability calendar showing all cabins"
                    >
                      Master<br />Calendar
                    </Link>
                  </div>
                </div>
              </form>
            ) : (
              <h2 className="text-center italic text-[35px] text-[#533e27] mt-0">
                Blue Ridge Property Management
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
