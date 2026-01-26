'use client'

import { useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface ProcessedHTMLProps {
  html: string
  className?: string
}

/**
 * Component that processes HTML content and converts internal links
 * to use Next.js client-side navigation (SPA behavior)
 */
export default function ProcessedHTML({ html, className = '' }: ProcessedHTMLProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!containerRef.current) return

    // Find all anchor tags in the container
    const anchors = containerRef.current.querySelectorAll('a[href]')

    const clickHandlers: Array<{ element: Element; handler: (e: Event) => void }> = []

    anchors.forEach((anchor) => {
      const href = anchor.getAttribute('href')
      if (!href) return

      // Check if it's an internal link (same domain or relative path)
      const isInternalLink =
        href.startsWith('/') ||
        href.startsWith('#') ||
        href.includes('cabin-rentals-of-georgia.com') ||
        (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:'))

      if (isInternalLink) {
        // Convert to relative path if it's a full URL
        let relativePath = href
        if (href.includes('cabin-rentals-of-georgia.com')) {
          // Extract path from full URL
          try {
            const url = new URL(href.startsWith('http') ? href : `https://${href}`)
            relativePath = url.pathname + url.search + url.hash
          } catch {
            // If URL parsing fails, try to extract path manually
            const match = href.match(/cabin-rentals-of-georgia\.com([^\s]*)/)
            if (match) {
              relativePath = match[1] || '/'
            }
          }
        }

        // Skip hash-only links (anchor links)
        if (relativePath.startsWith('#')) {
          return
        }

        // Create click handler for client-side navigation
        const handler = (e: Event) => {
          e.preventDefault()
          e.stopPropagation()
          
          // Use Next.js router for client-side navigation
          router.push(relativePath)
        }

        anchor.addEventListener('click', handler)
        clickHandlers.push({ element: anchor, handler })

        // Add cursor pointer style and indicate it's clickable
        ;(anchor as HTMLElement).style.cursor = 'pointer'
      }
    })

    // Cleanup function to remove event listeners
    return () => {
      clickHandlers.forEach(({ element, handler }) => {
        element.removeEventListener('click', handler)
      })
    }
  }, [html, router, pathname])

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

