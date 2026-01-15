'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mainMenuHover, setMainMenuHover] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const mainMenuItems = [
    {
      title: 'Blue Ridge Cabins',
      href: '/blue-ridge-cabins?all=1',
      submenu: [
        { title: 'Blue Ridge Luxury Cabins', href: '/cabins/all/blue-ridge-luxury' },
        { title: 'Family Reunion Cabins', href: '/cabins/all/family-reunion' },
        { title: 'Corporate Retreat Cabins', href: '/cabins/all/corporate-retreats' },
        { title: 'Cabins With Hot Tubs', href: '/cabins/amenities/hot-tub' },
        { title: 'Cabins With Game Rooms', href: '/cabins/amenities/game-room' },
        { title: 'Motorcycle Friendly Cabins', href: '/cabins/amenities/motorcycle-friendly' },
        { title: 'Pet Friendly Cabins', href: '/cabins/all/pet-friendly' },
        { title: 'Mountain View Cabins', href: '/cabins/all/mountain-view' },
        { title: 'Creek & Riverfront Cabins', href: '/cabins/all/river-front' },
        { title: 'River View Cabins', href: '/cabins/all/river-view' },
        { title: 'Lake View Cabins', href: '/cabins/all/lake-view' },
        { title: 'Cabins in the Woods', href: '/cabins/all/cabin-in-the-woods' },
        { title: 'All Cabin Rentals', href: '/blue-ridge-cabins?all=1' },
      ],
    },
    {
      title: 'Blue Ridge Experience',
      href: '/blue-ridge-experience?all=1',
      submenu: [
        { title: 'About Blue Ridge, GA', href: '/about-blue-ridge-ga' },
        { title: 'Blue Ridge, GA Activities', href: '/blue-ridge-georgia-activities' },
      ],
    },
    {
      title: 'Blue Ridge Memories',
      href: '/blue-ridge-memories?all=1',
    },
  ]

  const secondaryMenuItems = [
    { title: 'FAQ', href: '/faq' },
    { title: 'Blog', href: '/blogs' },
    { title: 'Policies', href: '/rental-policies' },
    { title: 'About Us', href: '/about-us' },
    { title: 'Property Management', href: '/blue-ridge-property-management' },
  ]

  const handleMouseEnter = (title: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setMainMenuHover(title)
    }, 100) // 200ms delay to show
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setMainMenuHover(null)
    }, 100) // 300ms delay to hide
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* Nav Bar */}
      <div id="nav-bar" className="h-[45px] md:h-[57px] bg-[#122225] shadow-[0px_0px_20px_0px_#000] relative z-[100] inline-block w-full">
        <div className="region-nav-bar w-full m-auto h-full flex items-center justify-between relative z-[100] p-[6px_12px]">
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <Image
              src="/images/mobilemenu_hamburger.png"
              alt="menu"
              width={24}
              height={24}
            />
          </button>

          {/* Main Menu - Left Side */}
          <div className="hidden md:flex h-full pb-[6px]">
            <ul className="flex items-end h-full -ml-[10px]  max-[1010px]:-mt-[16px] max-[1010px]:-ml-[5px]">
              {mainMenuItems.map((item, index) => (
                <li
                  key={index}
                  className="flex relative"
                  onMouseEnter={() => item.submenu && handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center text-[#91b000] no-underline px-[10px] leading-none hover:text-[#c0e901] text-base max-[1010px]:px-[5px]  max-[1010px]:text-[95%] ${index !== mainMenuItems.length - 1 ? 'border-r border-[#91b000]' : ''}`}
                  >
                    {item.title}
                  </Link>
                  {item.submenu && mainMenuHover === item.title && (
                    <ul
                      className="absolute top-full left-0 w-[190px] bg-[#122225] border border-[#343f00] z-50 mt-[20px] opacity-[0.9]"
                      onMouseEnter={() => item.submenu && handleMouseEnter(item.title)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.submenu.map((sub, subIndex) => (
                        <li
                          key={subIndex}
                          className="bg-[#122225] text-[#91b000] border-b border-[#343f00] hover:bg-[#122225] hover:text-[#c0e901]"
                        >
                          <Link
                            href={sub.href}
                            className="block w-full py-1 px-[10px] hover:text-[#c0e901]"
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Secondary Menu, Phone, Facebook Button */}
          <div className="flex flex-col items-end justify-center h-full">
            {/* Secondary Menu - Top */}
            <ul className="hidden md:flex items-center">
              {secondaryMenuItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Link
                    href={item.href}
                    className={`flex items-center text-[#7f979a] no-underline px-1.5 my-[1.5] mt-[9px] leading-none hover:text-[#c1d5d7] max-[1010px]:px-[6px] max-[1010px]:mt-[8px] max-[1010px]:text-[90%] ${index !== secondaryMenuItems.length - 1 ? 'border-r border-[#7f979a]' : ''
                      }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Phone Number and Facebook Button - Bottom */}
            <div className="flex items-center gap-[46px] max-[1010px]:gap-[46px] max-[1010px]:mt-[0px] ">
              <div className="text-[#91b000] text-[17px] text-[17.6px] max-[1010px]:text-[105%] max-[1010px]:pt-[2px] max-[767px]:text-[17.28px] max-[767px]:-mr-[2px]">
                Contact Us:{' '}
                <Link
                  href="tel:7064322140"
                  className="no-underline max-[767px]:text-[#c0e901]"
                >
                  706-432-2140
                </Link>
              </div>
              <div
                className="hidden md:inline-flex  rounded-[3px] items-center cursor-pointer rounded-sm text-white bg-[#4167b2] text-[12px] tracking-[0.5px] font-sans leading-[100%] p-[4px_7px_4px_11px] -mt-[1px] mr-[8px] max-[1010px]:mt-[2px]"
                style={{ fontFamily: 'Arial' }}
              >
                <i className="fa-solid fa-thumbs-up text-[13px] pr-[7px]"></i>
                Like
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#122225] border-t border-[#343f00]">
            <div className="px-4 py-4 space-y-3">
              {mainMenuItems.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.href}
                    className="block text-[#91b000] hover:text-[#c0e901] font-bold"
                  >
                    {item.title}
                  </Link>
                  {item.submenu && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={sub.href}
                            className="block text-sm text-[#91b000] hover:text-[#c0e901]"
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <div className="border-t border-[#343f00] pt-3 mt-3">
                {secondaryMenuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block text-[#7f979a] hover:text-[#c1d5d7] mb-2"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Logo */}
        <div id="logo" className="relative m-auto z-[100] w-[180px] md:w-[276px] -top-[47px] max-[1010px]:-top-[37px] max-[767px]:-top-[45px] ">
          <Link href="/" className="h-auto absolute top-0">
            <Image
              src="/images/logo.png"
              alt="Cabin Rentals of Georgia"
              width={276}
              height={115}
              className="h-auto"
              priority
            />
          </Link>
        </div>
      </div>
    </>
  )
}
