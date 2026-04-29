/**
 * AddressBook → Exchange text-format exports (CSV / VCF / JSON / MD)
 *
 * Sibling to `filenameStructureAndContent.addressBook.Exchange.qrCode.ts`.
 * Uses the same fully dot-separated filename pattern:
 *
 *   %projectName%.%date%.%time%.addressbook.exchange.%exchangeName%.%entry%.%ext%
 *
 * Where `entry` describes the payload (e.g. `currencies` for CSV, `vcard` for
 * VCF, `record` for JSON / Markdown). The pattern matches the QR exports so a
 * single exchange's exports group naturally when sorted by name.
 */

import packageJson from '../../../../../package.json'
import type { ExchangeRecord } from '@/services/addressBook/service.addressBook.Exchange'
import { exchangeToVCard } from '@/lib/cores/exportStandard/addressBook/filenameStructureAndContent.addressBook.Exchange.qrCode'

const PACKAGE_PROJECT_NAME = typeof packageJson.name === 'string' ? packageJson.name : 'app'

function sanitizeForFilename(str: string): string {
  return str
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^\w\-_.]/g, '')
    .trim()
}

function formatDateYYYYMMDD(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

function formatTimeHHMMSS(date: Date = new Date()): string {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  return `${h}${m}${s}`
}

function exchangeFilenameTarget(exchange: ExchangeRecord): string {
  return (exchange.name || `exchange_${exchange.id}`).replace(/[^a-zA-Z0-9_]/g, '_') || 'exchange'
}

/**
 * Build the dot-separated filename:
 *   %projectName%.%YYYYMMDD%.%HHMMSS%.addressbook.exchange.%target%.%entry%.%ext%
 */
function buildExchangeTextFilename(
  exchange: ExchangeRecord,
  entry: string,
  extension: string,
  date: Date = new Date(),
): string {
  const projectName = sanitizeForFilename(PACKAGE_PROJECT_NAME) || 'app'
  const target = exchangeFilenameTarget(exchange)
  const safeEntry = sanitizeForFilename(entry) || 'record'
  const safeExt = sanitizeForFilename(extension) || 'txt'
  return [
    projectName,
    formatDateYYYYMMDD(date),
    formatTimeHHMMSS(date),
    'addressbook',
    'exchange',
    target,
    safeEntry,
    safeExt,
  ].join('.')
}

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function csvEscape(value: unknown): string {
  const s = value == null ? '' : String(value)
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function mdEscapeCell(value: string): string {
  return value.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim()
}

/**
 * CSV content: an exchange-info preamble (commented `#` lines, ignored by most
 * CSV consumers) followed by a currencies table. Falls back to a single empty
 * row when the exchange has no currencies configured.
 */
export function exchangeToCsv(exchange: ExchangeRecord): string {
  const preamble: string[] = []
  preamble.push(`# Exchange: ${exchange.name ?? ''}`)
  if (exchange.url) preamble.push(`# URL: ${exchange.url}`)
  if (exchange.email) preamble.push(`# Email: ${exchange.email}`)
  if (exchange.referralCode) preamble.push(`# Referral code: ${exchange.referralCode}`)
  if (exchange.referralUrl) preamble.push(`# Referral URL: ${exchange.referralUrl}`)
  if (exchange.notes?.trim()) preamble.push(`# Notes: ${exchange.notes.replace(/\r?\n/g, ' ')}`)

  const headers = ['Name', 'Abbreviation', 'Address']
  const rows: string[] = [headers.join(',')]
  if (exchange.currencies.length === 0) {
    rows.push([csvEscape(''), csvEscape(''), csvEscape('')].join(','))
  } else {
    for (const c of exchange.currencies) {
      rows.push([csvEscape(c.name), csvEscape(c.abbreviation), csvEscape(c.address)].join(','))
    }
  }
  return `${preamble.join('\n')}\n${rows.join('\n')}\n`
}

/** JSON content: pretty-printed exchange record + export timestamp. */
export function exchangeToJson(exchange: ExchangeRecord): string {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      exchange,
    },
    null,
    2,
  )
}

/**
 * Markdown content: title (exchange name), metadata bullet list, currencies
 * table, and an optional notes section.
 */
export function exchangeToMarkdown(exchange: ExchangeRecord): string {
  const title = exchange.name?.trim() || 'Exchange'
  const lines: string[] = []
  lines.push(`# ${title}`)
  lines.push('')
  lines.push(`**Exported:** ${new Date().toISOString()}`)
  lines.push('')

  const detailRows: [string, string][] = []
  if (exchange.url?.trim()) detailRows.push(['URL', exchange.url.trim()])
  if (exchange.email?.trim()) detailRows.push(['Email', exchange.email.trim()])
  if (exchange.referralCode?.trim()) detailRows.push(['Referral code', exchange.referralCode.trim()])
  if (exchange.referralUrl?.trim()) detailRows.push(['Referral URL', exchange.referralUrl.trim()])
  for (const [label, value] of detailRows) {
    lines.push(`- **${label}:** ${mdEscapeCell(value)}`)
  }

  lines.push('')
  lines.push('## Currencies')
  lines.push('')
  if (exchange.currencies.length === 0) {
    lines.push('_No currencies configured._')
  } else {
    lines.push('| Name | Abbreviation | Address |')
    lines.push('|------|--------------|---------|')
    for (const c of exchange.currencies) {
      lines.push(
        `| ${mdEscapeCell(c.name)} | ${mdEscapeCell(c.abbreviation)} | ${mdEscapeCell(c.address)} |`,
      )
    }
  }

  if (exchange.notes?.trim()) {
    lines.push('')
    lines.push('## Notes')
    lines.push('')
    lines.push(exchange.notes.trim())
  }

  lines.push('')
  return lines.join('\n')
}

/** Download exchange currencies + metadata as CSV. */
export function exportExchangeCsv(exchange: ExchangeRecord): void {
  try {
    const filename = buildExchangeTextFilename(exchange, 'currencies', 'csv')
    const body = exchangeToCsv(exchange)
    downloadBlob(filename, new Blob([body], { type: 'text/csv;charset=utf-8' }))
  } catch (e) {
    console.error('Exchange CSV export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export exchange CSV.')
  }
}

/** Download a vCard 3.0 representation of the exchange as `.vcf`. */
export function exportExchangeVcf(exchange: ExchangeRecord): void {
  try {
    const filename = buildExchangeTextFilename(exchange, 'vcard', 'vcf')
    const body = exchangeToVCard(exchange)
    downloadBlob(filename, new Blob([body], { type: 'text/vcard;charset=utf-8' }))
  } catch (e) {
    console.error('Exchange VCF export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export exchange vCard.')
  }
}

/** Download the exchange record as pretty-printed JSON. */
export function exportExchangeJson(exchange: ExchangeRecord): void {
  try {
    const filename = buildExchangeTextFilename(exchange, 'record', 'json')
    const body = exchangeToJson(exchange)
    downloadBlob(filename, new Blob([body], { type: 'application/json' }))
  } catch (e) {
    console.error('Exchange JSON export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export exchange JSON.')
  }
}

/** Download a Markdown summary of the exchange. */
export function exportExchangeMd(exchange: ExchangeRecord): void {
  try {
    const filename = buildExchangeTextFilename(exchange, 'record', 'md')
    const body = exchangeToMarkdown(exchange)
    downloadBlob(filename, new Blob([body], { type: 'text/markdown;charset=utf-8' }))
  } catch (e) {
    console.error('Exchange Markdown export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export exchange Markdown.')
  }
}

export default {
  exchangeToCsv,
  exchangeToJson,
  exchangeToMarkdown,
  exportExchangeCsv,
  exportExchangeVcf,
  exportExchangeJson,
  exportExchangeMd,
}
