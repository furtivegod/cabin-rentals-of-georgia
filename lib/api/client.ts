/**
 * API client for backend communication
 */
import axios, { AxiosInstance, AxiosError } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    })

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available (only in browser)
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token')
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Handle connection errors gracefully (e.g., during build or when backend is down)
        if (error.code === 'ECONNREFUSED' || error.code === 'EACCES' || error.code === 'ETIMEDOUT') {
          // Log warning but don't crash - let the calling code handle it
          if (typeof window === 'undefined') {
            // Server-side (during build/SSR)
            console.warn(`API connection error (${error.code}): Backend may not be running`)
          }
        }
        
        // Handle errors globally (only in browser)
        if (typeof window !== 'undefined') {
          if (error.response?.status === 401) {
            // Handle unauthorized
            localStorage.removeItem('token')
            window.location.href = '/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  get instance() {
    return this.client
  }
}

export const apiClient = new ApiClient().instance

