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

  const handlePropertyTabClick = () => {
    setActiveTab('property')
    if (!pathname?.includes('blue-ridge-property-management')) {
      router.push('/blue-ridge-property-management')
    }
  }

  return (
    <div
      className={`bg-[50%_50%] bg-no-repeat  mx-auto relative z-[3] -mt-[109px] max-[1010px]:-mt-[80px] max-[767px]:-mt-[25px] max-[767px]:bg-repeat w-[1010px] max-[767px]:w-[94%] max-[1010px]:w-[756px] max-[767px]:bg-[url('/images/bg_search_bar_mobile4.png')] max-[767px]:bg-[center_bottom] max-[767px]:text-center max-[767px]:rounded-[8px_8px_0px_0px]
        ${isSearchActive ? "bg-[url('/images/bg_search_bar_search_active.png')] max-[1010px]:bg-[url('/images/bg_search_bar_search_active_756.png')]" 
                         : "bg-[url('/images/bg_search_bar_pm_active.png')] max-[1010px]:bg-[url('/images/bg_search_bar_pm_active_756.png')]"
        }`}
    >
      <div className="px-[35px] max-[1010px]:px-[25px] max-[767px]:p-[5px_0px_10px]">
        <div className="h-[136px] max-[1010px]:h-[102px] max-[767px]:h-[auto]">
          <div className="relative">
            <h2
              onClick={() => setActiveTab('search')}
              className="text-left italic text-white text-[30px] relative h-[30px] pt-0 inline-block cursor-pointer mt-[16px] mb-[21px] max-[1010px]:text-[150%] max-[1010px]:mt-[12px] max-[1010px]:mb-[15px] max-[767px]:text-[130%] max-[767px]:m-[0px_auto_0px_auto] max-[767px]:text-[#533e27]"
              style={{ textShadow: '1px 1px 2px #333' }}
            >
              Search Available Cabins
            </h2>
            <h2
              onClick={handlePropertyTabClick}
              className="absolute top-[5px] left-[371px] max-[1010px]:top-[2px] max-[1010px]:left-[278px]"
            >
              <span
                className="text-left italic text-white text-[30px] relative h-[30px] pt-0 inline-block cursor-pointer -mt-[2px] max-[1010px]:text-[150%] max-[767px]:hidden"
                style={{ textShadow: '1px 1px 2px #333' }}
              >
                Manage Your Property With Us
              </span>
            </h2>
          </div>
          <div className="relative">
            {isSearchActive ? (
              <form action="/" method="post" className="mt-[9px] ml-[5px] max-[1010px]:ml-[4px] max-[1010px]:-mt-[4px]  max-[767px]:mt-2">
                <div className='flex items-center gap-[28px] max-[1010px]:gap-[15px] max-[767px]:w-[295px] max-[767px]:flex-wrap max-[767px]:mx-auto max-[767px]:gap-[5px] max-[767px]:justify-between'>
                  <div className="relative">
                    <div className='flex items-center gap-2 max-[767px]:flex-col max-[767px]:gap-[0px]'>
                      <label htmlFor="arrival-date" className='text-[#533e27] text-[120%] -mt-[1px] max-[1010px]:text-[90%]' style={{ textShadow: '0px 0px 1px #533e27' }}>Arrival </label>
                      <input
                        type="text"
                        id="arrival-date"
                        name="arrival[date]"
                        value={arrivalDate}
                        onChange={(e) => setArrivalDate(e.target.value)}
                        size={20}
                        maxLength={30}
                        className="h-[29px] leading-[29px] border-none bg-[url('/images/bg_date_field.png')] bg-no-repeat bg-[right_center] text-base text-white rounded-tl-[20px] rounded-bl-[20px] outline-none bg-transparent p-[1px_2px_1px_15px] max-[1010px]:w-[140px] max-[1010px]:h-[25px] max-[1010px]:text-[80%] max-[1010px]:pl-[8px] w-[145px] -ml-[2px] max-[767px]:bg-[url('/images/bg_text_field_repeat.png')] max-[767px]:bg-repeat max-[767px]:rounded-[20px] max-[767px]:w-[130px]"
                        style={{ boxSizing: 'content-box' }}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <div className='flex items-center gap-2 max-[767px]:flex-col max-[767px]:gap-[0px]'>
                      <label htmlFor="departure-date" className='text-[#533e27] text-[120%] -mt-[1px] max-[1010px]:text-[90%]' style={{ textShadow: '0px 0px 1px #533e27' }}>Departure </label>
                      <input
                        type="text"
                        id="departure-date"
                        name="departure[date]"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        size={20}
                        maxLength={30}
                          className="h-[29px] leading-[29px] border-none bg-[url('/images/bg_date_field.png')] bg-no-repeat bg-[right_center] text-base text-white rounded-tl-[20px] rounded-bl-[20px] outline-none bg-transparent p-[1px_2px_1px_15px] max-[1010px]:w-[140px] max-[1010px]:h-[25px] max-[1010px]:text-[80%] max-[1010px]:pl-[8px] w-[145px] -ml-[2px] max-[767px]:bg-[url('/images/bg_text_field_repeat.png')] max-[767px]:bg-repeat max-[767px]:rounded-[20px]  max-[767px]:w-[130px]"
                        style={{ boxSizing: 'content-box' }}
                      />
                    </div>
                  </div>
                  <input type="hidden" name="difference" value="172800000" />
                  <input type="hidden" name="dest" value="node" />
                  <input type="hidden" name="search_by" value="type" />
                  <input
                    type="submit"
                    name="op"
                    value="Search"
                    className="relative italic text-[140%] w-[110px] h-[31px] rounded-[20px] -mt-[3px] bg-[url('/images/bg_search_repeat.png')] bg-repeat-x text-white ml-[10px] p-[1px_6px_1px_6px] max-[1010px]:w-[82px] max-[1010px]:h-[27px] max-[1010px]:text-[110%] max-[1010px]:p-[0px_0px_0px_0px] max-[1010px]:ml-[0px] max-[1010px]:mt-[1px] max-[1010px]:ml-[2px] "
                    style={{ boxShadow: '0px 2px 4px rgba(0,0,0,.3)', lineHeight: '29px'}}
                  />
                  <Link
                    href="/availability"
                    className="pt-[5px] pb-0 pl-[4px] pr-0 inline-block leading-[90%] text-[#533e27] no-underline font-normal text-[105%] text-right bg-[url('/images/master_calendar_checkmark.png')] bg-no-repeat bg-[0px_0px] bg-transparent bg-[length:18px] hover:text-[#2f0f00] ml-[7px] max-[1010px]:text-[90%] max-[1010px]:bg-[length:15px] max-[1010px]:ml-[0px]"
                    style={{ textShadow: '0 0 1px #533e27' }}
                    title="View a master availability calendar showing all cabins"
                  >
                    Master<br />Calendar
                  </Link>
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
