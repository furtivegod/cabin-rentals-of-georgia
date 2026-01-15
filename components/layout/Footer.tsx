import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const footerMenuItems = [
    { title: '2 Bedroom Cabins', href: '/cabins/2-bedroom/all' },
    { title: '3 Bedroom Cabins', href: '/cabins/3-bedroom/all' },
    { title: '4 Bedroom Cabins', href: '/cabins/4-bedroom/all' },
    { title: '5 Bedroom Cabins', href: '/cabins/5-bedroom/all' },
    { title: 'Blue Ridge Luxury Cabins', href: '/cabins/all/blue-ridge-luxury' },
    { title: 'Cabin In The Woods Cabins', href: '/cabins/all/cabin-in-the-woods' },
    { title: 'Corporate Retreats Cabins', href: '/cabins/all/corporate-retreats' },
    { title: 'Family Reunion Cabins', href: '/cabins/all/family-reunion' },
    { title: 'Lake View Cabins', href: '/cabins/all/lake-view' },
    { title: 'Mountain View Cabins', href: '/cabins/all/mountain-view' },
    { title: 'Pet Friendly Cabins', href: '/cabins/all/pet-friendly' },
    { title: 'River Front Cabins', href: '/cabins/all/river-front' },
    { title: 'River View Cabins', href: '/cabins/all/river-view' },
    { title: 'Toccoa River Luxury Cabin Rentals Cabins', href: '/cabins/all/toccoa-river-luxury-cabin-rentals' },
  ]

  const socialMediaLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/CabinRentalsofGeorgia',
      iconSrc: '/images/social_icons/icon_fb.png',
      alt: 'Facebook',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/crgluxury/',
      iconSrc: '/images/social_icons/icon_instagram.png',
      alt: 'Instagram',
    },
    {
      name: 'Twitter',
      href: 'https://x.com/CRGLuxury',
      iconSrc: '/images/social_icons/icon_twitter.png',
      alt: 'Twitter',
    },
    {
      name: 'Pinterest',
      href: 'https://pinterest.com/crgluxury/',
      iconSrc: '/images/social_icons/icon_pinterest.png',
      alt: 'Pinterest',
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/channel/UCi4BOs7O9xcsAUIMpG0OKlg',
      iconSrc: '/images/social_icons/icon_youtube.png',
      alt: 'YouTube',
    },
  ]

  return (
    <div className="min-h-[380px] w-full bg-[url('/images/bg_footer2.png')] bg-[50%_0] bg-no-repeat p-0 m-0 relative -bottom-[7px]">
      <div className="bg-[url('/images/bg_footer_logo.png')] bg-[50%_120%] bg-no-repeat w-full min-h-[370px] max-[1010px]:bg-none">
        {/* Social Links */}
        <div className="flex px-[2%] pt-[40px] justify-center">
          <div className="flex flex-col flex-basis-1 bg-[url('/images/bg_footer_social.png')] bg-center bg-top bg-no-repeat h-[325px] min-w-[243px] pl-[25px] pt-[25px] max-[767px]:bg-none max-[767px]:min-w-0 max-[767px]:pl-0 max-[767px]:mr-[5px]">
            <h2 className="font-normal italic text-[170%] leading-[100%] text-white mb-[20px] ml-[5px] mt-0 max-[767px]:hidden">Connect with Us</h2>
            <ul className="list-none p-0 m-0 flex flex-col gap-[8px] ml-[25px] italic max-[767px]:ml-0 max-[767px]:mr-[10px]">
              {socialMediaLinks.map((social, index) => (
                <li key={index} >
                  <Link
                    href={social.href}
                    className="flex items-center gap-2 text-white underline hover:text-[#c0e901] -mt-1 no-underline w-[22px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={social.iconSrc}
                      alt={social.alt}
                      width={24}
                      height={24}
                      className='w-[22px] h-auto'
                    />
                    <span className='ml-[5px] max-[767px]:hidden'>{social.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col max-[1010px]:hidden'>
            <h3 className="text-[130%] font-normal text-[#533e27] m-0">North Georgia Cabins in Blue Ridge, GA</h3>
            <ul className="flex flex-wrap max-w-[400px]">
              {footerMenuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="underline text-[#7c2c00] mr-[10px] text-[90%]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col max-w-[290px] max-[1010px]:flex-row max-[1010px]:max-w-[100%] max-[767px]:flex-col'>
            {/* Chamber Logos */}
            <div className='flex flex-col'>
              <p className="m-0 text-[#533e27]">Proudly serving Blue Ridge for almost 20 years!</p>
              <p className="m-0 flex mt-[5px]">
                <Link
                  href="https://www.blueridgemountains.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline"
                >
                  <Image
                    src="/images/FanninChamberLogo.png"
                    alt="Fannin County Chamber"
                    width={200}
                    height={100}
                    className="max-w-[100px] mr-[25px]"
                  />
                </Link>
                <Link
                  href="https://www.vrma.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pt-2.5"
                >
                  <Image
                    src="/images/vrma.png"
                    alt="VRMA"
                    width={200}
                    height={100}
                    className="max-w-[100px]"
                  />
                </Link>
              </p>
            </div>

            {/* Contact Info */}
            <div className='flex flex-col pl-[25px]  max-[1010px]:mt-[40px]  max-[1010px]:pl-0 max-[767px]:mt-[5px]'>
              <div className="text-white text-[90%]" style={{ textShadow: '0px 0px 13px #000' }}>
                <span className='text-[90%]'>Cabin Rentals of Georgia, L.L.C.</span>
                <br />
                Main:{' '}
                <Link href="tel:706-432-2140" className="text-white no-underline hover:text-[#c0e901] " >
                  706-432-2140
                </Link>
                <br />
                <div>
                  <span>86 Huntington Way</span>
                  <br />
                  <span>Blue Ridge</span>, <span>Georgia</span> <span>30513</span>
                  <br />
                </div>
              </div>
              <p className="mt-[10px]">
                <Link
                  href="https://owner.streamlinevrs.com/auth_login.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-[#c0e901]"
                >
                  Owner Login
                </Link>
                <br />
                <Link href="/node/1213" className="text-white underline hover:text-[#c0e901]">
                  Privacy Policy
                </Link>
              </p>
              <p className="mt-[10px]">
                <Link href="/north-georgia-vacation-rentals" className="text-white underline hover:text-[#c0e901]">
                  North Georgia Cabin Rentals
                </Link>
                <br />
                <Link href="/blue-ridge-cabins?all=1" className="text-white underline hover:text-[#c0e901]">
                  Blue Ridge Cabin Rentals
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
