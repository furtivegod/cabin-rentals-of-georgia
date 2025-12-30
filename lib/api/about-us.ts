/**
 * About Us API functions
 */
import { apiClient } from './client'

export interface AboutUs {
  id: string
  title: string
  slug: string
  body: string | null
  body_summary: string | null
  body_format: string
  section: string | null
  author_name: string | null
  status: string
  is_featured: boolean
  display_order: number
  created_at: string
  updated_at: string | null
  published_at: string | null
  meta_title: string | null
  meta_description: string | null
}

/**
 * Fetch the About Us page
 */
export async function getAboutUs(): Promise<AboutUs> {
  const response = await apiClient.get<AboutUs>('/api/v1/about-us')
  return response.data
}

/**
 * Fetch a single about us page by ID
 */
export async function getAboutUsById(id: string): Promise<AboutUs> {
  const response = await apiClient.get<AboutUs>(`/api/v1/about-us/${id}`)
  return response.data
}

/**
 * Fetch a single about us page by slug
 */
export async function getAboutUsBySlug(slug: string): Promise<AboutUs> {
  const response = await apiClient.get<AboutUs>(`/api/v1/about-us/slug/${slug}`)
  return response.data
}

