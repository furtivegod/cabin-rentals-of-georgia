/**
 * Shared TypeScript types
 */

export interface Property {
  id: string
  title: string
  slug: string
  cabin_slug: string | null
  body: string | null
  body_summary: string | null
  body_format: string
  bedrooms: string | null
  bedrooms_tid: number | null
  bathrooms: string | null
  bathrooms_tid: number | null
  sleeps: number | null
  property_type: any[] | null
  amenities: any[] | null
  features: string[] | null
  featured_image_fid: number | null
  featured_image_url: string | null
  featured_image_alt: string | null
  featured_image_title: string | null
  featured_image_width: number | null
  featured_image_height: number | null
  gallery_images: any[] | null
  latitude: number | null
  longitude: number | null
  streamline_id: number | null
  minimum_rate: number | null
  city: string | null
  state: string | null
  address: string | null
  zip_code: string | null
  author_name: string | null
  status: string
  is_featured: boolean
  is_sticky: boolean
  display_order: number
  meta_title: string | null
  meta_description: string | null
  drupal_nid: number | null
  drupal_vid: number | null
  created_at: string
  updated_at: string | null
  published_at: string | null
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

