'use client'

import { useEffect, useState, useRef } from 'react'
import { getCabinCalendar, CabinCalendar, CalendarMonth } from '@/lib/api/calendar'

interface AvailabilityCalendarProps {
  cabinId: string
  months?: number
  showRates?: boolean
  className?: string
}

/**
 * Availability Calendar Component
 * Displays availability calendar with optional daily rates
 */
export default function AvailabilityCalendar({
  cabinId,
  months = 3,
  showRates = true,
  className = '',
}: AvailabilityCalendarProps) {
  const [calendar, setCalendar] = useState<CabinCalendar | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0)
  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchCalendar() {
      try {
        setLoading(true)
        setError(null)
        const data = await getCabinCalendar(cabinId, months, undefined, showRates)
        setCalendar(data)
        setCurrentMonthIndex(0) // Start with first month
      } catch (err: any) {
        setError(err.message || 'Failed to load calendar')
        console.error('Error fetching calendar:', err)
      } finally {
        setLoading(false)
      }
    }

    if (cabinId) {
      fetchCalendar()
    }
  }, [cabinId, months, showRates])

  const handlePreviousMonth = () => {
    setCurrentMonthIndex(prev => Math.max(0, prev - 1))
  }

  const handleNextMonth = () => {
    if (calendar) {
      setCurrentMonthIndex(prev => Math.min(calendar.months.length - 1, prev + 1))
    }
  }

  if (loading) {
    return (
      <div className={`availability-calendar ${className}`}>
        <div className="text-center py-8">
          <p className="text-[#533e27]">Loading calendar...</p>
        </div>
      </div>
    )
  }

  if (error) {
    // Don't show error for 404 - just hide the calendar section
    if (error.includes('404') || error.includes('not found')) {
      return null
    }
    return (
      <div className={`availability-calendar ${className}`}>
        <div className="text-center py-8">
          <p className="text-red-600">Error loading calendar: {error}</p>
        </div>
      </div>
    )
  }

  if (!calendar || !calendar.months.length) {
    return null
  }

  return (
    <div className={`availability-calendar ${className}`}>
      {/* Calendar Key/Legend */}
      <div className="cal-key mb-4 flex flex-wrap gap-4 justify-start">
        {/* Show legend in specific order matching the design */}
        <div className="flex items-center gap-2">
          <span className="text-[#533e27] text-sm pl-[25px] bg-[url('/images/calendar_images/cal_available3.png')] bg-no-repeat bg-[left_center] bg-contain">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#533e27] text-sm pl-[25px] bg-[url('/images/calendar_images/cal_in3.png')] bg-no-repeat bg-[left_center] bg-contain">Check In</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#533e27] text-sm pl-[25px] bg-[url('/images/calendar_images/cal_out3.png')] bg-no-repeat bg-[left_center] bg-contain">Check Out</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#533e27] text-sm pl-[25px] bg-[url('/images/calendar_images/cal_inout3.png')] bg-no-repeat bg-[left_center] bg-contain">Turn-Around Date</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#533e27] text-sm pl-[25px] bg-[url('/images/calendar_images/cal_booked3.png')] bg-no-repeat bg-[left_center] bg-contain">Reserved</span>
        </div>
      </div>

      {/* Calendar Viewport with Slider */}
      <div
        ref={viewportRef}
        className="cal-viewport w-full max-w-[600px] max-[1010px]:max-w-[440px] mx-auto relative"
        style={{ overflow: 'hidden', position: 'relative' }}
      >
        {/* Calendar Month Container - Image Slider Style */}
        <div
          className="cal-viewport-inner flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentMonthIndex * (100 / calendar.months.length)}%)`,
            width: `${calendar.months.length * 100}%`,
          }}
        >
          {calendar.months.map((month, index) => (
            <div
              key={`${month.year}-${month.month}`}
              className="cal-month flex-shrink-0"
              style={{
                width: `${100 / calendar.months.length}%`,
                flexShrink: 0,
              }}
            >
              <CalendarMonthComponent
                month={month}
                allMonths={calendar.months}
                showRates={showRates}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="cal-buttons flex justify-between mt-4 w-full max-w-[600px] mx-auto mb-[5px]">
          <button
            type="button"
            onClick={handlePreviousMonth}
            disabled={currentMonthIndex === 0}
            className="cal-backward bg-[url('/images/bg_search_repeat.png')] bg-repeat-x border-none rounded-[15px] text-white text-xl px-4 italic font-['Fanwood_Text',serif] shadow-[0px_1px_3px_#999] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            style={{
              textShadow: '0px 0px 3px #999',
            }}
          >
            Previous month
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            disabled={currentMonthIndex >= calendar.months.length - 1}
            className="cal-forward bg-[url('/images/bg_search_repeat.png')] bg-repeat-x border-none rounded-[15px] text-white text-xl px-4 italic font-['Fanwood_Text',serif] shadow-[0px_1px_3px_#999] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            style={{
              textShadow: '0px 0px 3px #999',
            }}
          >
            Next month
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Individual Calendar Month Component
 */
function CalendarMonthComponent({
  month,
  allMonths,
  showRates,
}: {
  month: CalendarMonth
  allMonths: CalendarMonth[]
  showRates: boolean
}) {
  const monthName = new Date(month.year, month.month - 1, 1).toLocaleString('default', { month: 'long', year: 'numeric' })
  const firstDay = new Date(month.year, month.month - 1, 1)
  const lastDay = new Date(month.year, month.month, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay() // 0 = Sunday, 1 = Monday, etc.

  // Calculate previous month's last days
  const prevMonth = month.month === 1 ? 12 : month.month - 1
  const prevYear = month.month === 1 ? month.year - 1 : month.year
  const prevMonthLastDay = new Date(prevYear, prevMonth, 0)
  const prevMonthDays = prevMonthLastDay.getDate()

  // Calculate next month info
  const nextMonth = month.month === 12 ? 1 : month.month + 1
  const nextYear = month.month === 12 ? month.year + 1 : month.year

  // Create array of days
  const days: Array<{ date: number; dateStr: string; availability?: any; rate?: any; isAdjacentMonth?: boolean }> = []

  // Helper function to find rate from any month
  const findRateForDate = (dateStr: string): any => {
    // First check current month
    if (month.rates[dateStr]) {
      return month.rates[dateStr]
    }
    // Then check all other months
    for (const m of allMonths) {
      if (m.rates[dateStr]) {
        return m.rates[dateStr]
      }
    }
    return null
  }

  // Helper function to find availability from any month
  const findAvailabilityForDate = (dateStr: string): any => {
    // First check current month
    if (month.availability[dateStr]) {
      return month.availability[dateStr]
    }
    // Then check all other months
    for (const m of allMonths) {
      if (m.availability[dateStr]) {
        return m.availability[dateStr]
      }
    }
    return null
  }

  // Add previous month's days for empty cells at the start
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevDate = prevMonthDays - i
    const dateStr = `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(prevDate).padStart(2, '0')}`
    days.push({
      date: prevDate,
      dateStr,
      availability: findAvailabilityForDate(dateStr),
      rate: findRateForDate(dateStr),
      isAdjacentMonth: true,
    })
  }

  // Add days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${month.year}-${String(month.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    days.push({
      date: day,
      dateStr,
      availability: month.availability[dateStr],
      rate: month.rates[dateStr],
      isAdjacentMonth: false,
    })
  }

  // Calculate how many cells are needed to complete the last row
  const totalCells = days.length
  const remainingCells = 7 - (totalCells % 7)
  if (remainingCells < 7) {
    // Add next month's days for empty cells at the end
    for (let day = 1; day <= remainingCells; day++) {
      const dateStr = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      days.push({
        date: day,
        dateStr,
        availability: findAvailabilityForDate(dateStr),
        rate: findRateForDate(dateStr),
        isAdjacentMonth: true,
      })
    }
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  return (
    <div className="calendar-month">
      <h4 className="text-xl ext-black mb-2 text-center mt-[5px]">{monthName}</h4>
      <div className="overflow-hidden border border-[1px] border-black">
        <table className="w-full border-collapse" style={{ maxWidth: '600px' }}>
          <thead>
            <tr>
              {dayNames.map(day => (
                <th
                  key={day}
                  className="p-2 text-center text-[#533e27] font-semibold bg-transparent text-sm"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
              <tr key={weekIndex}>
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const day = days[weekIndex * 7 + dayIndex]
                  if (!day) {
                    return (
                      <td
                        key={dayIndex}
                        className="border-none p-2 bg-gray-100"
                      />
                    )
                  }

                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  const dayDate = new Date(day.dateStr)
                  dayDate.setHours(0, 0, 0, 0)
                  const isToday = day.dateStr === today.toISOString().split('T')[0]
                  const isPast = dayDate < today
                  const availability = day.availability
                  const rate = day.rate
                  const isAdjacentMonth = day.isAdjacentMonth || false

                  // Get CSS class from availability state
                  // If no availability record exists, it means the date is available
                  const cssClass = availability?.state?.css_class || 'cal-available'

                  // Get background image based on CSS class - using _85px versions
                  // Always check availability state first, regardless of adjacent month or past date
                  let bgImage = '/images/calendar_images/cal_available_85px.png' // Default: Available

                  // Match background images from the highlighted _85px versions
                  // Check all possible CSS class values from the database
                  switch (cssClass) {
                    case 'cal-available':
                    case 'cal-av':
                      bgImage = '/images/calendar_images/cal_available_85px2.png'
                      break
                    case 'cal-in':
                      bgImage = '/images/calendar_images/cal_in_85px2.png'
                      break
                    case 'cal-out':
                      bgImage = '/images/calendar_images/cal_out_85px2.png'
                      break
                    case 'cal-inout':
                      bgImage = '/images/calendar_images/cal_inout_85px.png'
                      break
                    case 'cal-booked':
                    case 'cal-opt': // Provisionally booked
                      bgImage = '/images/calendar_images/cal_booked_85px.png'
                      break
                    case 'cal-na': // Fully booked
                    case 'cal-nc': // Not communicated
                      bgImage = '/images/calendar_images/cal_booked_85px.png'
                      break
                    default:
                      // Default to available
                      bgImage = '/images/calendar_images/cal_available_85px2.png'
                  }
                  // Set opacity based on date status (but keep the correct background image)
                  let cellOpacity = 1
                  if (isAdjacentMonth) {
                    cellOpacity = 0.5
                  } else if (isPast && !isAdjacentMonth) {
                    cellOpacity = 0.6
                  }

                  const borderColor = 'border-gray-300'
                  return (
                    <td
                      key={dayIndex}
                      className={`border-none ${isToday ? 'ring-2 ring-yellow-400' : ''} p-2 max-[1010px]:p-1 text-center relative min-w-[85px] h-[85px] max-[1010px]:min-w-[44px] max-[1010px]:h-[49px] align-bottom bg-cover bg-center bg-no-repeat`}
                      style={{
                        backgroundImage: isAdjacentMonth ? 'none' : `url(${bgImage})`,
                        backgroundColor: 'transparent',
                        opacity: cellOpacity,
                      }}
                    >
                      <div className="h-full flex flex-col align-between">
                        <p className='text-right text-black text-[14px] !font-bold font-[Arial,Helvetica,sans-serif] !m-0'>
                          {day.date}
                        </p>
                        {showRates && rate && (
                          <div className={`text-black mt-auto text-center font-[Arial,Helvetica,sans-serif] mb-[10px] max-[1010px]:mb-[2px]`}>
                            ${Math.round(rate.daily_rate)}
                          </div>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

