/**
 * Reusable Page Loading Component
 * 
 * Professional loading state component that matches the site's rustic cabin theme.
 * Can be customized with different messages and layout variants.
 */

interface PageLoadingProps {
  /**
   * Custom loading message to display
   * @default "Loading..."
   */
  message?: string
  
  /**
   * Layout variant to match different page structures
   * - "cabin": For cabin category pages (w-[67%] layout)
   * - "container": For standard container pages (container mx-auto)
   * @default "cabin"
   */
  variant?: 'cabin' | 'container'
  
  /**
   * Number of skeleton lines to show for content
   * @default 6
   */
  skeletonLines?: number
  
  /**
   * Show spinner
   * @default true
   */
  showSpinner?: boolean
}

export default function PageLoading({
  message = 'Loading...',
  variant = 'cabin',
  skeletonLines = 6,
  showSpinner = true,
}: PageLoadingProps) {
  // Generate skeleton lines with staggered delays
  const skeletonLineDelays = Array.from({ length: skeletonLines }, (_, i) => i * 0.1)
  
  // Container classes based on variant
  const containerClasses = variant === 'cabin' 
    ? 'w-[67%] mb-[-1px] min-h-full mt-0 relative h-auto pb-[30px] align-top py-5 px-5'
    : 'container mx-auto px-4 py-12'
  
  const contentClasses = variant === 'cabin'
    ? 'max-w-none'
    : 'max-w-4xl mx-auto'

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        {/* Skeleton for title - matches h1 style */}
        <div className="mb-8">
          <div className="h-12 bg-gradient-to-r from-[#e8d5c4] via-[#f0e6d9] to-[#e8d5c4] rounded w-3/4 mb-4 animate-pulse"></div>
          <div 
            className="h-10 bg-gradient-to-r from-[#f0e6d9] via-[#e8d5c4] to-[#f0e6d9] rounded w-1/2 animate-pulse" 
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>

        {/* Skeleton for description content - prose style */}
        <div className="space-y-3 mb-8">
          {skeletonLineDelays.map((delay, index) => {
            const widths = ['w-full', 'w-full', 'w-5/6', 'w-4/5', 'w-full', 'w-3/4']
            const widthClass = widths[index % widths.length] || 'w-full'
            
            return (
              <div
                key={index}
                className={`h-4 bg-[#f0e6d9] rounded ${widthClass} animate-pulse`}
                style={{ animationDelay: `${delay}s` }}
              ></div>
            )
          })}
        </div>

        {/* Loading spinner with site colors - centered */}
        {showSpinner && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative mb-4">
              {/* Outer ring with site brown color */}
              <div className="w-16 h-16 border-4 border-[#e8d5c4] border-t-[#7c2c00] rounded-full animate-spin"></div>
              {/* Inner accent dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#7c2c00] rounded-full"></div>
            </div>
            
            {/* Loading text with site typography */}
            <p className="text-[#533e27] text-lg italic font-serif">
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

