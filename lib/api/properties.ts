/**
 * API functions for properties/cabins
 */
import { apiClient } from './client'
import { Property } from '../types'

export interface PropertyListParams {
  page?: number
  page_size?: number
  category?: string
  amenity?: string
  bedrooms?: number
  search?: string
  status?: string
}

export interface PropertyListResponse {
  properties: Property[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

/**
 * Fetch all properties with optional filters
 */
export async function getProperties(params?: PropertyListParams): Promise<PropertyListResponse> {
  const response = await apiClient.get<PropertyListResponse>('/api/v1/properties', {
    params,
  })
  return response.data
}

/**
 * Fetch a single property by ID
 */
export async function getPropertyById(id: string): Promise<Property> {
  const response = await apiClient.get<Property>(`/api/v1/properties/${id}`)
  return response.data
}

/**
 * Fetch a single property by slug
 */
export async function getPropertyBySlug(slug: string): Promise<Property> {
  const response = await apiClient.get<Property>(`/api/v1/properties/slug/${slug}`)
  return response.data
}

