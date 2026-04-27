/**
 * QR Code filename + helpers (general / individual exports)
 *
 * SVG and PNG use the same pattern:
 *   %projectName%.%date% (YYYYMMDD).%time% (HHMMSS, 24h).%section%.%subSection%/%target%.%entry%.{svg|png}
 *   — `projectName` from package.json unless overridden. The `/` between `subSection` and `target`
 *   places the file in a per-export subdirectory in the Downloads folder (browser-friendly path
 *   separator when used as the value of `a.download`).
 *
 * vCard payloads (`BEGIN:VCARD…`): default `target` / `entry` are `vcard` and `payload` so filenames
 * are not filled with sanitized vCard header text (e.g. `BEGINVCARD_VERSION…`).
 */

import packageJson from '../../../../package.json'

const PACKAGE_PROJECT_NAME = typeof packageJson.name === 'string' ? packageJson.name : 'app'

/**
 * Sanitizes a string for use in a filename by removing/replacing invalid characters
 */
function sanitizeForFilename(str: string): string {
  return str
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^\w\-_.]/g, '')
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
 * Time as HHMMSS (24-hour)
 */
function formatTimeHHMMSS(date: Date = new Date()): string {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  return `${h}${m}${s}`
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

/** True when QR text is a vCard — avoid using raw header lines in filename segments. */
function isVcardQrPayload(text: string): boolean {
  return /^\s*BEGIN:VCARD\b/i.test(text)
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
  /** Maximum length for default `target` slice from `textContent` (defaults to 12) */
  maxTextLength?: number
}

/** Optional overrides for structured QR filename segments (SVG + PNG). */
export interface QrCodeIndividualFilenameSegmentOptions {
  projectName?: string
  date?: Date
  section?: string
  subSection?: string
  target?: string
  entry?: string
  /** Max chars for default `target` when `target` omitted (default 12). */
  targetMaxLength?: number
  /** Max chars for default `entry` when `entry` omitted and no logo (default 24). */
  entryMaxLength?: number
}

/** @deprecated Use {@link QrCodeIndividualFilenameSegmentOptions} */
export type QrCodeSvgFilenameSegmentOptions = QrCodeIndividualFilenameSegmentOptions

function buildStructuredQrFilename(
  textContent: string,
  logoFilename: string | undefined,
  segmentOptions: QrCodeIndividualFilenameSegmentOptions | undefined,
  extension: 'svg' | 'png',
): string {
  const date = segmentOptions?.date ?? new Date()
  const projectName = sanitizeForFilename(segmentOptions?.projectName ?? PACKAGE_PROJECT_NAME) || 'app'
  const section = sanitizeForFilename(segmentOptions?.section ?? 'general') || 'general'
  const subSection = sanitizeForFilename(segmentOptions?.subSection ?? 'qrCode') || 'qrCode'

  const vcardPayload = isVcardQrPayload(textContent)
  const targetLen = segmentOptions?.targetMaxLength ?? 12
  const defaultTarget = vcardPayload
    ? 'vcard'
    : truncateString(textContent, targetLen) || 'payload'
  const target = sanitizeForFilename(segmentOptions?.target ?? defaultTarget) || 'payload'

  const entryLen = segmentOptions?.entryMaxLength ?? 24
  let entry: string
  if (segmentOptions?.entry != null && segmentOptions.entry !== '') {
    entry = sanitizeForFilename(segmentOptions.entry) || 'entry'
  } else if (logoFilename) {
    entry = sanitizeForFilename(getBaseFilename(logoFilename)) || 'logo'
  } else {
    entry = vcardPayload
      ? 'payload'
      : truncateString(textContent, entryLen) || 'content'
  }

  const dirParts = [
    projectName,
    formatDateYYYYMMDD(date),
    formatTimeHHMMSS(date),
    section,
    subSection,
  ]
  return `${dirParts.join('.')}/${target}.${entry}.${extension}`
}

/**
 * Generates a standardized filename for QR code exports (structured pattern for both SVG and PNG).
 */
export function generateQRCodeFilename(options: QRCodeFilenameOptions): string {
  const { textContent, logoFilename, extension, date, maxTextLength = 12 } = options
  return buildStructuredQrFilename(textContent, logoFilename, { date, targetMaxLength: maxTextLength }, extension)
}

/**
 * Generates filename for SVG export.
 *
 * @param textContent — Encoded payload (used for default `target` / `entry` when not overridden).
 * @param logoFilename — Optional center image; default `entry` uses its basename when `entry` omitted.
 * @param segmentOptions — Optional `section`, `subSection`, `target`, `entry`, `date`, `projectName`.
 */
export function generateQRCodeSvgFilename(
  textContent: string,
  logoFilename?: string,
  segmentOptions?: QrCodeIndividualFilenameSegmentOptions,
): string {
  return buildStructuredQrFilename(textContent, logoFilename, segmentOptions, 'svg')
}

/**
 * Generates filename for PNG export (same structured pattern as SVG).
 */
export function generateQRCodePngFilename(
  textContent: string,
  logoFilename?: string,
  segmentOptions?: QrCodeIndividualFilenameSegmentOptions,
): string {
  return buildStructuredQrFilename(textContent, logoFilename, segmentOptions, 'png')
}

export default {
  generateQRCodeFilename,
  generateQRCodeSvgFilename,
  generateQRCodePngFilename,
}
