import Link from 'next/link'
import Image from 'next/image'

const testimonials = [
  {
    cabin: 'High Hopes',
    cabinHref: '/cabin/blue-ridge/high-hopes',
    body: 'The Sandlot Crew, college friends for 42+ years, enjoyed our stay for fun, football, and relaxing! The cabin was perfect for us with the perfect accommodations. Hope to stay here again! Thank you for your hospitality!',
    customerImage: '/images/testimonial_default.jpg',
  },
  {
    cabin: 'Riverview Lodge',
    cabinHref: '/cabin/blue-ridge/riverview-lodge',
    body: 'Our stay in Blue Ridge was wonderful! It was really relaxing. The view was gorgeous! The cabin was quiet, spacious, and nice. The cabin was well stocked with all the must-haves! Thank you for all the accommodations!',
    customerImage: '/images/testimonial_default.jpg',
  },
]

const callToActions = [
  {
    title: 'Christmas Cabin Rentals in Blue Ridge, GA',
    href: '/christmas-new-years-cabin-rentals-blue-ridge-ga',
    image: '/images/IMG_0416.jpeg',
    alt: '',
    titleAttr: '',
  },
  {
    title: 'Specials!',
    href: '/specials-discounts',
    image: '/images/Specials.png',
    alt: 'Check out Special Offers on Blue Ridge Luxury Cabin Rentals',
    titleAttr: 'Special Offers on Blue Ridge Luxury Cabin Rentals',
  },
  {
    title: 'Planning Your Large Group Event in Blue Ridge, GA',
    href: '/large-groups-family-reunions',
    image: '/images/LG-call-to-action.jpg',
    alt: 'a small fly fishing corporate retreat on Wilscot Creek in North Georgia',
    titleAttr: 'A small corporate retreat fly fishing on private waters owned by Cabin Rentals Of Georgia',
  },
  {
    title: 'Blue Ridge, Georgia Activities',
    href: '/blue-ridge-georgia-activities',
    image: '/images/DSC_6283.jpg',
    alt: '',
    titleAttr: '',
  },
]

export default function SidebarContent() {
  return (
    <div className="py-5 px-5">
      {/* Favorites Block */}
      <div className="mb-6">
        <Link href="/compare">
          <Image
            src="/images/btn_view_favorites.png"
            alt="View and compare favorites"
            width={200}
            height={50}
            className="w-full h-auto max-w-[200px] mx-auto"
          />
        </Link>
      </div>

      {/* Testimonials Block */}
      <div className="mb-6">
        <h2 className="text-center pb-[25px] mb-[25px] bg-[url('/images/bg_block_header.png')] bg-[50%_100%] bg-no-repeat bg-bottom text-[#533e27] text-[170%] leading-[100%] font-normal italic">
          The Memories
        </h2>
        <div>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="mb-[25px]"
            >
              {/* Customer Image */}
              <div className="float-left my-0.5 mx-[15px] mb-2.5 ml-1.5 p-0.5 shadow-[0px_0px_8px_1px_#888]">
                <Image
                  src={testimonial.customerImage}
                  alt=""
                  width={48}
                  height={48}
                />
              </div>

              <div className="flex flex-col">
                {/* Cabin Name */}
                <div className="mb-1.5 leading-[120%] font-bold">
                  <Link
                    href={testimonial.cabinHref}
                    className="text-[#7c2c00] underline hover:text-[#b7714b] font-bold"
                  >
                    {testimonial.cabin}
                  </Link>
                </div>
                {/* Testimonial Body */}
                <div className="italic text-[#533e27]">
                  {testimonial.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Blocks */}
      <div>
        {callToActions.map((cta, index) => (
          <div
            key={index}
            className="m-0 pt-2.5 pb-0 px-0"
          >
            <h2 className="text-center pb-[25px] mt-[20px] mb-[10px] bg-[url('/images/bg_block_header.png')] bg-[50%_100%] bg-no-repeat bg-bottom text-[#533e27] text-[170%] leading-[100%] font-normal italic">
              <Link
                href={cta.href}
                className="text-[#533e27] no-underline"
              >
                {cta.title}
              </Link>
            </h2>
            <div className="mx-auto my-0">
              <Link href={cta.href}>
                <Image
                  src={cta.image}
                  alt={cta.alt}
                  title={cta.titleAttr}
                  width={255}
                  height={155}
                  className="w-full h-auto"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

