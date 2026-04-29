/**
 * AddressBook → Exchange QR export
 *
 * Builds a vCard 3.0 payload from an `ExchangeRecord` and renders it as a QR
 * code (PNG or SVG). Filenames follow a fully dot-separated variant of the
 * structured pattern from `filenameStructureAndContent.general.qrCode.individual`:
 *
 *   %projectName%.%date%.%time%.addressbook.exchange.%exchangeName%.vcard.{svg|png}
 *
 * Note: the general helper places `/` between `subSection` and `target` so the
 * file lands in a per-export subdirectory, but several browsers (notably
 * Firefox) flatten `/` in `a.download` to `_`, producing `…exchange_MEXC.…`.
 * Exchange exports flatten that separator to `.` deliberately so the filename
 * is consistent across browsers.
 */

import QRCode from 'qrcode'
import {
  generateQRCodePngFilename,
  generateQRCodeSvgFilename,
} from '@/lib/cores/exportStandard/filenameStructureAndContent.general.qrCode.individual'
import type { ExchangeRecord } from '@/services/addressBook/service.addressBook.Exchange'

/** vCard escaping per RFC 6350: backslash, semicolon, comma, newline. */
function escapeVCardValue(value: string): string {
  if (!value) return ''
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '')
}

/**
 * Build a vCard 3.0 payload representing an exchange. Uses ORG for the
 * exchange name, plus URL, EMAIL, NOTE, and one X-CRYPTOCURRENCY-N entry per
 * configured currency address. Mirrors the contact QR vCard pattern.
 */
export function exchangeToVCard(exchange: ExchangeRecord): string {
  const lines: string[] = []
  lines.push('BEGIN:VCARD')
  lines.push('VERSION:3.0')
  lines.push(`FN:${escapeVCardValue(exchange.name || 'Exchange')}`)
  if (exchange.name) lines.push(`ORG:${escapeVCardValue(exchange.name)}`)
  if (exchange.url) lines.push(`URL:${escapeVCardValue(exchange.url)}`)
  if (exchange.email) lines.push(`EMAIL;TYPE=INTERNET:${escapeVCardValue(exchange.email)}`)
  const noteParts: string[] = []
  if (exchange.notes?.trim()) noteParts.push(exchange.notes.trim())
  if (exchange.referralCode?.trim()) noteParts.push(`Referral: ${exchange.referralCode.trim()}`)
  if (exchange.referralUrl?.trim()) noteParts.push(`Referral URL: ${exchange.referralUrl.trim()}`)
  if (noteParts.length > 0) lines.push(`NOTE:${escapeVCardValue(noteParts.join(' | '))}`)
  exchange.currencies.forEach((c, i) => {
    const ticker = c.abbreviation || c.name || 'COIN'
    const uri = `${ticker.toLowerCase()}://${c.address}`
    lines.push(`X-CRYPTOCURRENCY-${i + 1};TYPE=${escapeVCardValue(ticker)}:${escapeVCardValue(uri)}`)
  })
  lines.push('END:VCARD')
  return lines.join('\r\n')
}

/** Filename-safe target segment derived from the exchange name (or id fallback). */
function exchangeFilenameTarget(exchange: ExchangeRecord): string {
  return (exchange.name || `exchange_${exchange.id}`).replace(/[^a-zA-Z0-9_]/g, '_') || 'exchange'
}

/**
 * Flatten the `/` that the general structured pattern places between
 * `subSection` and `target` into a `.`, so exchange exports use a single
 * fully-dot-separated filename instead of relying on a (browser-dependent)
 * subdirectory in `a.download`.
 */
function flattenStructuredFilename(filename: string): string {
  return filename.replace('/', '.')
}

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/** Generate a vCard QR for the exchange and download it as SVG. */
export async function exportExchangeQrSvg(exchange: ExchangeRecord): Promise<void> {
  try {
    const vcard = exchangeToVCard(exchange)
    const svg = await QRCode.toString(vcard, { type: 'svg', width: 400, margin: 2 })
    const filename = flattenStructuredFilename(
      generateQRCodeSvgFilename(vcard, undefined, {
        section: 'addressbook',
        subSection: 'exchange',
        target: exchangeFilenameTarget(exchange),
        entry: 'vcard',
      }),
    )
    downloadBlob(filename, new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))
  } catch (e) {
    console.error('Exchange QR SVG export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export exchange QR (SVG).')
  }
}

/** Generate a vCard QR for the exchange and download it as PNG. */
export async function exportExchangeQrPng(exchange: ExchangeRecord): Promise<void> {
  try {
    const vcard = exchangeToVCard(exchange)
    const dataUrl = await QRCode.toDataURL(vcard, {
      width: 400,
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' },
    })
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    const filename = flattenStructuredFilename(
      generateQRCodePngFilename(vcard, undefined, {
        section: 'addressbook',
        subSection: 'exchange',
        target: exchangeFilenameTarget(exchange),
        entry: 'vcard',
      }),
    )
    downloadBlob(filename, blob)
  } catch (e) {
    console.error('Exchange QR PNG export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export exchange QR (PNG).')
  }
}

export default {
  exchangeToVCard,
  exportExchangeQrPng,
  exportExchangeQrSvg,
}
