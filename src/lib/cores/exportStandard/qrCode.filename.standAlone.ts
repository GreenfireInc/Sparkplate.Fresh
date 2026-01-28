/**
 * QR Code Filename Generator
 * 
 * Generates standardized filenames for QR code exports.
 * Format: %YYYYMMDD%.%truncateTextInputTo12Characters%.%pictureFilename%.%extension%
 */

/**
 * Sanitizes a string for use in a filename by removing/replacing invalid characters
 */
function sanitizeForFilename(str: string): string {
  return str
    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid filename characters
    .replace(/\s+/g, '_')          // Replace whitespace with underscores
    .replace(/[^\w\-_.]/g, '')     // Remove any other non-word characters except dash, underscore, dot
    .trim()
}

/**
 * Truncates a string to a maximum length
 */
function truncateString(str: string, maxLength: number): string {
  const sanitized = sanitizeForFilename(str)
  return sanitized.length > maxLength ? sanitized.slice(0, maxLength) : sanitized
}

/**
 * Formats the current date as YYYYMMDD
 */
function formatDateYYYYMMDD(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

/**
 * Extracts the base filename without extension from a full filename
 */
function getBaseFilename(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.')
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return filename
  }
  return filename.slice(0, lastDotIndex)
}

export interface QRCodeFilenameOptions {
  /** The text content encoded in the QR code */
  textContent: string
  /** The filename of the imported center logo (optional) */
  logoFilename?: string
  /** The export format extension (svg or png) */
  extension: 'svg' | 'png'
  /** Custom date to use (defaults to current date) */
  date?: Date
  /** Maximum length for the truncated text portion (defaults to 12) */
  maxTextLength?: number
}

/**
 * Generates a standardized filename for QR code exports
 * 
 * Format: YYYYMMDD.truncatedText.logoFilename.extension
 * 
 * @example
 * generateQRCodeFilename({
 *   textContent: '1LhWX7N5fXKhWbyUzPwpzr6s3KewU2czBe',
 *   logoFilename: 'btc.svg',
 *   extension: 'svg'
 * })
 * // Returns: "20260127.1LhWX7N5fXKh.btc.svg"
 * 
 * @example
 * generateQRCodeFilename({
 *   textContent: 'https://example.com',
 *   extension: 'png'
 * })
 * // Returns: "20260127.https___exampl.png"
 */
export function generateQRCodeFilename(options: QRCodeFilenameOptions): string {
  const {
    textContent,
    logoFilename,
    extension,
    date = new Date(),
    maxTextLength = 12
  } = options

  const parts: string[] = []

  // 1. Date in YYYYMMDD format
  parts.push(formatDateYYYYMMDD(date))

  // 2. Truncated text content (max 12 characters by default)
  const truncatedText = truncateString(textContent, maxTextLength)
  if (truncatedText) {
    parts.push(truncatedText)
  }

  // 3. Logo filename (without extension) if provided
  if (logoFilename) {
    const logoBase = sanitizeForFilename(getBaseFilename(logoFilename))
    if (logoBase) {
      parts.push(logoBase)
    }
  }

  // Join parts with dots and add extension
  return `${parts.join('.')}.${extension}`
}

/**
 * Generates filename for SVG export
 */
export function generateQRCodeSvgFilename(textContent: string, logoFilename?: string): string {
  return generateQRCodeFilename({
    textContent,
    logoFilename,
    extension: 'svg'
  })
}

/**
 * Generates filename for PNG export
 */
export function generateQRCodePngFilename(textContent: string, logoFilename?: string): string {
  return generateQRCodeFilename({
    textContent,
    logoFilename,
    extension: 'png'
  })
}

export default {
  generateQRCodeFilename,
  generateQRCodeSvgFilename,
  generateQRCodePngFilename
}
