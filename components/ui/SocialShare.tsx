'use client'

import { useEffect, useState } from 'react'

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
  image?: string
}

declare global {
  interface Window {
    FB?: {
      ui: (params: {
        display: string
        method: string
        href: string
      }, callback?: (response: any) => void) => void
    }
    twttr?: {
      widgets: {
        load: () => void
      }
    }
  }
}

export default function SocialShare({ url, title, description, image }: SocialShareProps) {
  const [fbLoaded, setFbLoaded] = useState(false)
  const [twitterLoaded, setTwitterLoaded] = useState(false)
  const [pinterestLoaded, setPinterestLoaded] = useState(false)
  const [shareUrl, setShareUrl] = useState(url || '')

  // Get current URL on client side if not provided
  useEffect(() => {
    if (!shareUrl && typeof window !== 'undefined') {
      setShareUrl(window.location.href)
    }
  }, [shareUrl])

  // Load Facebook SDK
  useEffect(() => {
    if (fbLoaded) return

    // Check if script already exists
    if (document.getElementById('facebook-jssdk')) {
      setFbLoaded(true)
      return
    }

    // Create fb-root div if it doesn't exist
    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div')
      fbRoot.id = 'fb-root'
      document.body.appendChild(fbRoot)
    }

    // Load Facebook SDK
    const script = document.createElement('script')
    script.id = 'facebook-jssdk'
    script.async = true
    script.defer = true
    script.crossOrigin = 'anonymous'
    script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0&appId=100626400000399'
    script.nonce = 'TJpAAl7o'
    
    script.onload = () => {
      setFbLoaded(true)
    }
    
    document.body.appendChild(script)

    return () => {
      // Cleanup is handled by React
    }
  }, [fbLoaded])

  // Load Twitter widgets
  useEffect(() => {
    if (twitterLoaded) return

    if (document.getElementById('twitter-wjs')) {
      setTwitterLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.id = 'twitter-wjs'
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    
    script.onload = () => {
      setTwitterLoaded(true)
      if (window.twttr?.widgets) {
        window.twttr.widgets.load()
      }
    }
    
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode?.insertBefore(script, firstScript)
  }, [twitterLoaded])

  // Load Pinterest script
  useEffect(() => {
    if (pinterestLoaded) return

    if (document.getElementById('pinterest-js')) {
      setPinterestLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.id = 'pinterest-js'
    script.src = 'https://assets.pinterest.com/js/pinit.js'
    script.async = true
    
    script.onload = () => {
      setPinterestLoaded(true)
    }
    
    document.body.appendChild(script)
  }, [pinterestLoaded])

  const handleFacebookShare = () => {
    const currentUrl = shareUrl || (typeof window !== 'undefined' ? window.location.href : '')
    if (!currentUrl) return

    if (window.FB) {
      window.FB.ui(
        {
          display: 'popup',
          method: 'share',
          href: currentUrl,
        },
        (response) => {
          // Optional: handle response
        }
      )
    } else {
      // Fallback: open Facebook share dialog
      const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
      window.open(fbShareUrl, '_blank', 'width=600,height=400')
    }
  }

  const handleTwitterShare = () => {
    const currentUrl = shareUrl || (typeof window !== 'undefined' ? window.location.href : '')
    if (!currentUrl) return

    const text = title || description || ''
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}&via=CRGLuxury`
    window.open(twitterShareUrl, '_blank', 'width=600,height=400')
  }

  const handlePinterestShare = () => {
    const currentUrl = shareUrl || (typeof window !== 'undefined' ? window.location.href : '')
    if (!currentUrl) return

    const pinterestShareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}${image ? `&media=${encodeURIComponent(image)}` : ''}${description ? `&description=${encodeURIComponent(description)}` : ''}`
    window.open(pinterestShareUrl, '_blank', 'width=600,height=400')
  }

  return (
    <div className="flex gap-2 mb-3 mt-2">
      {/* Facebook Share Button */}
      <button
        onClick={handleFacebookShare}
        className="-mt-[1px] text-[12px] tracking-[0.5px] font-sans inline-block cursor-pointer rounded-[3px] p-[4px_8px_4px_11px] leading-[100%] bg-[#4167b2] text-white not-italic flex items-center gap-2 hover:bg-[#166fe5] transition-colors"
        aria-label="Share on Facebook"
      >
        <span>Like</span>
      </button>

      {/* Twitter/X Share Button */}
      <button
        onClick={handleTwitterShare}
        className="relative text-[12px] h-[20px] box-border py-[1px] px-3 bg-black text-white rounded-full font-medium cursor-pointer hover:bg-gray-800 transition-colors flex items-center"
        aria-label="Share on X (Twitter)"
      >
        <span>Post</span>
      </button>

      {/* Pinterest Share Button */}
      <button
        onClick={handlePinterestShare}
        className="rounded-[2px] text-[12px] indent-[20px] w-auto p-[0_4px_0_0] text-center no-underline text-[11px] leading-[20px] font-bold text-white bg-[length:14px_14px] antialiased hover:bg-[#d50c22] transition-colors"
        style={{
          backgroundImage: `url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiIHZpZXdCb3g9Ii0xIC0xIDMxIDMxIj48Zz48cGF0aCBkPSJNMjkuNDQ5LDE0LjY2MiBDMjkuNDQ5LDIyLjcyMiAyMi44NjgsMjkuMjU2IDE0Ljc1LDI5LjI1NiBDNi42MzIsMjkuMjU2IDAuMDUxLDIyLjcyMiAwLjA1MSwxNC42NjIgQzAuMDUxLDYuNjAxIDYuNjMyLDAuMDY3IDE0Ljc1LDAuMDY3IEMyMi44NjgsMC4wNjcgMjkuNDQ5LDYuNjAxIDI5LjQ0OSwxNC42NjIiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+PHBhdGggZD0iTTE0LjczMywxLjY4NiBDNy41MTYsMS42ODYgMS42NjUsNy40OTUgMS42NjUsMTQuNjYyIEMxLjY2NSwyMC4xNTkgNS4xMDksMjQuODU0IDkuOTcsMjYuNzQ0IEM5Ljg1NiwyNS43MTggOS43NTMsMjQuMTQzIDEwLjAxNiwyMy4wMjIgQzEwLjI1MywyMi4wMSAxMS41NDgsMTYuNTcyIDExLjU0OCwxNi41NzIgQzExLjU0OCwxNi41NzIgMTEuMTU3LDE1Ljc5NSAxMS4xNTcsMTQuNjQ2IEMxMS4xNTcsMTIuODQyIDEyLjIxMSwxMS40OTUgMTMuNTIyLDExLjQ5NSBDMTQuNjM3LDExLjQ5NSAxNS4xNzUsMTIuMzI2IDE1LjE3NSwxMy4zMjMgQzE1LjE3NSwxNC40MzYgMTQuNDYyLDE2LjEgMTQuMDkzLDE3LjY0MyBDMTMuNzg1LDE4LjkzNSAxNC43NDUsMTkuOTg4IDE2LjAyOCwxOS45ODggQzE4LjM1MSwxOS45ODggMjAuMTM2LDE3LjU1NiAyMC4xMzYsMTQuMDQ2IEMyMC4xMzYsMTAuOTM5IDE3Ljg4OCw4Ljc2NyAxNC42NzgsOC43NjcgQzEwLjk1OSw4Ljc2NyA4Ljc3NywxMS41MzYgOC43NzcsMTQuMzk4IEM4Ljc3NywxNS41MTMgOS4yMSwxNi43MDkgOS43NDksMTcuMzU5IEM5Ljg1NiwxNy40ODggOS44NzIsMTcuNiA5Ljg0LDE3LjczMSBDOS43NDEsMTguMTQxIDkuNTIsMTkuMDIzIDkuNDc3LDE5LjIwMyBDOS40MiwxOS40NCA5LjI4OCwxOS40OTEgOS4wNCwxOS4zNzYgQzcuNDA4LDE4LjYyMiA2LjM4NywxNi4yNTIgNi4zODcsMTQuMzQ5IEM2LjM4NywxMC4yNTYgOS4zODMsNi40OTcgMTUuMDIyLDYuNDk3IEMxOS41NTUsNi40OTcgMjMuMDc4LDkuNzA1IDIzLjA3OCwxMy45OTEgQzIzLjA3OCwxOC40NjMgMjAuMjM5LDIyLjA2MiAxNi4yOTcsMjIuMDYyIEMxNC45NzMsMjIuMDYyIDEzLjcyOCwyMS4zNzkgMTMuMzAyLDIwLjU3MiBDMTMuMzAyLDIwLjU3MiAxMi42NDcsMjMuMDUgMTIuNDg4LDIzLjY1NyBDMTIuMTkzLDI0Ljc4NCAxMS4zOTYsMjYuMTk2IDEwLjg2MywyNy4wNTggQzEyLjA4NiwyNy40MzQgMTMuMzg2LDI3LjYzNyAxNC43MzMsMjcuNjM3IEMyMS45NSwyNy42MzcgMjcuODAxLDIxLjgyOCAyNy44MDEsMTQuNjYyIEMyNy44MDEsNy40OTUgMjEuOTUsMS42ODYgMTQuNzMzLDEuNjg2IiBmaWxsPSIjZTYwMDIzIj48L3BhdGg+PC9nPjwvc3ZnPg==)`,
          backgroundPosition: '3px 50%',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#e60023',
        }}
        aria-label="Save to Pinterest"
      >
        <span>Save</span>
      </button>
    </div>
  )
}

