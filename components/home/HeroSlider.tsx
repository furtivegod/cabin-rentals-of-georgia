'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const slides = [
  {
    image: '/images/slide_rustic.jpg',
    title: 'The Cabins',
    body: 'Experience Blue Ridge in a place where luxury is a way of life',
    titleClass: 'fadeleft',
    bodyClass: 'faderight',
  },
  {
    image: '/images/RR.jpeg',
    title: 'The Experience',
    body: 'A place to look for the unexpected and find more than you imagined',
    titleClass: 'fade',
    bodyClass: 'fade',
  },
  {
    image: '/images/IMG_9547 copy.jpg',
    title: 'The Memories',
    body: 'A place where friends and family reconnect...where ambiance creates lasting memories',
    titleClass: 'fade',
    bodyClass: 'fade',
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % slides.length
        // Reset animation key to retrigger animations
        setAnimationKey((k) => k + 1)
        return next
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-[466px] bg-[url('/images/bg_top3.jpg')] bg-[50%_100%] bg-repeat-x shadow-[0px_0px_40px_-5px_#000] relative z-[2] overflow-hidden -mt-2.5">
      <div className="relative h-[466px] mx-auto z-[3] text-center">
        <div id="banner-wrapper" className="relative w-full h-full">
          <div id="banner" className="relative w-full h-full">
            <ul className="list-none p-0 m-0 relative w-full h-full">
              {slides.map((slide, index) => (
                <li
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <div className="creative_layer relative w-full h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        className="object-cover"
                        fill
                        priority={index === 0}
                      />
                    </div>
                    {/* Overlay Image */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                      <Image
                        src="/images/bg_top_overlay9.png"
                        alt=""
                        className="object-cover"
                        fill
                        priority={index === 0}
                      />
                    </div>
                    {/* Text Captions */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="text-center text-white px-4">
                        <div
                          key={`title-${index}-${animationKey}`}
                          className={`caption-title ${slide.titleClass} ${
                            index === currentSlide && isMounted ? 'animate-in' : ''
                          } text-4xl md:text-5xl font-bold mb-4`}
                        >
                          {/* {slide.title} */}
                        </div>
                        <div
                          key={`body-${index}-${animationKey}`}
                          className={`caption-body ${slide.bodyClass} ${
                            index === currentSlide && isMounted ? 'animate-in' : ''
                          } text-xl md:text-2xl`}
                        >
                          {/* {slide.body} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

