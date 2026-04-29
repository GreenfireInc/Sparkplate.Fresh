/**
 * AddressBook → Company QR export
 *
 * Builds a vCard 3.0 payload from a `Company` (derived aggregation of one or
 * more contacts under the same `company` field) and renders it as a QR code
 * (PNG or SVG). Filenames follow the same fully dot-separated variant of the
 * structured pattern used by exchange / wallet exports:
 *
 *   %projectName%.%date%.%time%.addressbook.company.%companyName%.vcard.{svg|png}
 *
 * Note: the general helper places `/` between `subSection` and `target` so the
 * file lands in a per-export subdirectory, but several browsers (notably
 * Firefox) flatten `/` in `a.download` to `_`. Company exports flatten that
 * separator to `.` deliberately so the filename is consistent across browsers.
 */

import QRCode from 'qrcode'
import {
  generateQRCodePngFilename,
  generateQRCodeSvgFilename,
} from '@/lib/cores/exportStandard/filenameStructureAndContent.general.qrCode.individual'
import type { Company } from '@/services/addressBook/service.addressBook.Company'

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
 * Build a vCard 3.0 payload representing a company. Uses ORG and FN for the
 * company name, EMAIL for the main contact's email, NOTE for main-contact +
 * position metadata, and one X-CRYPTOCURRENCY-1 entry when the company has a
 * known primary address. Mirrors the Exchange QR vCard pattern.
 */
export function companyToVCard(company: Company): string {
  const lines: string[] = []
  lines.push('BEGIN:VCARD')
  lines.push('VERSION:3.0')
  lines.push(`FN:${escapeVCardValue(company.name || 'Company')}`)
  if (company.name) lines.push(`ORG:${escapeVCardValue(company.name)}`)
  if (company.email) lines.push(`EMAIL;TYPE=INTERNET:${escapeVCardValue(company.email)}`)

  const noteParts: string[] = []
  if (company.mainContact?.trim()) noteParts.push(`Main contact: ${company.mainContact.trim()}`)
  if (company.position?.trim()) noteParts.push(`Position: ${company.position.trim()}`)
  if (company.numCurrencies > 0) {
    noteParts.push(
      `${company.numCurrencies} ${company.numCurrencies === 1 ? 'address' : 'addresses'} on file`,
    )
  }
  if (noteParts.length > 0) lines.push(`NOTE:${escapeVCardValue(noteParts.join(' | '))}`)

  if (company.mainCurrencyAddress) {
    lines.push(
      `X-CRYPTOCURRENCY-1;TYPE=ADDRESS:${escapeVCardValue(company.mainCurrencyAddress)}`,
    )
  }

  lines.push('END:VCARD')
  return lines.join('\r\n')
}

/** Filename-safe target segment derived from the company name (or id fallback). */
function companyFilenameTarget(company: Company): string {
  return (company.name || `company_${company.id}`).replace(/[^a-zA-Z0-9_]/g, '_') || 'company'
}

/**
 * Flatten the `/` that the general structured pattern places between
 * `subSection` and `target` into a `.`, so company exports use a single
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

/** Generate a vCard QR for the company and download it as SVG. */
export async function exportCompanyQrSvg(company: Company): Promise<void> {
  try {
    const vcard = companyToVCard(company)
    const svg = await QRCode.toString(vcard, { type: 'svg', width: 400, margin: 2 })
    const filename = flattenStructuredFilename(
      generateQRCodeSvgFilename(vcard, undefined, {
        section: 'addressbook',
        subSection: 'company',
        target: companyFilenameTarget(company),
        entry: 'vcard',
      }),
    )
    downloadBlob(filename, new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))
  } catch (e) {
    console.error('Company QR SVG export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export company QR (SVG).')
  }
}

/** Generate a vCard QR for the company and download it as PNG. */
export async function exportCompanyQrPng(company: Company): Promise<void> {
  try {
    const vcard = companyToVCard(company)
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
        subSection: 'company',
        target: companyFilenameTarget(company),
        entry: 'vcard',
      }),
    )
    downloadBlob(filename, blob)
  } catch (e) {
    console.error('Company QR PNG export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export company QR (PNG).')
  }
}

export default {
  companyToVCard,
  exportCompanyQrPng,
  exportCompanyQrSvg,
}
