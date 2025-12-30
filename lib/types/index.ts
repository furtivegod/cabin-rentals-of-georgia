/**
 * Shared TypeScript types
 */

export interface Property {
  id: string
  name: string
  slug: string
  description: string
  ai_description?: string
  amenities: string[]
  location: {
    city: string
    state: string
    address?: string
  }
  bedrooms: number
  bathrooms: number
  max_guests: number
  status: string
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  property_id: string
  guest_id: string
  check_in: string
  check_out: string
  guests: number
  total_amount: number
  status: string
  created_at: string
}

export interface Quote {
  property_id: string
  check_in: string
  check_out: string
  guests: number
  nightly_rate: number
  total_nights: number
  subtotal: number
  fees: {
    cleaning?: number
    service?: number
    taxes?: number
  }
  total: number
}

