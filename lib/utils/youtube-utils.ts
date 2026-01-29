/**
 * YouTube utility functions
 * Based on the Drupal video_embed_field module implementation
 */

/**
 * Extracts YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - Playlists and time markers
 */
export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null

  // Remove protocol
  let cleanUrl = url.replace(/^https?:\/\//i, '')

  // Handle playlist URLs
  if (cleanUrl.includes('playlist')) {
    cleanUrl = cleanUrl + '&'
    const pos = cleanUrl.lastIndexOf('?list=')
    if (pos !== -1) {
      const pos2 = cleanUrl.indexOf('&', pos)
      if (pos2 > pos) {
        // For playlists, we'll extract the first video ID if available
        // This is a simplified version - full implementation would handle playlists differently
        return null
      }
    }
    return null
  }

  // Handle view_play_list format
  if (cleanUrl.includes('view_play_list')) {
    cleanUrl = cleanUrl + '&'
    if (!cleanUrl.includes('?p=PL')) {
      const pPos = cleanUrl.indexOf('?p=')
      if (pPos !== -1) {
        cleanUrl = cleanUrl.slice(0, pPos + 3) + 'PL' + cleanUrl.slice(pPos + 3)
      }
    }
    cleanUrl = cleanUrl.replace(/play_list\?p=/i, 'videoseries?list=')
    const pos = cleanUrl.lastIndexOf('videoseries?list=')
    if (pos !== -1) {
      const pos2 = cleanUrl.indexOf('&', pos)
      if (pos2 > pos) {
        // Playlist handling
        return null
      }
    }
    return null
  }

  // Standard video URL formats
  // Try ?v= parameter first
  let pos = cleanUrl.lastIndexOf('v=')
  if (pos !== -1) {
    pos += 2
    const pos2 = Math.min(
      cleanUrl.indexOf('&', pos) !== -1 ? cleanUrl.indexOf('&', pos) : cleanUrl.length,
      cleanUrl.indexOf('#', pos) !== -1 ? cleanUrl.indexOf('#', pos) : cleanUrl.length
    )
    if (pos2 > pos) {
      return cleanUrl.substring(pos, pos2)
    }
  }

  // Try /embed/VIDEO_ID format
  pos = cleanUrl.indexOf('/embed/')
  if (pos !== -1) {
    pos += 7
    const pos2 = Math.min(
      cleanUrl.indexOf('?', pos) !== -1 ? cleanUrl.indexOf('?', pos) : cleanUrl.length,
      cleanUrl.indexOf('#', pos) !== -1 ? cleanUrl.indexOf('#', pos) : cleanUrl.length
    )
    if (pos2 > pos) {
      return cleanUrl.substring(pos, pos2)
    }
  }

  // Try youtu.be/VIDEO_ID format
  pos = cleanUrl.indexOf('youtu.be/')
  if (pos !== -1) {
    pos += 9
    const pos2 = Math.min(
      cleanUrl.indexOf('?', pos) !== -1 ? cleanUrl.indexOf('?', pos) : cleanUrl.length,
      cleanUrl.indexOf('#', pos) !== -1 ? cleanUrl.indexOf('#', pos) : cleanUrl.length,
      cleanUrl.indexOf('/', pos) !== -1 ? cleanUrl.indexOf('/', pos) : cleanUrl.length
    )
    if (pos2 > pos) {
      return cleanUrl.substring(pos, pos2)
    }
  }

  // Try last segment after / (for short URLs)
  pos = cleanUrl.lastIndexOf('/')
  if (pos !== -1 && pos < cleanUrl.length - 1) {
    pos++
    const pos2 = Math.min(
      cleanUrl.indexOf('?', pos) !== -1 ? cleanUrl.indexOf('?', pos) : cleanUrl.length,
      cleanUrl.indexOf('#', pos) !== -1 ? cleanUrl.indexOf('#', pos) : cleanUrl.length
    )
    if (pos2 > pos) {
      const id = cleanUrl.substring(pos, pos2)
      // Basic validation - YouTube IDs are typically 11 characters
      if (id.length >= 10 && id.length <= 12) {
        return id
      }
    }
  }

  return null
}

/**
 * Extracts time marker from YouTube URL (#t=2m5s or #t=125)
 */
export function getYouTubeTimeMarker(url: string): number | null {
  const timeMatch = url.match(/#t=((?<min>\d+)m)?((?<sec>\d+)s)?((?<tinsec>\d+))?/)
  if (!timeMatch) return null

  if (timeMatch.groups?.tinsec) {
    return parseInt(timeMatch.groups.tinsec, 10)
  }

  const minutes = parseInt(timeMatch.groups?.min || '0', 10)
  const seconds = parseInt(timeMatch.groups?.sec || '0', 10)
  const totalSeconds = minutes * 60 + seconds

  return totalSeconds > 0 ? totalSeconds : null
}

/**
 * Builds YouTube embed URL with optional parameters
 */
export function buildYouTubeEmbedUrl(
  videoId: string,
  options: {
    width?: number
    height?: number
    autoplay?: boolean
    start?: number
    rel?: boolean
    modestbranding?: boolean
    controls?: number
    showinfo?: boolean
  } = {}
): string {
  const params = new URLSearchParams()

  if (options.start) {
    params.append('start', options.start.toString())
  }
  if (options.autoplay) {
    params.append('autoplay', '1')
  }
  if (options.rel === false) {
    params.append('rel', '0')
  }
  if (options.modestbranding) {
    params.append('modestbranding', '1')
  }
  if (options.controls !== undefined) {
    params.append('controls', options.controls.toString())
  }
  if (options.showinfo === false) {
    params.append('showinfo', '0')
  }

  const queryString = params.toString()
  return `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ''}`
}

/**
 * Gets YouTube thumbnail URL
 */
export function getYouTubeThumbnailUrl(videoId: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'high'): string {
  const qualityMap = {
    default: '0',
    medium: '1',
    high: 'hqdefault',
    standard: 'sddefault',
    maxres: 'maxresdefault'
  }
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`
}

