/**
 * Policy API functions
 */
import { apiClient } from './client'

export interface Policy {
  id: string
  title: string
  slug: string
  body: string | null
  body_summary: string | null
  body_format: string
  policy_type: string | null
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
 * Fetch the Rental Policies page
 */
export async function getRentalPolicies(): Promise<Policy> {
  const response = await apiClient.get<Policy>('/api/v1/policies')
  return response.data
}

/**
 * Fetch a single policy by ID
 */
export async function getPolicyById(id: string): Promise<Policy> {
  const response = await apiClient.get<Policy>(`/api/v1/policies/${id}`)
  return response.data
}

/**
 * Fetch a single policy by slug
 */
export async function getPolicyBySlug(slug: string): Promise<Policy> {
  const response = await apiClient.get<Policy>(`/api/v1/policies/slug/${slug}`)
  return response.data
}

