/**
 * Testimonial API functions
 */
import { apiClient } from './client'

export interface Testimonial {
  id: string
  title: string
  slug: string
  body: string | null
  body_summary: string | null
  body_format: string
  cabin_name: string | null
  cabin_drupal_nid: number | null
  cabin_slug: string | null
  customer_image_url: string | null
  customer_image_alt: string | null
  customer_image_title: string | null
  customer_image_width: number | null
  customer_image_height: number | null
  author_name: string | null
  status: string
  is_featured: boolean
  is_sticky: boolean
  created_at: string
  updated_at: string | null
  published_at: string | null
}

export interface TestimonialListResponse {
  testimonials: Testimonial[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

export interface TestimonialListParams {
  page?: number
  page_size?: number
  status?: string
  featured?: boolean
  cabin_name?: string
  search?: string
}

/**
 * Fetch all testimonials with optional filters
 */
export async function getTestimonials(params?: TestimonialListParams): Promise<TestimonialListResponse> {
  const response = await apiClient.get<TestimonialListResponse>('/api/v1/testimonials', {
    params,
  })
  return response.data
}

/**
 * Fetch a single testimonial by ID
 */
export async function getTestimonialById(id: string): Promise<Testimonial> {
  const response = await apiClient.get<Testimonial>(`/api/v1/testimonials/${id}`)
  return response.data
}

/**
 * Fetch a single testimonial by slug
 */
export async function getTestimonialBySlug(slug: string): Promise<Testimonial> {
  const response = await apiClient.get<Testimonial>(`/api/v1/testimonials/slug/${slug}`)
  return response.data
}

/**
 * Fetch featured testimonials
 */
export async function getFeaturedTestimonials(limit: number = 5): Promise<Testimonial[]> {
  const response = await apiClient.get<Testimonial[]>('/api/v1/testimonials/featured', {
    params: { limit },
  })
  return response.data
}

/**
 * Fetch recent testimonials
 */
export async function getRecentTestimonials(limit: number = 5): Promise<Testimonial[]> {
  const response = await apiClient.get<Testimonial[]>('/api/v1/testimonials/recent', {
    params: { limit },
  })
  return response.data
}


