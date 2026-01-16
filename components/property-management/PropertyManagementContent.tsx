'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    text: "Gary Knight has a keen attention to detail in how he runs his business. CRG pays a great deal of attention to detail in screening renters, conducting pre and post rental property checks, and communication to owners when needed. We are confident that CRG is looking out for us as if they owned the property.",
    cabin: ""
  },
  {
    id: 2,
    text: "I just wanted to say \"thank you\" for supporting Jan and I during these past seven years. Sometimes when we think of the large investment we have in Blue Ridge (550 miles away from our home) it is very comforting to know we have a partnership with Cabin Rentals of Georgia and the you are taking care of our cabin.",
    cabin: ""
  },
  {
    id: 3,
    text: "Cabin Rentals of Georgia and Gary Knight provided the access to the rental market I wanted, with the least amount of wear on the property. We have been using Cabin Rentals of Georgia since 2017, and I have been very pleased with the attention to detail and the care of our property. The amount of revenue generated has been beyond my expectations.",
    cabin: ""
  },
  {
    id: 4,
    text: "For six years, my family rented multiple properties from Cabin Rentals of Georgia. They have paid attention to the smallest of details. We purchased a cabin in Blue Ridge and immediately turned the house over to the CRG management team. When we visit the house, it is in impeccable shape, proving the property receives round-the-clock attention. We strongly endorse CRG.",
    cabin: ""
  },
  {
    id: 5,
    text: "Your focus on quality of customer and attention to detail managing your housekeepers on the proper process to clean our home has resulted in our cabin looking as good as it did when we finished building it three years ago.",
    cabin: ""
  },
  {
    id: 6,
    text: "You continue to get top dollar which has resulted in a renter who is more established and family-oriented. History has proven this type of renter takes better care of our cabin than renter who only look at price.",
    cabin: ""
  },
  {
    id: 7,
    text: "After much research and due diligence, we chose Cabin Rentals of Georgia. Gary and Lissa Knight are very passionate about their business and the care they take of our property reflects this. Revenue has exceeded our expectations as CRG obviously has the right formula for success.",
    cabin: ""
  },
  {
    id: 8,
    text: "The team at CRG is professional and cheerful. Our house is cleaned so thoroughly reflecting the quality of the cleaning staff. They have found that fine balance between providing first class service to their customers while ensuring the interest of the homeowners are protected.",
    cabin: ""
  },
]

export default function PropertyManagementContent() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5">
      {/* Header Section - What is my revenue potential? */}
      <div className="prop-mgmt-header pm-first mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="left">
            <h3 className="text-3xl md:text-4xl font-bold text-[#7c2c00] mb-4">
              What is my <br />revenue potential?
            </h3>
            <div className="inline-block">
              <p className="text-xl md:text-2xl text-[#533e27] font-semibold">Call (706) 432-2140</p>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>

      {/* What You Get Section */}
      <div className="prop-mgmt-content pm-first mb-12">
        <div className="pm-content">
          <h4 className="text-2xl md:text-3xl font-bold text-[#7c2c00] mb-6">What You Get With Cabin Rentals of Georgia</h4>
          <div className="listings-overall-wrapper grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="listings-wrapper">
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-4">Free Onboarding</div>
              <ul className="list-disc list-inside space-y-2 text-[#533e27]">
                <li>Professional photography</li>
                <li>Custom copywriting</li>
                <li>Search engine optimization</li>
                <li>Design/amenity recommendations</li>
              </ul>
            </div>
            <div className="listings-wrapper">
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-4">Managing Details</div>
              <ul className="list-disc list-inside space-y-2 text-[#533e27]">
                <li>Unique pricing</li>
                <li>Taxes and licensing</li>
                <li>Professional cleaning</li>
                <li>Regular inspections</li>
              </ul>
            </div>
            <div className="listings-wrapper">
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-4">Guest Experience</div>
              <ul className="list-disc list-inside space-y-2 text-[#533e27]">
                <li>Enthusiastic agents</li>
                <li>VIP guest app</li>
                <li>24/7 guest services</li>
                <li>Smart-home technology</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="scroll-divider my-8 border-t border-gray-300"></div>
        <div className="rating-logos flex flex-wrap justify-center items-center gap-6 my-8">
          <Image src="/images/vrbo_premier_host.png" alt="VRBO Premier Host" width={150} height={75} className="object-contain" />
          <Image src="/images/google_5star.png" alt="Google 5 Stars" width={150} height={75} className="object-contain" />
          <Image src="/images/fannin_county.png" alt="Fannin County Chamber of Commerce" width={150} height={75} className="object-contain" />
        </div>
      </div>

      {/* Maximize Income Section */}
      <div className="prop-mgmt-content pm-second mb-12">
        <div className="pm-content">
          <h4 className="text-2xl md:text-3xl font-bold text-[#7c2c00] mb-6">Maximize Income with Peace of Mind</h4>
          <div className="listings-overall-wrapper grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="listings-wrapper">
              <div className="listings-icon mb-4">
                <Image src="/images/expert_revenue_management_brn.png" alt="" width={80} height={80} className="object-contain" />
              </div>
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-3">
                Expert Revenue <br />Management
              </div>
              <div className="listings-description text-[#533e27]">
                With over 20 years of hospitality experience in revenue management, we maximize the rental revenue of our homeowners year after year. We constantly analyze our rental rates to ensure that we are keeping up with supply and demand. In addition, our unique pricing models generate thousands more in rental income when compared to other pricing strategies.
              </div>
            </div>
            <div className="listings-wrapper">
              <div className="listings-icon mb-4">
                <Image src="/images/powerful_property_marketing_brn.png" alt="" width={80} height={80} className="object-contain" />
              </div>
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-3">
                Powerful Property <br />Marketing
              </div>
              <div className="listings-description text-[#533e27]">
                Your home's exposure across all major marketing channels will be enhanced by our marketing and sales strategy. Third-party booking sites, professional photography, and engaging copywriting all contribute to our cabins' competitive advantage in online searches, along with monthly email blasts, robust social media engagement, and PPC campaigns which increase bookings.
              </div>
            </div>
            <div className="listings-wrapper">
              <div className="listings-icon mb-4">
                <Image src="/images/direct_booking_brn.png" alt="" width={80} height={80} className="object-contain" />
              </div>
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-3">
                Direct Booking <br />Strength
              </div>
              <div className="listings-description text-[#533e27]">
                Enjoying a strong SEO presence on Google and other top engines, over 70% of our reservations are from direct bookings. We have a very large repeat-guest ratio due to excellent stays, email blasts, and Loyalty Reward Points.
              </div>
            </div>
            <div className="listings-wrapper">
              <div className="listings-icon mb-4">
                <Image src="/images/guest_screening_brn.png" alt="" width={80} height={80} className="object-contain" />
              </div>
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-3">
                Guest <br />Screening
              </div>
              <div className="listings-description text-[#533e27]">
                Our enhanced vetting services head off potential problems before they occur as well as realizing potential lost income. We keep an accurate guest count (as well as pet information) from the time of booking to the time of arrival and beyond. We continue this screening with a phone call on day of arrival as well as through our Guest Communications app.
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-divider my-8 border-t border-gray-300"></div>
      </div>

      {/* Schedule a Call Section */}
      <div className="prop-mgmt-header pm-third mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="left text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-[#7c2c00] mb-4">
              Schedule a call with Gary to find out more that we can do for you.
            </h3>
            <p className="text-center text-2xl md:text-3xl text-[#533e27] font-semibold">Call (706) 432-2140</p>
          </div>
          <div className="right"></div>
        </div>
      </div>

      {/* Top Notch Property Maintenance Section */}
      <div className="prop-mgmt-content pm-second pm-third mb-12">
        <div className="pm-content">
          <h4 className="text-2xl md:text-3xl font-bold text-[#7c2c00] mb-6">Top Notch Property Maintenance</h4>
          <div className="listings-overall-wrapper grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="listings-wrapper">
              <div className="listings-icon mb-4">
                <Image src="/images/professional_house_cleaningB2_brn.png" alt="" width={80} height={80} className="object-contain" />
              </div>
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-3">
                Professional House <br />Keeping
              </div>
              <div className="listings-description text-[#533e27]">
                We personally train our Housekeepers on staff to do a thorough and detailed cleaning of your cabin before each arrival. Within our vacation rental software, we implement our own custom check systems and detailed checklists. The system allows for scheduling and communication with our cleaning staff. This ensures they do an exceptional job, resulting in high reviews for our cleanliness.
              </div>
            </div>
            <div className="listings-wrapper">
              <div className="listings-icon mb-4">
                <Image src="/images/quality_inspection_brn.png" alt="" width={80} height={80} className="object-contain" />
              </div>
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-3">
                Quality <br />Inspections
              </div>
              <div className="listings-description text-[#533e27]">
                Our inspection process delivers a high standard of care. Your home is inspected after each departure to ensure everything is in order. We inspect it again after the Housekeeper cleans, and we inspect again upon guests' arrival to make sure everything is perfect for their arrival.
              </div>
            </div>
            <div className="listings-wrapper">
              <div className="listings-icon mb-4">
                <Image src="/images/maintenance_technician_brn.png" alt="" width={80} height={80} className="object-contain" />
              </div>
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-3">
                Maintenance <br />Technicians
              </div>
              <div className="listings-description text-[#533e27]">
                Within our vacation rental software we use an extensive checklist making sure our in-house maintenance team walks through your home periodically to ensure that everything is in working order.
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-divider my-8 border-t border-gray-300"></div>
      </div>

      {/* VIP Experience Section */}
      <div className="prop-mgmt-content pm-second pm-fourth mb-12">
        <div className="pm-content">
          <h4 className="text-2xl md:text-3xl font-bold text-[#7c2c00] mb-6">VIP Experience for Guests</h4>
          <div className="listings-overall-wrapper grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="listings-wrapper">
              <div className="listings-icon mb-4">
                <Image src="/images/vip_experience_app_brn.png" alt="" width={80} height={80} className="object-contain" />
              </div>
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-3">
                VIP Experience <br />App
              </div>
              <div className="listings-description text-[#533e27]">
                All guests are given a direct line of communication with our staff during their stay. Guests can check in and out, use our concierge services, access our destination guide, and even watch instructional videos on the operation of the home's TVs, gas fireplaces, and more.
              </div>
            </div>
            <div className="listings-wrapper">
              <div className="listings-icon mb-4">
                <Image src="/images/royal_treatment_brn.png" alt="" width={80} height={80} className="object-contain" />
              </div>
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-3">
                Exceeding <br />Expectations
              </div>
              <div className="listings-description text-[#533e27]">
                While providing excellent customer service through our VIP app along with an informative Destination Guide, we ensure that each guest's experience is elevated while staying in your home. They know to expect a flawlessly clean and well-maintained home along with luxury amenities. Our concierge services provide guests with day itineraries, fishing trips, grocery shopping and more.
              </div>
            </div>
            <div className="listings-wrapper">
              <div className="listings-icon mb-4">
                <Image src="/images/smart_home_tech_brn.png" alt="" width={80} height={80} className="object-contain" />
              </div>
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-3">
                Smart-Home <br />Technology
              </div>
              <div className="listings-description text-[#533e27]">
                Our homes are equipped with a directory system that serves as a direct line of communication between our guests and our staff. Our guests can access the directory and watch instructional videos on how to operate the home's gas fireplaces, TV remotes, and more. Most homes are equipped with keyless door locks and thermostat sensors.
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-divider my-8 border-t border-gray-300"></div>
      </div>

      {/* Testimonials Section */}
      <div className="prop-mgmt-header pm-third pm-fifth mb-12">
        <div className="pm-testimonials">
          <div className="testimony-slider desktop">
            <div className="testimony-slider-wrapper">
              <div className="testimony-slider-content">
                <div className="relative">
                  <div className="testimony-slide p-6 bg-white rounded-lg shadow-md">
                    <div className="testimony-wrapper">
                      <div className="testimony-content">
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td className="text-[#533e27] text-lg leading-relaxed">
                                {testimonials[currentTestimonial].text}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="testimony-cabin mt-4 text-[#7c2c00] font-semibold">
                        {testimonials[currentTestimonial].cabin}
                      </div>
                    </div>
                  </div>
                  <div className="testimony-nav flex justify-between items-center mt-4">
                    <button
                      onClick={prevTestimonial}
                      className="flex-prev p-2 text-[#7c2c00] hover:text-[#533e27] text-3xl font-bold transition-colors"
                      aria-label="Previous testimonial"
                    >
                      ←
                    </button>
                    <span className="text-[#533e27] text-sm">
                      {currentTestimonial + 1} of {testimonials.length}
                    </span>
                    <button
                      onClick={nextTestimonial}
                      className="flex-next p-2 text-[#7c2c00] hover:text-[#533e27] text-3xl font-bold transition-colors"
                      aria-label="Next testimonial"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Services Section */}
      <div className="prop-mgmt-content pm-second pm-fifth mb-12">
        <div className="pm-content">
          <h4 className="text-2xl md:text-3xl font-bold text-[#7c2c00] mb-6">Owner Services</h4>
          <div className="listings-overall-wrapper grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="listings-wrapper">
              <div className="listings-icon mb-4">
                <Image src="/images/tax_reporting_brn.png" alt="" width={80} height={80} className="object-contain" />
              </div>
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-3">
                Tax <br />Reporting
              </div>
              <div className="listings-description text-[#533e27]">
                We facilitate the process of collecting and paying local lodging and occupancy taxes for the city, county, and state. Our accounting team prepares all sales tax payments and reports for you every month.
              </div>
            </div>
            <div className="listings-wrapper">
              <div className="listings-icon mb-4">
                <Image src="/images/private_portal_access_brn.png" alt="" width={80} height={80} className="object-contain" />
              </div>
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-3">
                Private Client <br />Portal Access
              </div>
              <div className="listings-description text-[#533e27]">
                Enjoy transparent updates through your private portal access giving you a 360º view of your home's details.
              </div>
            </div>
            <div className="listings-wrapper">
              <div className="listings-icon mb-4">
                <Image src="/images/expert_revenue_management_brn.png" alt="" width={80} height={80} className="object-contain" />
              </div>
              <div className="listings-title text-xl font-semibold text-[#7c2c00] mb-3">
                Contracts and <br />Commission Rates
              </div>
              <div className="listings-description text-[#533e27]">
                Honest transparency is essential to a successful partnership, which is why we consider each contract and commission rates individually. It is not our policy to win your business with a low teaser rate and then try to recoup our expenses with hidden fees. Maintaining trust through communication is key.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

