'use client'

import { useEffect, useState } from 'react'
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
      <div className="cal-key mb-4 flex flex-wrap gap-4 max-[767px]:justify-center">
        {/* Show legend in specific order matching the design */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border-2 bg-green-100 border-green-300" />
          <span className="text-[#533e27] text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border-2 bg-blue-100 border-blue-300" />
          <span className="text-[#533e27] text-sm">Check In</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border-2 bg-yellow-100 border-yellow-300" />
          <span className="text-[#533e27] text-sm">Check Out</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border-2 bg-orange-100 border-orange-300" />
          <span className="text-[#533e27] text-sm">Turn-Around Date (Reserved)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border-2 bg-pink-100 border-pink-300" />
          <span className="text-[#533e27] text-sm">Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border-2 bg-red-100 border-red-300" />
          <span className="text-[#533e27] text-sm">Fully booked</span>
        </div>
      </div>

      {/* Calendar Viewport with Slider */}
      <div className="cal-viewport w-full max-w-[600px] mx-auto relative overflow-hidden">
        {/* Calendar Month Container */}
        <div 
          className="cal-viewport-inner transition-transform duration-300 ease-in-out flex"
          style={{
            transform: `translateX(-${currentMonthIndex * 100}%)`,
            width: `${calendar.months.length * 100}%`,
          }}
        >
          {calendar.months.map((month, index) => (
            <div
              key={`${month.year}-${month.month}`}
              className="cal-month flex-shrink-0 w-full"
            >
              <CalendarMonthComponent
                month={month}
                showRates={showRates}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="cal-buttons flex justify-between mt-4 w-full max-w-[600px] mx-auto">
          <button
            type="button"
            onClick={handlePreviousMonth}
            disabled={currentMonthIndex === 0}
            className="cal-backward bg-[url('/images/bg_search_repeat.png')] bg-repeat-x border-none rounded-[15px] text-white text-xl px-4 py-1 italic font-['Fanwood_Text',serif] shadow-[0px_1px_3px_#999] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
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
            className="cal-forward bg-[url('/images/bg_search_repeat.png')] bg-repeat-x border-none rounded-[15px] text-white text-xl px-4 py-1 italic font-['Fanwood_Text',serif] shadow-[0px_1px_3px_#999] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
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
  showRates,
}: {
  month: CalendarMonth
  showRates: boolean
}) {
  const monthName = new Date(month.year, month.month - 1, 1).toLocaleString('default', { month: 'long', year: 'numeric' })
  const firstDay = new Date(month.year, month.month - 1, 1)
  const lastDay = new Date(month.year, month.month, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay() // 0 = Sunday, 1 = Monday, etc.

  // Create array of days
  const days: Array<{ date: number; dateStr: string; availability?: any; rate?: any }> = []
  
  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push({ date: 0, dateStr: '' })
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${month.year}-${String(month.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    days.push({
      date: day,
      dateStr,
      availability: month.availability[dateStr],
      rate: month.rates[dateStr],
    })
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="calendar-month">
      <h4 className="text-xl font-semibold text-[#533e27] mb-4 text-center">{monthName}</h4>
      <div className="calendar-grid overflow-hidden">
        <table className="w-full border-collapse" style={{ maxWidth: '600px' }}>
          <thead>
            <tr>
              {dayNames.map(day => (
                <th
                  key={day}
                  className="border border-[#7c2c00] p-2 text-center text-[#533e27] font-semibold bg-[#f5f5f5] text-sm"
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
                  if (!day || day.date === 0) {
                    return (
                      <td
                        key={dayIndex}
                        className="border border-[#7c2c00] p-2 bg-gray-100"
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
                  
                  // Get CSS class from availability state
                  // If no availability record exists, it means the date is available
                  const cssClass = availability?.state?.css_class || 'cal-available'
                  // Get background color and border based on CSS class
                  // Match exact colors from the legend image
                  let bgColor = 'bg-green-100' // Default: Available (light green)
                  let borderColor = 'border-green-300'
                  
                  if (isPast) {
                    bgColor = 'bg-gray-200'
                    borderColor = 'border-gray-400'
                  } else if (isToday) {
                    bgColor = 'bg-yellow-50'
                    borderColor = 'border-yellow-400'
                  } else {
                    // Match exact colors from legend
                    switch (cssClass) {
                      case 'cal-available':
                      case 'cal-av':
                        bgColor = 'bg-green-100'
                        borderColor = 'border-green-300'
                        break
                      case 'cal-in':
                        bgColor = 'bg-blue-100'
                        borderColor = 'border-blue-300'
                        break
                      case 'cal-out':
                        bgColor = 'bg-yellow-100'
                        borderColor = 'border-yellow-300'
                        break
                      case 'cal-inout':
                        bgColor = 'bg-orange-100'
                        borderColor = 'border-orange-300'
                        break
                      case 'cal-booked':
                        bgColor = 'bg-pink-100'
                        borderColor = 'border-pink-300'
                        break
                      case 'cal-na':
                        bgColor = 'bg-red-100'
                        borderColor = 'border-red-300'
                        break
                      default:
                        // Default to available (green)
                        bgColor = 'bg-green-100'
                        borderColor = 'border-green-300'
                    }
                  }

                  return (
                    <td
                      key={dayIndex}
                      className={`border-2 ${borderColor} ${bgColor} ${isPast ? 'opacity-60' : ''} ${isToday ? 'ring-2 ring-yellow-400' : ''} p-2 text-center relative max-[767px]:min-w-[44px] max-[767px]:h-[49px]`}
                      style={{
                        minWidth: '85px',
                        height: '85px',
                        verticalAlign: 'bottom',
                        position: 'relative',
                      }}
                    >
                      <div className="flex flex-col h-full justify-between items-center p-1">
                        <div className="text-sm font-semibold text-[#533e27] max-[767px]:text-xs">
                          {day.date}
                        </div>
                        {showRates && rate && (
                          <div className="text-xs font-bold text-[#533e27] mt-auto text-center max-[767px]:hidden">
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

