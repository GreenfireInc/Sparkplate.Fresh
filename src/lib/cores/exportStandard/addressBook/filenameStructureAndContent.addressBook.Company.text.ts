/**
 * AddressBook → Company text-format exports (CSV / VCF / JSON / MD)
 *
 * Sibling to `filenameStructureAndContent.addressBook.Company.qrCode.ts`. Uses
 * the same fully dot-separated filename pattern:
 *
 *   %projectName%.%date%.%time%.addressbook.company.%companyName%.%entry%.%ext%
 *
 * Where `entry` describes the payload (`summary` for CSV, `vcard` for VCF,
 * `record` for JSON / Markdown). The pattern matches the company QR exports so
 * a single company's exports group naturally when sorted by name.
 */

import packageJson from '../../../../../package.json'
import type { Company } from '@/services/addressBook/service.addressBook.Company'
import { companyToVCard } from '@/lib/cores/exportStandard/addressBook/filenameStructureAndContent.addressBook.Company.qrCode'

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

function companyFilenameTarget(company: Company): string {
  return (company.name || `company_${company.id}`).replace(/[^a-zA-Z0-9_]/g, '_') || 'company'
}

/**
 * Build the dot-separated filename:
 *   %projectName%.%YYYYMMDD%.%HHMMSS%.addressbook.company.%target%.%entry%.%ext%
 */
function buildCompanyTextFilename(
  company: Company,
  entry: string,
  extension: string,
  date: Date = new Date(),
): string {
  const projectName = sanitizeForFilename(PACKAGE_PROJECT_NAME) || 'app'
  const target = companyFilenameTarget(company)
  const safeEntry = sanitizeForFilename(entry) || 'record'
  const safeExt = sanitizeForFilename(extension) || 'txt'
  return [
    projectName,
    formatDateYYYYMMDD(date),
    formatTimeHHMMSS(date),
    'addressbook',
    'company',
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
 * CSV content: a company-info preamble (commented `#` lines, ignored by most
 * CSV consumers) followed by a single-row summary table. The aggregated
 * `Company` shape only carries one (primary) currency address; per-contact
 * wallet detail lives in the contact / wallet exports.
 */
export function companyToCsv(company: Company): string {
  const preamble: string[] = []
  preamble.push(`# Company: ${company.name ?? ''}`)
  if (company.mainContact?.trim()) preamble.push(`# Main contact: ${company.mainContact.trim()}`)
  if (company.position?.trim()) preamble.push(`# Position: ${company.position.trim()}`)
  if (company.email?.trim()) preamble.push(`# Email: ${company.email.trim()}`)
  preamble.push(`# Currencies on file: ${company.numCurrencies}`)

  const headers = ['Company', 'Main contact', 'Position', 'Email', 'Num currencies', 'Primary address']
  const rows: string[] = [headers.join(',')]
  rows.push(
    [
      csvEscape(company.name),
      csvEscape(company.mainContact),
      csvEscape(company.position),
      csvEscape(company.email),
      csvEscape(company.numCurrencies),
      csvEscape(company.mainCurrencyAddress),
    ].join(','),
  )
  return `${preamble.join('\n')}\n${rows.join('\n')}\n`
}

/** JSON content: pretty-printed company record + export timestamp. */
export function companyToJson(company: Company): string {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      company,
    },
    null,
    2,
  )
}

/**
 * Markdown content: title (company name), metadata bullet list, and a single
 * "Primary address" callout (or a placeholder when none is configured).
 */
export function companyToMarkdown(company: Company): string {
  const title = company.name?.trim() || 'Company'
  const lines: string[] = []
  lines.push(`# ${title}`)
  lines.push('')
  lines.push(`**Exported:** ${new Date().toISOString()}`)
  lines.push('')

  const detailRows: [string, string][] = []
  if (company.mainContact?.trim()) detailRows.push(['Main contact', company.mainContact.trim()])
  if (company.position?.trim()) detailRows.push(['Position', company.position.trim()])
  if (company.email?.trim()) detailRows.push(['Email', company.email.trim()])
  detailRows.push(['Currencies on file', String(company.numCurrencies)])
  for (const [label, value] of detailRows) {
    lines.push(`- **${label}:** ${mdEscapeCell(value)}`)
  }

  lines.push('')
  lines.push('## Primary address')
  lines.push('')
  if (company.mainCurrencyAddress) {
    lines.push('| Address |')
    lines.push('|---------|')
    lines.push(`| ${mdEscapeCell(company.mainCurrencyAddress)} |`)
  } else {
    lines.push('_No primary currency address configured._')
  }

  lines.push('')
  return lines.join('\n')
}

/** Download company summary + metadata as CSV. */
export function exportCompanyCsv(company: Company): void {
  try {
    const filename = buildCompanyTextFilename(company, 'summary', 'csv')
    const body = companyToCsv(company)
    downloadBlob(filename, new Blob([body], { type: 'text/csv;charset=utf-8' }))
  } catch (e) {
    console.error('Company CSV export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export company CSV.')
  }
}

/** Download a vCard 3.0 representation of the company as `.vcf`. */
export function exportCompanyVcf(company: Company): void {
  try {
    const filename = buildCompanyTextFilename(company, 'vcard', 'vcf')
    const body = companyToVCard(company)
    downloadBlob(filename, new Blob([body], { type: 'text/vcard;charset=utf-8' }))
  } catch (e) {
    console.error('Company VCF export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export company vCard.')
  }
}

/** Download the company record as pretty-printed JSON. */
export function exportCompanyJson(company: Company): void {
  try {
    const filename = buildCompanyTextFilename(company, 'record', 'json')
    const body = companyToJson(company)
    downloadBlob(filename, new Blob([body], { type: 'application/json' }))
  } catch (e) {
    console.error('Company JSON export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export company JSON.')
  }
}

/** Download a Markdown summary of the company. */
export function exportCompanyMd(company: Company): void {
  try {
    const filename = buildCompanyTextFilename(company, 'record', 'md')
    const body = companyToMarkdown(company)
    downloadBlob(filename, new Blob([body], { type: 'text/markdown;charset=utf-8' }))
  } catch (e) {
    console.error('Company Markdown export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export company Markdown.')
  }
}

export default {
  companyToCsv,
  companyToJson,
  companyToMarkdown,
  exportCompanyCsv,
  exportCompanyVcf,
  exportCompanyJson,
  exportCompanyMd,
}
