/**
 * Blog API functions
 */
import { apiClient } from './client'

export interface Blog {
  id: string
  title: string
  slug: string
  body: string
  body_summary: string | null
  status: string
  is_promoted: boolean
  is_sticky: boolean
  created_at: string
  updated_at: string | null
  published_at: string | null
  meta_title: string | null
  meta_description: string | null
  featured_image_url: string | null
}

export interface BlogListResponse {
  blogs: Blog[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

export interface BlogListParams {
  page?: number
  page_size?: number
  status?: string
  featured?: boolean
  search?: string
}

/**
 * Fetch all blogs with optional filters
 */
export async function getBlogs(params?: BlogListParams): Promise<BlogListResponse> {
  const response = await apiClient.get<BlogListResponse>('/api/v1/blogs', {
    params,
  })
  return response.data
}

/**
 * Fetch a single blog by ID
 */
export async function getBlogById(id: string): Promise<Blog> {
  const response = await apiClient.get<Blog>(`/api/v1/blogs/${id}`)
  return response.data
}

/**
 * Fetch a single blog by slug
 */
export async function getBlogBySlug(slug: string): Promise<Blog> {
  const response = await apiClient.get<Blog>(`/api/v1/blogs/slug/${slug}`)
  return response.data
}

/**
 * Fetch featured blogs
 */
export async function getFeaturedBlogs(limit: number = 5): Promise<Blog[]> {
  const response = await apiClient.get<Blog[]>('/api/v1/blogs/featured', {
    params: { limit },
  })
  return response.data
}

/**
 * Fetch recent blogs
 */
export async function getRecentBlogs(limit: number = 5): Promise<Blog[]> {
  const response = await apiClient.get<Blog[]>('/api/v1/blogs/recent', {
    params: { limit },
  })
  return response.data
}

