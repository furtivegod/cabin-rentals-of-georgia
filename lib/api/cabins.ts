/**
 * Cabin API functions
 */
import { Property } from '../types'
import { apiClient } from './client'

// Internal interface for backend response
interface PropertyListResponse {
  properties: Property[]
}

export interface Cabin {
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
  minimum_rate: number | null
  property_type: string | null
  property_type_tid: number | null
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

/**
 * Fetch a single cabin by slug (tries both slug and cabin_slug)
 * 
 * Handles both URL patterns:
 * - Single-segment: 'happy-ours-lodge' (from /cabin/happy-ours-lodge)
 * - Multi-segment: 'cherry-log/creekside-green' (from /cabin/cherry-log/creekside-green)
 * 
 * The slug parameter should be everything after '/cabin' in the URL.
 * 
 * @param slug - The slug path (e.g., 'happy-ours-lodge' or 'cherry-log/creekside-green')
 * @returns Cabin data
 */
export async function getCabinBySlug(slug: string): Promise<Cabin> {
  // URL encode the slug to handle special characters and slashes in path parameters
  // FastAPI will automatically decode it back on the backend
  const encodedSlug = encodeURIComponent(slug)
  
  // First try by cabin_slug (original Drupal URL alias)
  // This handles URLs like 'cherry-log/creekside-green' stored in cabin_slug field
  try {
    const response = await apiClient.get<Cabin>(`/api/v1/cabins/cabin-slug/${encodedSlug}`)
    return response.data
  } catch (error: any) {
    // If not found by cabin_slug, try by slug field
    // This handles URLs like 'happy-ours-lodge' stored in slug field
    // if (error?.response?.status === 404) {
    //   const response = await apiClient.get<Cabin>(`/api/v1/cabins/slug/${encodedSlug}`)
    //   return response.data
    // }
    throw error
  }
}

/**
 * Fetch a single cabin by ID
 */
export async function getCabinById(id: string): Promise<Cabin> {
  const response = await apiClient.get<Cabin>(`/api/v1/cabins/${id}`)
  return response.data
}



export interface PropertyListParams {
  category?: string
  amenity?: string
  bedrooms?: number
  search?: string
  status?: string
  tid?: number
}

export async function getAllCabins(): Promise<Property[]> {
  const response = await apiClient.get<PropertyListResponse>('/api/v1/cabins/getAllCabins')
  return response.data.properties
}