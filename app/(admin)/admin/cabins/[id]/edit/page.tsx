'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { updateCabin, getAdminCabinById, CabinUpdateData, Cabin } from '@/lib/api/cabins'
import {
  getBedroomOptions,
  getBathroomOptions,
  getPropertyTypeOptions,
  getAmenityOptions,
  TaxonomyTerm
} from '@/lib/api/taxonomy'
import ImageUploader from '@/components/admin/ImageUploader'
import GalleryImagesList from '@/components/admin/GalleryImagesList'
import { STATES_BY_COUNTRY } from '@/lib/consts/states'

// Lazy load the rich text editor to avoid SSR issues
const RichTextEditor = lazy(() => import('@/components/admin/RichTextEditor'))

// Tab definitions
const TABS = [
  { id: 'basic', label: 'Basic Info', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'details', label: 'Property Details', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'location', label: 'Location', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
  { id: 'features', label: 'Features & Amenities', icon: 'M5 13l4 4L19 7' },
  { id: 'media', label: 'Media', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
] as const

type TabId = typeof TABS[number]['id']

// Form field component
function FormField({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

// Input component
function Input({
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow ${className}`}
      {...props}
    />
  )
}

// Textarea component
function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  className = '',
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  className?: string
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow resize-none ${className}`}
    />
  )
}

// Select component
function Select({
  value,
  onChange,
  options,
  placeholder,
  required,
  ...props
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: Array<{ value: string; label: string }>
  placeholder?: string
  required?: boolean
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white cursor-pointer"
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

// Multi-select checkbox group
function CheckboxGroup({
  options,
  selected,
  onChange,
  columns = 2,
}: {
  options: Array<{ tid: number; name: string }>
  selected: Array<{ tid: number; name: string }>
  onChange: (selected: Array<{ tid: number; name: string }>) => void
  columns?: number
}) {
  const handleToggle = (option: { tid: number; name: string }) => {
    const isSelected = selected.some((s) => s.tid === option.tid)
    if (isSelected) {
      onChange(selected.filter((s) => s.tid !== option.tid))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {options.map((option) => {
        const isChecked = selected.some((s) => s.tid === option.tid)
        return (
          <label
            key={option.tid}
            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${isChecked
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleToggle(option)}
              className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
            />
            <span className="text-sm">{option.name}</span>
          </label>
        )
      })}
    </div>
  )
}

// Features list component with drag/drop and inline editing
function FeaturesList({
  features,
  onChange,
}: {
  features: string[]
  onChange: (features: string[]) => void
}) {
  const [newFeature, setNewFeature] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const addFeature = () => {
    if (newFeature.trim()) {
      onChange([...features, newFeature.trim()])
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    onChange(features.filter((_, i) => i !== index))
    if (editingIndex === index) {
      setEditingIndex(null)
    }
  }

  const startEditing = (index: number) => {
    setEditingIndex(index)
    setEditValue(features[index])
  }

  const saveEdit = (index: number) => {
    if (editValue.trim()) {
      const updated = [...features]
      updated[index] = editValue.trim()
      onChange(updated)
    }
    setEditingIndex(null)
    setEditValue('')
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditValue('')
  }


  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const updated = [...features]
    const draggedItem = updated[draggedIndex]
    updated.splice(draggedIndex, 1)
    updated.splice(index, 0, draggedItem)
    onChange(updated)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          placeholder="Add a feature (e.g., Mountain View, Game Room)"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addFeature()
            }
          }}
        />
        <button
          type="button"
          onClick={addFeature}
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium whitespace-nowrap"
        >
          Add
        </button>
      </div>
      {features.length > 0 && (
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-2 p-2.5 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-all group ${draggedIndex === index ? 'opacity-50' : ''
                }`}
            >
              {/* Drag Handle */}
              <button
                type="button"
                className="text-slate-400 hover:text-slate-600 cursor-move flex-shrink-0"
                title="Drag to reorder"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              </button>

              {/* Feature Content - Editable or Display */}
              {editingIndex === index ? (
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        saveEdit(index)
                      } else if (e.key === 'Escape') {
                        cancelEdit()
                      }
                    }}
                    onBlur={() => saveEdit(index)}
                    className="flex-1"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => saveEdit(index)}
                    className="text-emerald-600 hover:text-emerald-700 p-1"
                    title="Save"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="text-slate-400 hover:text-slate-600 p-1"
                    title="Cancel"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <div
                    onClick={() => startEditing(index)}
                    className="flex-1 px-3 py-1.5 text-slate-700 rounded cursor-text hover:bg-slate-50 transition-colors"
                    title="Click to edit"
                  >
                    {feature}
                  </div>
                  <button
                    type="button"
                    onClick={() => startEditing(index)}
                    className="text-slate-400 hover:text-slate-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-slate-400 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Dynamic list input for video URLs with editing and reordering
function VideoUrlsList({
  videoUrls,
  onChange,
}: {
  videoUrls: string[]
  onChange: (videoUrls: string[]) => void
}) {
  const [newVideoUrl, setNewVideoUrl] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const addVideoUrl = () => {
    if (newVideoUrl.trim()) {
      onChange([...videoUrls, newVideoUrl.trim()])
      setNewVideoUrl('')
    }
  }

  const removeVideoUrl = (index: number) => {
    onChange(videoUrls.filter((_, i) => i !== index))
    if (editingIndex === index) {
      setEditingIndex(null)
    }
  }

  const startEditing = (index: number) => {
    setEditingIndex(index)
    setEditValue(videoUrls[index])
  }

  const saveEdit = (index: number) => {
    if (editValue.trim()) {
      const updated = [...videoUrls]
      updated[index] = editValue.trim()
      onChange(updated)
    }
    setEditingIndex(null)
    setEditValue('')
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditValue('')
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const updated = [...videoUrls]
    const draggedItem = updated[draggedIndex]
    updated.splice(draggedIndex, 1)
    updated.splice(index, 0, draggedItem)
    onChange(updated)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={newVideoUrl}
          onChange={(e) => setNewVideoUrl(e.target.value)}
          placeholder="Add a video URL (e.g., https://www.youtube.com/watch?v=...)"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addVideoUrl()
            }
          }}
        />
        <button
          type="button"
          onClick={addVideoUrl}
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium whitespace-nowrap"
        >
          Add
        </button>
      </div>
      {videoUrls.length > 0 && (
        <div className="space-y-2">
          {videoUrls.map((videoUrl, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-2 p-2.5 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-all group ${draggedIndex === index ? 'opacity-50' : ''
                }`}
            >
              {/* Drag Handle */}
              <button
                type="button"
                className="text-slate-400 hover:text-slate-600 cursor-move flex-shrink-0"
                title="Drag to reorder"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              </button>

              {/* Video URL Content - Editable or Display */}
              {editingIndex === index ? (
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        saveEdit(index)
                      } else if (e.key === 'Escape') {
                        cancelEdit()
                      }
                    }}
                    onBlur={() => saveEdit(index)}
                    className="flex-1"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => saveEdit(index)}
                    className="text-emerald-600 hover:text-emerald-700 p-1"
                    title="Save"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="text-slate-400 hover:text-slate-600 p-1"
                    title="Cancel"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 flex items-center gap-2">
                    <div
                      onClick={() => startEditing(index)}
                      className={`flex-1 px-3 py-1.5 text-slate-700 rounded cursor-text hover:bg-slate-50 transition-colors truncate ${!isValidUrl(videoUrl) ? 'text-red-600' : ''
                        }`}
                      title={videoUrl}
                    >
                      {videoUrl}
                    </div>
                    {isValidUrl(videoUrl) && (
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Open in new tab"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => startEditing(index)}
                    className="text-slate-400 hover:text-slate-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeVideoUrl(index)}
                    className="text-slate-400 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Generate slug from city and title
function generateSlug(city: string, title: string): string {
  const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const citySlug = slugify(city)
  const titleSlug = slugify(title)

  if (citySlug && titleSlug) {
    return `${citySlug}/${titleSlug}`
  } else if (titleSlug) {
    return titleSlug
  } else {
    return ''
  }
}

export default function EditCabinPage() {
  const router = useRouter()
  const params = useParams()
  const cabinId = params?.id as string

  const [activeTab, setActiveTab] = useState<TabId>('basic')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Taxonomy options
  const [bedroomOptions, setBedroomOptions] = useState<TaxonomyTerm[]>([])
  const [bathroomOptions, setBathroomOptions] = useState<TaxonomyTerm[]>([])
  const [propertyTypeOptions, setPropertyTypeOptions] = useState<TaxonomyTerm[]>([])
  const [amenityOptions, setAmenityOptions] = useState<TaxonomyTerm[]>([])
  const [loadingOptions, setLoadingOptions] = useState(true)

  // Form state
  const [formData, setFormData] = useState({
    // Basic
    title: '',
    cabin_slug: '',
    tagline: '',
    body: '',
    // Details
    bedrooms: '',
    bathrooms: '',
    sleeps: '',
    // Location
    location: 'US',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip_code: '',
    latitude: '',
    longitude: '',
    // Features & Amenities
    property_type: [] as Array<{ tid: number; name: string }>,
    amenities: [] as Array<{ tid: number; name: string }>,
    features: [] as string[],
    // Media
    featured_image_url: '',
    featured_image_alt: '',
    featured_image_title: '',
    matterport_url: '',
    video_urls: [] as string[],
    gallery_images: [] as Array<{ url: string; alt?: string; title?: string }>,
    // Settings
    streamline_id: '',
    phone: '',
    rates_description: '',
    status: 'draft' as 'published' | 'draft' | 'archived',
  })

  // Auto-generate slug from city/title
  const [autoSlug, setAutoSlug] = useState(false)

  // Load cabin data and taxonomy options
  useEffect(() => {
    async function loadData() {
      if (!cabinId) return

      try {
        setIsLoading(true)
        setError(null)

        // Load cabin data and taxonomy options in parallel
        const [cabin, bedrooms, bathrooms, propertyTypes, amenities] = await Promise.all([
          getAdminCabinById(cabinId),
          getBedroomOptions(),
          getBathroomOptions(),
          getPropertyTypeOptions(),
          getAmenityOptions(),
        ])

        // Set taxonomy options
        setBedroomOptions(bedrooms)
        setBathroomOptions(bathrooms)
        setPropertyTypeOptions(propertyTypes)
        setAmenityOptions(amenities)

        // Transform cabin data to form data
        setFormData({
          title: cabin.title || '',
          cabin_slug: cabin.cabin_slug || '',
          tagline: cabin.tagline || '',
          body: cabin.body || '',
          bedrooms: cabin.bedrooms || '',
          bathrooms: cabin.bathrooms || '',
          sleeps: cabin.sleeps?.toString() || '',
          location: cabin.address?.country || cabin.location?.toString() || 'US',
          address1: cabin.address?.address1 || '',
          address2: cabin.address?.address2 || '',
          city: cabin.address?.city || '',
          state: cabin.address?.state || '',
          zip_code: cabin.address?.zip_code || '',
          latitude: cabin.latitude?.toString() || '',
          longitude: cabin.longitude?.toString() || '',
          property_type: Array.isArray(cabin.property_type) ? cabin.property_type : [],
          amenities: Array.isArray(cabin.amenities) ? cabin.amenities : [],
          features: Array.isArray(cabin.features) ? cabin.features : [],
          featured_image_url: cabin.featured_image_url || '',
          featured_image_alt: cabin.featured_image_alt || '',
          featured_image_title: cabin.featured_image_title || '',
          matterport_url: cabin.matterport_url || '',
          video_urls: Array.isArray(cabin.video) 
            ? cabin.video.map((v: any) => v.video_url || '').filter(Boolean)
            : [],
          gallery_images: Array.isArray(cabin.gallery_images) 
            ? cabin.gallery_images.map((img: any) => ({
                url: typeof img === 'string' ? img : img.url || '',
                alt: typeof img === 'object' ? img.alt || '' : '',
                title: typeof img === 'object' ? img.title || '' : '',
              }))
            : [],
          streamline_id: cabin.streamline_id?.toString() || '',
          phone: cabin.phone || '',
          rates_description: cabin.rates_description || '',
          status: (cabin.status as 'published' | 'draft' | 'archived') || 'draft',
        })

        // Don't auto-generate slug for existing cabins
        setAutoSlug(false)
      } catch (err: any) {
        setError(err.response?.data?.detail || err.message || 'Failed to load cabin data')
      } finally {
        setIsLoading(false)
        setLoadingOptions(false)
      }
    }

    loadData()
  }, [cabinId])

  // Auto-generate slug from city/title (only if autoSlug is enabled)
  useEffect(() => {
    if (autoSlug && (formData.city || formData.title)) {
      setFormData((prev) => ({ ...prev, cabin_slug: generateSlug(prev.city, prev.title) }))
    }
  }, [formData.city, formData.title, autoSlug])

  const updateField = <K extends keyof typeof formData>(field: K, value: typeof formData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required')
      setActiveTab('basic')
      return
    }

    if (!formData.bedrooms || !formData.bedrooms.trim()) {
      setError('Bedrooms is required')
      setActiveTab('details')
      return
    }

    if (!formData.bathrooms || !formData.bathrooms.trim()) {
      setError('Bathrooms is required')
      setActiveTab('details')
      return
    }

    if (!formData.property_type || formData.property_type.length === 0) {
      setError('Property type is required')
      setActiveTab('features')
      return
    }

    if (!formData.featured_image_url || !formData.featured_image_url.trim()) {
      setError('Main property image is required')
      setActiveTab('media')
      return
    }

    if (!formData.address1.trim()) {
      setError('Address Line 1 is required')
      setActiveTab('location')
      return
    }

    if (!formData.city.trim()) {
      setError('City is required')
      setActiveTab('location')
      return
    }

    if (!formData.state.trim()) {
      setError('State is required')
      setActiveTab('location')
      return
    }

    if (!formData.zip_code.trim()) {
      setError('ZIP Code is required')
      setActiveTab('location')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const cabinData: CabinUpdateData = {
        title: formData.title.trim(),
        cabin_slug: formData.cabin_slug.trim() || undefined,
        tagline: formData.tagline.trim() || undefined,
        body: formData.body.trim() || undefined,
        bedrooms: formData.bedrooms || undefined,
        bathrooms: formData.bathrooms || undefined,
        sleeps: formData.sleeps ? parseInt(formData.sleeps) : undefined,
        // Only send location if it's a number (taxonomy term ID), not a country code string
        location: formData.location && typeof formData.location === 'number' 
          ? formData.location 
          : formData.location && !isNaN(Number(formData.location)) && isFinite(Number(formData.location))
          ? Number(formData.location)
          : undefined,
        address: (formData.address1 || formData.city || formData.state || formData.zip_code || formData.location) ? {
          // Store country code in address.country if location is a string (country code)
          country: formData.location && typeof formData.location === 'string' ? formData.location : undefined,
          address1: formData.address1 || undefined,
          address2: formData.address2 || undefined,
          city: formData.city || undefined,
          state: formData.state || undefined,
          zip_code: formData.zip_code || undefined,
        } : undefined,
        latitude: formData.latitude ? parseFloat(formData.latitude) : undefined,
        longitude: formData.longitude ? parseFloat(formData.longitude) : undefined,
        property_type: formData.property_type.length > 0 ? formData.property_type : undefined,
        amenities: formData.amenities.length > 0 ? formData.amenities : undefined,
        features: formData.features.length > 0 ? formData.features : undefined,
        featured_image_url: formData.featured_image_url.trim() || undefined,
        featured_image_alt: formData.featured_image_alt.trim() || undefined,
        featured_image_title: formData.featured_image_title.trim() || undefined,
        matterport_url: formData.matterport_url.trim() || undefined,
        video: formData.video_urls.length > 0 ? formData.video_urls.map((url) => ({ video_url: url })) : undefined,
        gallery_images: formData.gallery_images.length > 0 ? formData.gallery_images : undefined,
        streamline_id: formData.streamline_id ? parseInt(formData.streamline_id) : undefined,
        phone: formData.phone.trim() || undefined,
        rates_description: formData.rates_description.trim() || undefined,
        status: formData.status,
      }

      const cabin = await updateCabin(cabinId, cabinData)
      setSuccessMessage(`Cabin "${cabin.title}" updated successfully!`)

      // Redirect after a short delay
      setTimeout(() => {
        router.push('/admin/cabins')
      }, 1500)
    } catch (err: any) {
      let errorMessage = 'Failed to update cabin'
      
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail
        
        // FastAPI validation errors return an array of error objects
        if (Array.isArray(detail)) {
          // Format validation errors into readable messages
          errorMessage = detail
            .map((error: any) => {
              const field = error.loc && error.loc.length > 1 ? error.loc[error.loc.length - 1] : 'field'
              return `${field}: ${error.msg}`
            })
            .join(', ')
        } else if (typeof detail === 'string') {
          errorMessage = detail
        } else if (detail.message) {
          errorMessage = detail.message
        }
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Tab content renderers (same as new page)
  const renderBasicTab = () => (
    <div className="space-y-6">
      <FormField label="Cabin Name" required>
        <Input
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="e.g., Mountain View Retreat"
          required
        />
      </FormField>

      <FormField label="Phone Number" hint="Phone number for this cabin">
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          placeholder="e.g., (706) 555-1234"
        />
      </FormField>

      <FormField label="Tagline" hint="A short catchy phrase for the cabin">
        <Input
          value={formData.tagline}
          onChange={(e) => updateField('tagline', e.target.value)}
          placeholder="e.g., Escape to serenity in the Blue Ridge Mountains"
        />
      </FormField>

      <FormField label="Description" hint="Use the rich text editor to format your description with headings, lists, links, and images.">
        <Suspense fallback={
          <div className="border border-slate-300 rounded-lg bg-slate-50 animate-pulse" style={{ minHeight: '300px' }}>
            <div className="h-10 bg-slate-200 rounded-t-lg" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
            </div>
          </div>
        }>
          <RichTextEditor
            value={formData.body}
            onChange={(value) => updateField('body', value)}
            placeholder="Describe the cabin, its features, the view, nearby attractions..."
            minHeight={300}
          />
        </Suspense>
      </FormField>
    </div>
  )

  const renderDetailsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField label="Bedrooms" required>
          <Select
            value={formData.bedrooms}
            onChange={(e) => updateField('bedrooms', e.target.value)}
            placeholder="Select bedrooms"
            options={bedroomOptions.map((b) => ({ value: b.name, label: b.name }))}
            required
          />
        </FormField>

        <FormField label="Bathrooms" required>
          <Select
            value={formData.bathrooms}
            onChange={(e) => updateField('bathrooms', e.target.value)}
            placeholder="Select bathrooms"
            options={bathroomOptions.map((b) => ({ value: b.name, label: b.name }))}
            required
          />
        </FormField>

        <FormField label="Sleeps" hint="Maximum number of guests">
          <Input
            type="number"
            value={formData.sleeps}
            onChange={(e) => updateField('sleeps', e.target.value)}
            placeholder="e.g., 8"
            min={1}
            max={50}
          />
        </FormField>
      </div>

      <FormField label="Rates Description" hint="Description of pricing/rates">
        <Textarea
          value={formData.rates_description}
          onChange={(e) => updateField('rates_description', e.target.value)}
          placeholder="e.g., Starting from $199/night. Seasonal rates may apply..."
          rows={3}
        />
      </FormField>
    </div>
  )

  const renderLocationTab = () => (
    <div className="space-y-6">
      <FormField label="Country">
        <Select
          value={formData.location || 'US'}
          onChange={(e) => {
            updateField('location', e.target.value)
            // Clear state when country changes
            if (formData.state && !STATES_BY_COUNTRY[e.target.value]?.some(s => s.value === formData.state)) {
              updateField('state', '')
            }
          }}
          options={[
            { value: 'US', label: 'United States' },
          ]}
        />
      </FormField>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Street Address</h3>
        <div className="space-y-4">
          <FormField label="Address Line 1" required>
            <Input
              value={formData.address1}
              onChange={(e) => updateField('address1', e.target.value)}
              placeholder="Street address"
              required
            />
          </FormField>

          <FormField label="Address Line 2">
            <Input
              value={formData.address2}
              onChange={(e) => updateField('address2', e.target.value)}
              placeholder="Apartment, suite, etc. (optional)"
            />
          </FormField>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <FormField label="City" required>
                <Input
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder="City"
                  required
                />
              </FormField>
            </div>

            <FormField label="State" required>
              <Select
                value={formData.state}
                onChange={(e) => updateField('state', e.target.value)}
                placeholder="Select state"
                options={formData.location ? (STATES_BY_COUNTRY[formData.location] || []) : []}
                required
              />
            </FormField>

            <FormField label="ZIP Code" required>
              <Input
                value={formData.zip_code}
                onChange={(e) => updateField('zip_code', e.target.value)}
                placeholder="30512"
                required
              />
            </FormField>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">GPS Coordinates</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Latitude" hint="e.g., 34.8691">
            <Input
              type="number"
              step="any"
              value={formData.latitude}
              onChange={(e) => updateField('latitude', e.target.value)}
              placeholder="34.8691"
            />
          </FormField>

          <FormField label="Longitude" hint="e.g., -84.3242">
            <Input
              type="number"
              step="any"
              value={formData.longitude}
              onChange={(e) => updateField('longitude', e.target.value)}
              placeholder="-84.3242"
            />
          </FormField>
        </div>
      </div>
    </div>
  )

  const renderFeaturesTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          Property Types <span className="text-red-500">*</span>
        </h3>
        <p className="text-sm text-slate-500 mb-4">Select all property categories that apply</p>
        {loadingOptions ? (
          <div className="text-slate-500">Loading options...</div>
        ) : (
          <CheckboxGroup
            options={propertyTypeOptions.map((p) => ({ tid: p.tid, name: p.name }))}
            selected={formData.property_type}
            onChange={(selected) => updateField('property_type', selected)}
            columns={3}
          />
        )}
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Amenities</h3>
        <p className="text-sm text-slate-500 mb-4">Select all amenities available at this cabin</p>
        {loadingOptions ? (
          <div className="text-slate-500">Loading options...</div>
        ) : (
          <CheckboxGroup
            options={amenityOptions.map((a) => ({ tid: a.tid, name: a.name }))}
            selected={formData.amenities}
            onChange={(selected) => updateField('amenities', selected)}
            columns={3}
          />
        )}
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Custom Features</h3>
        <p className="text-sm text-slate-500 mb-4">Add unique features that make this cabin special</p>
        <FeaturesList
          features={formData.features}
          onChange={(features) => updateField('features', features)}
        />
      </div>
    </div>
  )

  const renderMediaTab = () => (
    <div className="space-y-6">
      <div>
        <div className="space-y-4">
          <ImageUploader
            value={formData.featured_image_url}
            onChange={(url) => updateField('featured_image_url', url)}
            altValue={formData.featured_image_alt}
            onAltChange={(alt) => updateField('featured_image_alt', alt)}
            titleValue={formData.featured_image_title}
            onTitleChange={(title) => updateField('featured_image_title', title)}
            label="Main Property Image"
            hint="Upload an image or enter a URL. Images will be automatically resized: original (max 2400x1200px) and listing version (609x390px)."
            showPreview={true}
            createThumbnail={false}
            required
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Gallery Images</h3>
        <p className="text-sm text-slate-500 mb-4">Upload gallery images. Drag to reorder, click to edit.</p>
        <GalleryImagesList
          images={formData.gallery_images}
          onChange={(images) => updateField('gallery_images', images)}
        />
      </div>

      <div className="border-t border-slate-200 pt-6">
        <p className="text-sm text-slate-500 mb-4">Video URLs</p>
        <VideoUrlsList
          videoUrls={formData.video_urls}
          onChange={(videoUrls) => updateField('video_urls', videoUrls)}
        />
      </div>

      <div className="border-t border-slate-200 pt-6">
        <FormField label="Virtual Tour" hint="Paste the Matterport virtual tour URL">
          <Input
            value={formData.matterport_url}
            onChange={(e) => updateField('matterport_url', e.target.value)}
            placeholder="https://my.matterport.com/show/?m=..."
          />
        </FormField>
      </div>
    </div>
  )

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Publication Status</h3>
        <div className="flex gap-4">
          {(['draft', 'published', 'archived'] as const).map((status) => (
            <label
              key={status}
              className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.status === status
                  ? status === 'published'
                    ? 'border-emerald-500 bg-emerald-50'
                    : status === 'draft'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-500 bg-slate-50'
                  : 'border-slate-200 hover:border-slate-300'
                }`}
            >
              <input
                type="radio"
                name="status"
                value={status}
                checked={formData.status === status}
                onChange={(e) => updateField('status', e.target.value as typeof formData.status)}
                className="sr-only"
              />
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${status === 'published'
                    ? 'bg-emerald-500'
                    : status === 'draft'
                      ? 'bg-amber-500'
                      : 'bg-slate-400'
                    }`}
                />
                <div>
                  <div className="font-medium text-slate-900 capitalize">{status}</div>
                  <div className="text-xs text-slate-500">
                    {status === 'published'
                      ? 'Visible on the website'
                      : status === 'draft'
                        ? 'Only visible to admins'
                        : 'Hidden from all views'}
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">External IDs</h3>
        <div className="space-y-4">
          <FormField label="Streamline ID" hint="Streamline PMS property ID">
            <Input
              type="number"
              value={formData.streamline_id}
              onChange={(e) => updateField('streamline_id', e.target.value)}
              placeholder="e.g., 12345"
            />
          </FormField>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">URL Slug</h3>
        <FormField
          label="URL Slug"
          hint={autoSlug ? 'Auto-generated from city/title. Click the lock to edit manually.' : 'Enter a custom URL slug.'}
        >
          <div className="flex gap-2">
            <Input
              value={formData.cabin_slug}
              onChange={(e) => updateField('cabin_slug', e.target.value)}
              placeholder="blue-ridge/mountain-view-retreat"
              disabled={autoSlug}
              className={autoSlug ? 'bg-slate-50' : ''}
            />
            <button
              type="button"
              onClick={() => setAutoSlug(!autoSlug)}
              className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              title={autoSlug ? 'Click to edit manually' : 'Click to auto-generate'}
            >
              {autoSlug ? (
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        </FormField>
      </div>

    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            <p className="mt-4 text-slate-600">Loading cabin data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Edit Cabin</h1>
            <p className="text-slate-600 mt-1">Update cabin information and settings</p>
          </div>
          <Link
            href="/admin/cabins"
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
          >
            Cancel
          </Link>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-emerald-800">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-800">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-slate-200 bg-slate-50">
              <div className="flex overflow-x-auto">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-amber-600 border-b-2 border-amber-600 bg-white'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                    </svg>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'basic' && renderBasicTab()}
              {activeTab === 'details' && renderDetailsTab()}
              {activeTab === 'location' && renderLocationTab()}
              {activeTab === 'features' && renderFeaturesTab()}
              {activeTab === 'media' && renderMediaTab()}
              {activeTab === 'settings' && renderSettingsTab()}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex items-center justify-between">
              <Link
                href="/admin/cabins"
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
              >
                Cancel
              </Link>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

