/**
 * Calendar API functions
 */
import { apiClient } from './client'

export interface CalendarState {
  sid: number
  css_class: string
  label?: string
  weight: number
  is_available: boolean
}

export interface CalendarAvailability {
  cid: number
  date: string
  sid: number
  state?: CalendarState
}

export interface DailyRate {
  id: string
  cabin_id?: string
  streamline_id: number
  date: string
  daily_rate: number
  created_at: string
  updated_at?: string
}

export interface CalendarMonth {
  year: number
  month: number
  availability: Record<string, CalendarAvailability>
  rates: Record<string, DailyRate>
  states: CalendarState[]
}

export interface CabinCalendar {
  cabin_id: string
  calendar_id: number
  streamline_id?: number
  months: CalendarMonth[]
}

/**
 * Get all calendar states
 */
export async function getCalendarStates(): Promise<CalendarState[]> {
  const response = await apiClient.get<CalendarState[]>('/api/v1/calendar/states')
  return response.data
}

/**
 * Get calendar data for a cabin by ID
 * 
 * @param cabinId - The cabin UUID
 * @param months - Number of months to return (default: 3)
 * @param startDate - Start date in YYYY-MM-DD format (default: today)
 * @param includeRates - Whether to include daily rates (default: true)
 */
export async function getCabinCalendar(
  cabinId: string,
  months: number = 3,
  startDate?: string,
  includeRates: boolean = true
): Promise<CabinCalendar> {
  const params = new URLSearchParams({
    months: months.toString(),
    include_rates: includeRates.toString(),
  })
  
  if (startDate) {
    params.append('start_date', startDate)
  }
  
  const response = await apiClient.get<CabinCalendar>(
    `/api/v1/calendar/cabin/${cabinId}?${params.toString()}`
  )
  return response.data
}

/**
 * Get calendar data for a cabin by slug
 * 
 * @param slug - The cabin slug
 * @param months - Number of months to return (default: 3)
 * @param startDate - Start date in YYYY-MM-DD format (default: today)
 * @param includeRates - Whether to include daily rates (default: true)
 */
export async function getCabinCalendarBySlug(
  slug: string,
  months: number = 3,
  startDate?: string,
  includeRates: boolean = true
): Promise<CabinCalendar> {
  const params = new URLSearchParams({
    months: months.toString(),
    include_rates: includeRates.toString(),
  })
  
  if (startDate) {
    params.append('start_date', startDate)
  }
  
  const encodedSlug = encodeURIComponent(slug)
  const response = await apiClient.get<CabinCalendar>(
    `/api/v1/calendar/cabin-slug/${encodedSlug}?${params.toString()}`
  )
  return response.data
}

