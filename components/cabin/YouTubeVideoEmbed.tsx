'use client'

import { getYouTubeVideoId, getYouTubeTimeMarker, buildYouTubeEmbedUrl } from '@/lib/utils/youtube-utils'

interface YouTubeVideoEmbedProps {
  url: string
  title?: string
  description?: string
  width?: number
  height?: number
  autoplay?: boolean
  className?: string
}

/**
 * YouTube Video Embed Component
 * Displays YouTube videos using iframe embed, similar to the Drupal video_embed_field implementation
 */
export default function YouTubeVideoEmbed({
  url,
  title,
  description,
  width = 560,
  height = 315,
  autoplay = false,
  className = '',
}: YouTubeVideoEmbedProps) {
  const videoId = getYouTubeVideoId(url)
  const startTime = getYouTubeTimeMarker(url)

  if (!videoId) {
    // If we can't extract a video ID, show the URL as a link
    return (
      <div className={`embedded-video ${className}`}>
        <div className="player">
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {title || url}
          </a>
          {description && <p className="text-gray-600 mt-2">{description}</p>}
        </div>
      </div>
    )
  }

  const embedUrl = buildYouTubeEmbedUrl(videoId, {
    width,
    height,
    autoplay,
    start: startTime || undefined,
    rel: true, // Show related videos
    modestbranding: true, // Hide YouTube logo
    controls: 1, // Show controls
  })

  return (
    <div className={`${className}`}>
      <div className="player">
        {title && <h4 className="text-[18px] text-[#533e27] font-normal mb-2">{title}</h4>}
        <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            width={width}
            height={height}
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {description && (
          <p className="text-[#533e27] text-[14px] mt-3 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  )
}

