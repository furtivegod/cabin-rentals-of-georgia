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

export interface TaxonomyTermListResponse {
  terms: TaxonomyTerm[]
  count: number
}

// Vocabulary IDs
export const VOCABULARY_IDS = {
  BEDROOMS: 2,
  PROPERTY_TYPE: 3,
  AMENITIES: 4,
  BATHROOMS: 5,
  LOCATIONS: 6,
} as const

/**
 * Get all taxonomy terms for a vocabulary by ID
 * 
 * @param vid - Vocabulary ID (2=Bedrooms, 3=Property Type, 4=Amenities, 5=Bathrooms, 6=Locations)
 */
export async function getTermsByVocabulary(vid: number): Promise<TaxonomyTerm[]> {
  const response = await apiClient.get<TaxonomyTermListResponse>(
    `/api/v1/taxonomy/terms/${vid}`
  )
  return response.data.terms
}

/**
 * Get bedroom options
 */
export async function getBedroomOptions(): Promise<TaxonomyTerm[]> {
  return getTermsByVocabulary(VOCABULARY_IDS.BEDROOMS)
}

/**
 * Get property type options
 */
export async function getPropertyTypeOptions(): Promise<TaxonomyTerm[]> {
  return getTermsByVocabulary(VOCABULARY_IDS.PROPERTY_TYPE)
}

/**
 * Get amenity options
 */
export async function getAmenityOptions(): Promise<TaxonomyTerm[]> {
  return getTermsByVocabulary(VOCABULARY_IDS.AMENITIES)
}

/**
 * Get bathroom options
 */
export async function getBathroomOptions(): Promise<TaxonomyTerm[]> {
  return getTermsByVocabulary(VOCABULARY_IDS.BATHROOMS)
}

/**
 * Get location options
 */
export async function getLocationOptions(): Promise<TaxonomyTerm[]> {
  return getTermsByVocabulary(VOCABULARY_IDS.LOCATIONS)
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
  slug: string,
  vid?: number
): Promise<TaxonomyTerm> {
  const response = await apiClient.get<TaxonomyTerm>(
    `/api/v1/taxonomy/term/by-slug`,
    {
      params: { slug, ...(vid && { vid }) },
    }
  )
  return response.data
}