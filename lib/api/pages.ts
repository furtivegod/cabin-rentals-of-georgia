/**
 * Pages API functions - for fetching content from field_data_body
 */
import { apiClient } from './client'

export interface PageContent {
  entity_type: string
  bundle: string
  entity_id: number
  revision_id: number | null
  language: string
  delta: number
  title: string | null
  slug: string | null
  body_value: string | null
  body_summary: string | null
  body_format: string | null
}

/**
 * Get page content by slug
 */
export async function getPageBySlug(slug: string): Promise<PageContent> {
  const response = await apiClient.get<PageContent>(`/api/v1/pages/slug/${slug}`)
  return response.data
}

/**
 * Get page content by title
 */
export async function getPageByTitle(title: string): Promise<PageContent> {
  const response = await apiClient.get<PageContent>(`/api/v1/pages/title/${title}`)
  return response.data
}

