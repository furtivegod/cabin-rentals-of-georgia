/**
 * API functions for activities
 */
import { apiClient } from './client'

export interface Activity {
  id: string
  title: string
  slug: string
  activity_slug: string | null
  body: string | null
  body_summary: string | null
  body_format: string | null
  activity_type: string | null
  activity_type_tid: number | null
  area: string | null
  area_tid: number | null
  ages: string | null
  ages_tid: number | null
  people: string | null
  people_tid: number | null
  difficulty_level: string | null
  difficulty_level_tid: number | null
  season: string | null
  season_tid: number | null
  featured_image_fid: number | null
  featured_image_url: string | null
  featured_image_alt: string | null
  featured_image_title: string | null
  featured_image_width: number | null
  featured_image_height: number | null
  gallery_images: any[] | null
  latitude: number | null
  longitude: number | null
  author_name: string | null
  status: string
  is_featured: boolean
  is_sticky: boolean
  display_order: number
  drupal_nid: number | null
  drupal_vid: number | null
  created_at: string
  updated_at: string | null
  published_at: string | null
}

export interface ActivityListResponse {
  activities: Activity[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

export interface ActivityListParams {
  page?: number
  page_size?: number
  status?: string
  activity_type_tid?: number
}

/**
 * Fetch all activities with optional filters
 */
export async function getActivities(params?: ActivityListParams): Promise<ActivityListResponse> {
  const response = await apiClient.get<ActivityListResponse>('/api/v1/activities', {
    params,
  })
  return response.data
}

/**
 * Fetch a single activity by slug
 */
export async function getActivityBySlug(slug: string): Promise<Activity> {
  const response = await apiClient.get<Activity>(`/api/v1/activities/slug/${slug}`)
  return response.data
}

/**
 * Fetch a single activity by activity_slug (full URL path from Drupal)
 * 
 * Handles multi-segment URLs:
 * - 'hiking/bell-mountain' (from /activity/hiking/bell-mountain)
 * - 'fishing/blue-ridge/captn-joes-lake-adventures' (from /activity/fishing/blue-ridge/captn-joes-lake-adventures)
 * - 'fishing/lake-chatuge' (from /activity/fishing/lake-chatuge)
 * 
 * @param activity_slug - The full slug path (e.g., 'hiking/bell-mountain')
 * @returns Activity data
 */
export async function getActivityByActivitySlug(activity_slug: string): Promise<Activity> {
  // URL encode the slug to handle special characters and slashes in path parameters
  const encodedSlug = encodeURIComponent(activity_slug)
  
  const response = await apiClient.get<Activity>(`/api/v1/activities/activity-slug/${encodedSlug}`)
  return response.data
}

/**
 * Fetch a single activity by ID
 */
export async function getActivityById(id: string): Promise<Activity> {
  const response = await apiClient.get<Activity>(`/api/v1/activities/${id}`)
  return response.data
}

