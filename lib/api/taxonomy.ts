/**
 * Taxonomy API functions
 */
import { apiClient } from './client'

export interface TaxonomyTerm {
  tid: number
  vid: number
  name: string
  description: string | null
  format: string | null
  weight: number
  page_title: string | null
}

/**
 * Get taxonomy term by category and slug
 * Mimics the Drupal routing logic
 */
export async function getTermByCategorySlug(
  category: string,
  slug: string
): Promise<TaxonomyTerm> {
  const response = await apiClient.get<TaxonomyTerm>(
    `/api/v1/taxonomy/term/by-category-slug`,
    {
      params: { category, slug },
    }
  )
  return response.data
}

export async function getTermBySlug(
  slug: string
): Promise<TaxonomyTerm> {
  const response = await apiClient.get<TaxonomyTerm>(
    `/api/v1/taxonomy/term/by-slug`,
    {
      params: { slug },
    }
  )
  return response.data
}