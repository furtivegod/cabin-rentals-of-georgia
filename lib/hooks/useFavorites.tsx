'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Property } from '@/lib/types'

interface FavoritesContextType {
  favorites: Property[]
  addFavorite: (property: Property) => void
  removeFavorite: (propertyId: string) => void
  toggleFavorite: (property: Property) => void
  isFavorite: (propertyId: string) => boolean
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

const STORAGE_KEY = 'cabin_favorites'

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Property[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse favorites from localStorage:', e)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    }
  }, [favorites, isHydrated])

  const addFavorite = (property: Property) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.id === property.id)) {
        return prev
      }
      return [...prev, property]
    })
  }

  const removeFavorite = (propertyId: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== propertyId))
  }

  const toggleFavorite = (property: Property) => {
    if (isFavorite(property.id)) {
      removeFavorite(property.id)
    } else {
      addFavorite(property)
    }
  }

  const isFavorite = (propertyId: string) => {
    return favorites.some((p) => p.id === propertyId)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

