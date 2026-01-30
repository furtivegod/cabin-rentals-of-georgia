import HeroSlider from '@/components/home/HeroSlider'
import PropertySearch from '@/components/property/PropertySearch'
import Sidebar from '@/components/home/Sidebar'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[url('/images/bg_wrapper3.jpg')] bg-[50%_0%] bg-white min-h-screen">
      <Header />
      <HeroSlider />
      <PropertySearch />
      <div className="mb-10 max-w-[972px] w-[1010px] mx-auto bg-[url('/images/bg_content.jpg')] bg-[50%_0] shadow-[0px_30px_60px_5px_#000] -top-5 relative z-[2] max-[1010px]:w-[724px] max-[767px]:w-[94%]">
        <div className="relative top-2.5">
          <div className="flex w-full max-[767px]:flex-col">
            <div className='w-full max-[767px]:w-full'>
              {children}
            </div>
            <Sidebar />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

