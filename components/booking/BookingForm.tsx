'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface BookingFormProps {
  cabinId: string
  maxOccupancy?: number
  petFriendly?: boolean
}

// Optional add-ons configuration
const OPTIONAL_ADDONS = [
  { id: 'early_1hr', label: '1 Hour Early Check-In Fee', price: 50.00 },
  { id: 'late_1hr', label: '1 Hour Late Check-Out Fee', price: 50.00 },
  { id: 'early_2hr', label: '2 Hour Early Check-In Fee', price: 100.00 },
  { id: 'late_2hr', label: '2 Hour Late Check-Out Fee', price: 100.00 },
  { id: 'firewood_half', label: 'Firewood 1/2 Face Cord', price: 165.00 },
  { id: 'firewood_quarter', label: 'Firewood 1/4 Face Cord', price: 135.00 },
]

// Calendar Icon SVG Component
const CalendarIcon = ({ onClick }: { onClick?: () => void }) => (
  <svg 
    onClick={onClick}
    className="cursor-pointer" 
    width="28" 
    height="28" 
    viewBox="0 0 24 24" 
    fill="none"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" fill="#7cb342" stroke="#5a8c2a" strokeWidth="1"/>
    <rect x="3" y="4" width="18" height="5" fill="#7cb342"/>
    <line x1="7" y1="2" x2="7" y2="6" stroke="#5a8c2a" strokeWidth="2" strokeLinecap="round"/>
    <line x1="17" y1="2" x2="17" y2="6" stroke="#5a8c2a" strokeWidth="2" strokeLinecap="round"/>
    <rect x="6" y="11" width="3" height="3" fill="white"/>
    <rect x="10.5" y="11" width="3" height="3" fill="white"/>
    <rect x="15" y="11" width="3" height="3" fill="white"/>
    <rect x="6" y="15.5" width="3" height="3" fill="white"/>
    <rect x="10.5" y="15.5" width="3" height="3" fill="white"/>
    <rect x="15" y="15.5" width="3" height="3" fill="white"/>
  </svg>
)

export default function BookingForm({ 
  cabinId, 
  maxOccupancy = 16,
  petFriendly = true 
}: BookingFormProps) {
  // Refs for date inputs
  const arrivalInputRef = useRef<HTMLInputElement>(null)
  const departureInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [arrivalDate, setArrivalDate] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [pets, setPets] = useState(0)
  const [couponCode, setCouponCode] = useState('')
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  // Toggle addon selection
  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    )
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement quote calculation
    console.log('Form submitted:', {
      cabinId,
      arrivalDate,
      departureDate,
      adults,
      children,
      pets,
      couponCode,
      selectedAddons,
    })
  }

  // Generate options for adults (1-16)
  const adultOptions = Array.from({ length: maxOccupancy }, (_, i) => i + 1)
  // Generate options for children (0-10)
  const childrenOptions = Array.from({ length: 11 }, (_, i) => i)
  // Generate options for pets (0-3)
  const petOptions = Array.from({ length: 4 }, (_, i) => i)

  return (
    <div className="booking-form">
      <h2 className="text-[150%] text-[#7c2c00] italic mb-4">
        Details of your Getaway
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Arrival Date */}
        <div className="mb-3">
          <label className="block text-[#533e27] italic mb-1">
            Arrival<span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              ref={arrivalInputRef}
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              required
              className="w-[180px] h-[32px] px-3 rounded-full bg-[#5a4a3a] text-white border-none outline-none text-sm [color-scheme:dark]"
            />
            <CalendarIcon onClick={() => arrivalInputRef.current?.showPicker?.()} />
          </div>
        </div>

        {/* Departure Date */}
        <div className="mb-3">
          <label className="block text-[#533e27] italic mb-1">
            Departure<span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              ref={departureInputRef}
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              min={arrivalDate}
              required
              className="w-[180px] h-[32px] px-3 rounded-full bg-[#5a4a3a] text-white border-none outline-none text-sm [color-scheme:dark]"
            />
            <CalendarIcon onClick={() => departureInputRef.current?.showPicker?.()} />
          </div>
        </div>

        {/* Adults & Children */}
        <div className="flex gap-4 mb-3">
          <div>
            <label className="block text-[#533e27] italic mb-1">
              Adults<span className="text-red-600">*</span>
            </label>
            <div className="relative inline-block">
              <select
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value))}
                className="w-[70px] h-[32px] px-2 pr-8 rounded-full bg-[#5a4a3a] text-white border-none outline-none text-sm appearance-none cursor-pointer"
              >
                {adultOptions.map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#7cb342]">
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#533e27] italic mb-1">
              Children
            </label>
            <div className="relative inline-block">
              <select
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value))}
                className="w-[70px] h-[32px] px-2 pr-8 rounded-full bg-[#5a4a3a] text-white border-none outline-none text-sm appearance-none cursor-pointer"
              >
                {childrenOptions.map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#7cb342]">
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Pets */}
        {petFriendly && (
          <div className="mb-3">
            <label className="block text-[#533e27] italic mb-1">
              Pets
            </label>
            <div className="relative inline-block">
              <select
                value={pets}
                onChange={(e) => setPets(parseInt(e.target.value))}
                className="w-[70px] h-[32px] px-2 pr-8 rounded-full bg-[#5a4a3a] text-white border-none outline-none text-sm appearance-none cursor-pointer"
              >
                {petOptions.map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#7cb342]">
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Discount Coupon Code */}
        <div className="mb-5">
          <label className="block text-[#533e27] italic mb-1">
            Discount Coupon Code
          </label>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-[200px] h-[32px] px-3 rounded-full bg-[#5a4a3a] text-white border-none outline-none text-sm"
            placeholder=""
          />
        </div>

        {/* Optional Add-Ons */}
        <div className="mb-5">
          <h3 className="text-[#533e27] font-bold italic mb-3">
            OPTIONAL ADD-ONS<span className="text-red-600">*</span>
          </h3>
          <div className="space-y-2">
            {OPTIONAL_ADDONS.map(addon => (
              <label 
                key={addon.id}
                className="flex items-center gap-2 cursor-pointer text-[#533e27] italic"
              >
                <input
                  type="checkbox"
                  checked={selectedAddons.includes(addon.id)}
                  onChange={() => toggleAddon(addon.id)}
                  className="w-4 h-4 border-2 border-[#533e27] rounded-sm appearance-none cursor-pointer checked:bg-[#533e27] checked:border-[#533e27] relative
                    checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:absolute checked:after:top-[-1px] checked:after:left-[2px]"
                />
                <span>{addon.label} (${addon.price.toFixed(2)})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Travelex Insurance Logo */}
        <div className="mb-5">
          <Image
            src="/images/travelex_logo.png"
            alt="Travelex Insurance Services"
            width={150}
            height={40}
            className="object-contain"
            onError={(e) => {
              // Hide if image doesn't exist
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>

        {/* Instant Quote Button */}
        <button
          type="submit"
          className="bg-[url('/images/bg_search_repeat.png')]  bg-repeat-x border-none rounded-[15px] text-white text-xl px-4 italic font-['Fanwood_Text',serif] shadow-[0px_1px_3px_#999] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          style={{
            textShadow: '0px 0px 3px #999',
          }}
        >
          Instant Quote
        </button>

        {/* Travelex Insurance Description */}
        <div className="mt-5 text-[#533e27] italic text-sm leading-relaxed">
          <p>
            <span className="text-red-600">*</span> In today&apos;s changing travel environment, it&apos;s important 
            to protect your travel investment so you can relax and enjoy your trip. Unforeseen events such as flight 
            delays, baggage loss or even a sudden sickness or injury could impact your travel plans. For your 
            convenience, we offer Travelex Insurance Services{' '}
            <a 
              href="https://www.travelexinsurance.com/index.aspx?location=10-0454&go=background/background.asp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-[#7c2c00]"
            >
              Travel Basic
            </a>
            ,{' '}
            <a 
              href="https://www.travelexinsurance.com/index.aspx?location=10-0454&go=background/background.asp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-[#7c2c00]"
            >
              Travel Select
            </a>
            , and{' '}
            <a 
              href="https://www.travelexinsurance.com/index.aspx?location=10-0454&go=background/background.asp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-[#7c2c00]"
            >
              Travel Med
            </a>
            {' '}protection plans to help protect you and your travel investment against the unexpected.
          </p>
          <p className="mt-3">
            For more information on the available plans{' '}
            <a 
              href="https://www.travelexinsurance.com/index.aspx?location=10-0454&go=background/background.asp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-[#7c2c00]"
            >
              click here
            </a>
            {' '}or contact Travelex Insurance <span className="font-bold not-italic">800-228-9792</span> and 
            reference location number <span className="font-bold not-italic">10-0454</span>.
          </p>
        </div>
      </form>
    </div>
  )
}

