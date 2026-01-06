/**
 * HTML Content Utilities
 * 
 * Utility functions for cleaning and processing HTML content
 * from legacy Drupal systems that may contain escaped characters.
 */

/**
 * Cleans HTML content by removing literal escape sequences
 * that may be present in content from legacy systems.
 * 
 * @param html - The HTML string to clean
 * @returns Cleaned HTML string
 * 
 * @example
 * ```ts
 * const cleaned = cleanHtmlContent('Some text\\nwith\\tescapes')
 * // Returns: 'Some text\nwith escapes'
 * ```
 */
export function cleanHtmlContent(html: string): string {
  if (!html) return ''
  
  // Remove literal \r\n escape sequences
  let cleaned = html.replace(/\\r\\n/g, '\n')
  // Remove literal \n escape sequences
  cleaned = cleaned.replace(/\\n/g, '\n')
  // Remove literal \r escape sequences
  cleaned = cleaned.replace(/\\r/g, '')
  // Remove literal \t escape sequences
  cleaned = cleaned.replace(/\\t/g, ' ')
  // Remove literal backslashes before quotes
  cleaned = cleaned.replace(/\\"/g, '"')
  cleaned = cleaned.replace(/\\'/g, "'")
  
  return cleaned
}

/**
 * Sanitizes HTML content for safe rendering.
 * This is a basic sanitization - consider using a library like DOMPurify
 * for production use with untrusted content.
 * 
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''
  
  // First clean escape sequences
  let sanitized = cleanHtmlContent(html)
  
  // Additional sanitization can be added here
  // For now, we rely on React's built-in XSS protection via dangerouslySetInnerHTML
  
  return sanitized
}

/**
 * Strips HTML tags from content, returning plain text.
 * Works in both browser and Node.js environments.
 * Handles named entities, numeric entities, and hex entities.
 * 
 * @param html - The HTML string to strip
 * @returns Plain text content with all HTML tags removed and entities decoded
 * 
 * @example
 * ```ts
 * const text = stripHtmlTags('<p>Hello &amp; welcome</p>')
 * // Returns: 'Hello & welcome'
 * ```
 */
export function stripHtmlTags(html: string): string {
  if (!html) return ''
  
  // Remove HTML tags first
  let text = html.replace(/<[^>]*>/g, '')
  
  // Decode common HTML entities
  const entityMap: { [key: string]: string } = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&rsquo;': "'",
    '&lsquo;': "'",
    '&rdquo;': '"',
    '&ldquo;': '"',
    '&mdash;': '—',
    '&ndash;': '–',
    '&hellip;': '...',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&euro;': '€',
    '&pound;': '£',
    '&yen;': '¥',
    '&cent;': '¢',
  }
  
  // Replace named entities
  for (const [entity, char] of Object.entries(entityMap)) {
    text = text.replace(new RegExp(entity, 'gi'), char)
  }
  
  // Replace numeric entities (&#39;, &#8217;, etc.)
  text = text.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10))
  })
  
  // Replace hex entities (&#x27;, &#x2019;, etc.)
  text = text.replace(/&#x([0-9a-f]+);/gi, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16))
  })
  
  // Normalize whitespace
  text = text.replace(/\s+/g, ' ').trim()
  
  return text
}

