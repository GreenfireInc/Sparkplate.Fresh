/**
 * AddressBook → Wallet QR export
 *
 * Sibling of `filenameStructureAndContent.addressBook.Exchange.qrCode.ts`.
 * Builds a vCard 3.0 payload from a `StandaloneWalletRecord` and renders it as
 * a QR code (PNG or SVG). Filenames follow a fully dot-separated variant of the
 * structured pattern from `filenameStructureAndContent.general.qrCode.individual`:
 *
 *   %projectName%.%date%.%time%.addressbook.wallet.%walletName%.vcard.{svg|png}
 *
 * The Exchange exporter documents why the `/` separator from the general
 * helper is flattened to `.` (Firefox flattens `/` in `a.download` to `_`);
 * the same applies here so the filename is consistent across browsers.
 */

import QRCode from 'qrcode'
import {
  generateQRCodePngFilename,
  generateQRCodeSvgFilename,
} from '@/lib/cores/exportStandard/filenameStructureAndContent.general.qrCode.individual'
import type { StandaloneWalletRecord } from '@/services/addressBook/service.addressBook.StandaloneWallet'

/* vCard escaping per RFC 6350: backslash, semicolon, comma, newline. */
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
 * Build a vCard 3.0 payload representing a standalone address-book wallet.
 * Uses ORG for the wallet name; merges notes / password hint / mnemonic
 * metadata into the NOTE field; emits one X-CRYPTOCURRENCY-N entry per
 * configured currency. Mirrors the Exchange vCard pattern.
 *
 * Note: mnemonic "first / last word" hints and password hints are intentionally
 * included because they're already stored in the wallet record. They are *hints*
 * (not the seed phrase or password itself) and are surfaced read-only in the
 * details modal — exporting them here keeps the QR/vCard a faithful copy of
 * what the user sees in-app.
 */
export function walletToVCard(wallet: StandaloneWalletRecord): string {
  const lines: string[] = []
  lines.push('BEGIN:VCARD')
  lines.push('VERSION:3.0')
  lines.push(`FN:${escapeVCardValue(wallet.name || 'Wallet')}`)
  if (wallet.name) lines.push(`ORG:${escapeVCardValue(wallet.name)}`)

  const noteParts: string[] = []
  if (wallet.notes?.trim()) noteParts.push(wallet.notes.trim())
  if (wallet.passwordHint?.trim()) noteParts.push(`Password hint: ${wallet.passwordHint.trim()}`)
  if (wallet.mnemonicWordCount != null) noteParts.push(`Mnemonic length: ${wallet.mnemonicWordCount}`)
  if (wallet.mnemonicFirst?.trim()) noteParts.push(`Mnemonic first: ${wallet.mnemonicFirst.trim()}`)
  if (wallet.mnemonicLast?.trim()) noteParts.push(`Mnemonic last: ${wallet.mnemonicLast.trim()}`)
  if (noteParts.length > 0) lines.push(`NOTE:${escapeVCardValue(noteParts.join(' | '))}`)

  wallet.currencies.forEach((c, i) => {
    const ticker = c.abbreviation || c.name || 'COIN'
    const uri = `${ticker.toLowerCase()}://${c.address}`
    lines.push(`X-CRYPTOCURRENCY-${i + 1};TYPE=${escapeVCardValue(ticker)}:${escapeVCardValue(uri)}`)
  })
  lines.push('END:VCARD')
  return lines.join('\r\n')
}

/* Filename-safe target segment derived from the wallet name (or id fallback). */
function walletFilenameTarget(wallet: StandaloneWalletRecord): string {
  return (wallet.name || `wallet_${wallet.id}`).replace(/[^a-zA-Z0-9_]/g, '_') || 'wallet'
}

/**
 * Flatten the `/` that the general structured pattern places between
 * `subSection` and `target` into a `.`, so wallet exports use a single
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

/** Generate a vCard QR for the wallet and download it as SVG. */
export async function exportWalletQrSvg(wallet: StandaloneWalletRecord): Promise<void> {
  try {
    const vcard = walletToVCard(wallet)
    const svg = await QRCode.toString(vcard, { type: 'svg', width: 400, margin: 2 })
    const filename = flattenStructuredFilename(
      generateQRCodeSvgFilename(vcard, undefined, {
        section: 'addressbook',
        subSection: 'wallet',
        target: walletFilenameTarget(wallet),
        entry: 'vcard',
      }),
    )
    downloadBlob(filename, new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))
  } catch (e) {
    console.error('Wallet QR SVG export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export wallet QR (SVG).')
  }
}

/** Generate a vCard QR for the wallet and download it as PNG. */
export async function exportWalletQrPng(wallet: StandaloneWalletRecord): Promise<void> {
  try {
    const vcard = walletToVCard(wallet)
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
        subSection: 'wallet',
        target: walletFilenameTarget(wallet),
        entry: 'vcard',
      }),
    )
    downloadBlob(filename, blob)
  } catch (e) {
    console.error('Wallet QR PNG export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export wallet QR (PNG).')
  }
}

export default {
  walletToVCard,
  exportWalletQrPng,
  exportWalletQrSvg,
}
