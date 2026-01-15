/**
 * API functions for properties/cabins
 */
import { apiClient } from './client'
import { Property } from '../types'

export interface PropertyListParams {
  category?: string
  amenity?: string
  bedrooms?: number
  search?: string
  status?: string
  tid?: number
}

/**
 * Fetch all properties with optional filters
 * Returns all matching cabins (no pagination)
 */
export async function getProperties(params?: PropertyListParams): Promise<Property[]> {
  const response = await apiClient.get<PropertyListResponse>('/api/v1/cabins/get-cabins-by-term-id', {
    params,
  })
  return response.data.properties
}

// Internal interface for backend response
interface PropertyListResponse {
  properties: Property[]
}