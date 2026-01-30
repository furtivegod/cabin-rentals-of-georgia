/**
 * Shared TypeScript types
 */

export interface Property {
  id: string
  title: string
  cabin_slug: string | null
  body: string | null
  bedrooms: string | null
  bathrooms: string | null
  sleeps: number | null
  property_type: Array<{ tid: number; name: string }> | null
  amenities: Array<{ tid: number; name: string }> | null
  features: string[] | null
  featured_image_url: string | null
  featured_image_alt: string | null
  featured_image_title: string | null
  gallery_images: any[] | null
  latitude: number | null
  longitude: number | null
  streamline_id: number | null
  phone: string | null
  keys_for_rent_id: number | null
  flipkey_id: number | null
  matterport_url: string | null
  tagline: string | null
  location: number | null
  rates_description: string | null
  analytics_code: string | null
  video: Array<{ [key: string]: any }> | null
  address: {
    country?: string
    address1?: string
    address2?: string
    city?: string
    state?: string
    zip_code?: string
  } | null
  author_name: string | null
  status: string
  created_at: string
  updated_at: string | null
  published_at: string | null
  today_rate: number | null
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
