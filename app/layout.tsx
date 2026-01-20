import type { Metadata } from 'next'
import HeroSlider from '@/components/home/HeroSlider'
import PropertySearch from '@/components/property/PropertySearch'
import Sidebar from '@/components/home/Sidebar'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

import './globals.css'

export const metadata: Metadata = {
  title: 'Blue Ridge, GA Cabin Rentals | Cabin Rentals of Georgia',
  description: 'Family owned and family operated ~ Discover the perfect escape in our luxury Georgia cabins offering riverfront, mountain views, lake views ~ pet friendly, game rooms, hot tubs, fire pits, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[url('/images/bg_wrapper3.jpg')] bg-[50%_0%] bg-white">
        <Header />
        <HeroSlider />
        <PropertySearch />
        <div className="mb-10 max-w-[972px] w-[1010px] mx-auto w-[xplear plear -auto m972px] bg-[url('/images/bg_content.jpg')] bg-[50%_0] shadow-[0px_30px_60px_5px_#000] -top-5 relative z-[2] max-[1010px]:w-[724px] max-[767px]:w-[94%]">
          <div className="relative top-2.5">
            <div className="flex w-full max-[767px]:flex-col">
              <div className='w-full max-[767px]:w-full'>
                {children}
              </div>
              <Sidebar />
            </div>
          </div>
          <Footer />
        </div >
      </body>
    </html>
  )
}
