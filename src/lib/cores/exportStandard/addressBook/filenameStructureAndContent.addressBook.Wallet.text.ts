/**
 * AddressBook → Wallet text-format exports (CSV / VCF / JSON / MD)
 *
 * Sibling to `filenameStructureAndContent.addressBook.Wallet.qrCode.ts` and the
 * exact analogue of the Exchange text exporter. Uses the same fully
 * dot-separated filename pattern:
 *
 *   %projectName%.%date%.%time%.addressbook.wallet.%walletName%.%entry%.%ext%
 *
 * Where `entry` describes the payload (`currencies` for CSV, `vcard` for VCF,
 * `record` for JSON / Markdown). Mirrors the QR exports so a single wallet's
 * exports group naturally when sorted by name.
 */

import packageJson from '../../../../../package.json'
import type { StandaloneWalletRecord } from '@/services/addressBook/service.addressBook.StandaloneWallet'
import { walletToVCard } from '@/lib/cores/exportStandard/addressBook/filenameStructureAndContent.addressBook.Wallet.qrCode'

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

/**
 * Filename-safe target segment derived from the wallet's display name.
 *
 * `wallet.name` is conventionally a composite label of the form
 * `<brand> · <mnemonic-hint> · <id-or-count>` (see `matchedWalletOption` in
 * `modal.details.Wallet.vue`). For filenames we only want the brand head —
 * matching the modal's visible title and avoiding noisy `___metadata___`
 * runs created by sanitizing the ` · ` separators.
 */
function walletFilenameTarget(wallet: StandaloneWalletRecord): string {
  const raw = wallet.name?.trim() || `wallet_${wallet.id}`
  const head = raw.split(' · ')[0]?.trim() || raw
  return head.replace(/[^a-zA-Z0-9_]/g, '_') || 'wallet'
}

/**
 * Build the dot-separated filename:
 *   %projectName%.%YYYYMMDD%.%HHMMSS%.addressbook.wallet.%target%.%ext%
 *
 * The payload kind is intentionally encoded only in the file extension
 * (`.csv` / `.vcf` / `.json` / `.md`) — no `entry` segment — so a wallet's
 * exports look like `...addressbook.wallet.MetaMask.json` rather than
 * `...addressbook.wallet.MetaMask.record.json`.
 */
function buildWalletTextFilename(
  wallet: StandaloneWalletRecord,
  extension: string,
  date: Date = new Date(),
): string {
  const projectName = sanitizeForFilename(PACKAGE_PROJECT_NAME) || 'app'
  const target = walletFilenameTarget(wallet)
  const safeExt = sanitizeForFilename(extension) || 'txt'
  return [
    projectName,
    formatDateYYYYMMDD(date),
    formatTimeHHMMSS(date),
    'addressbook',
    'wallet',
    target,
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
 * CSV content: a wallet-info preamble (commented `#` lines, ignored by most
 * CSV consumers) followed by a currencies table. Falls back to a single empty
 * row when the wallet has no currencies configured.
 */
export function walletToCsv(wallet: StandaloneWalletRecord): string {
  const preamble: string[] = []
  preamble.push(`# Wallet: ${wallet.name ?? ''}`)
  if (wallet.mnemonicWordCount != null) preamble.push(`# Mnemonic length: ${wallet.mnemonicWordCount}`)
  if (wallet.mnemonicFirst) preamble.push(`# Mnemonic first: ${wallet.mnemonicFirst}`)
  if (wallet.mnemonicLast) preamble.push(`# Mnemonic last: ${wallet.mnemonicLast}`)
  if (wallet.passwordHint) preamble.push(`# Password hint: ${wallet.passwordHint}`)
  if (wallet.notes?.trim()) preamble.push(`# Notes: ${wallet.notes.replace(/\r?\n/g, ' ')}`)

  const headers = ['Name', 'Abbreviation', 'Address']
  const rows: string[] = [headers.join(',')]
  if (wallet.currencies.length === 0) {
    rows.push([csvEscape(''), csvEscape(''), csvEscape('')].join(','))
  } else {
    for (const c of wallet.currencies) {
      rows.push([csvEscape(c.name), csvEscape(c.abbreviation), csvEscape(c.address)].join(','))
    }
  }
  return `${preamble.join('\n')}\n${rows.join('\n')}\n`
}

/* JSON content: pretty-printed wallet record + export timestamp. */
export function walletToJson(wallet: StandaloneWalletRecord): string {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      wallet,
    },
    null,
    2,
  )
}

/**
 * Markdown content: title (wallet name), metadata bullet list, currencies
 * table, and an optional notes section. Mnemonic / password hints are
 * surfaced in the metadata block to mirror what's shown in the modal.
 */
export function walletToMarkdown(wallet: StandaloneWalletRecord): string {
  const title = wallet.name?.trim() || 'Wallet'
  const lines: string[] = []
  lines.push(`# ${title}`)
  lines.push('')
  lines.push(`**Exported:** ${new Date().toISOString()}`)
  lines.push('')

  const detailRows: [string, string][] = []
  if (wallet.mnemonicWordCount != null)
    detailRows.push(['Mnemonic length', String(wallet.mnemonicWordCount)])
  if (wallet.mnemonicFirst?.trim()) detailRows.push(['Mnemonic first', wallet.mnemonicFirst.trim()])
  if (wallet.mnemonicLast?.trim()) detailRows.push(['Mnemonic last', wallet.mnemonicLast.trim()])
  if (wallet.passwordHint?.trim()) detailRows.push(['Password hint', wallet.passwordHint.trim()])
  for (const [label, value] of detailRows) {
    lines.push(`- **${label}:** ${mdEscapeCell(value)}`)
  }

  lines.push('')
  lines.push('## Currencies')
  lines.push('')
  if (wallet.currencies.length === 0) {
    lines.push('_No currencies configured._')
  } else {
    lines.push('| Name | Abbreviation | Address |')
    lines.push('|------|--------------|---------|')
    for (const c of wallet.currencies) {
      lines.push(
        `| ${mdEscapeCell(c.name)} | ${mdEscapeCell(c.abbreviation)} | ${mdEscapeCell(c.address)} |`,
      )
    }
  }

  if (wallet.notes?.trim()) {
    lines.push('')
    lines.push('## Notes')
    lines.push('')
    lines.push(wallet.notes.trim())
  }

  lines.push('')
  return lines.join('\n')
}

/** Download wallet currencies + metadata as CSV. */
export function exportWalletCsv(wallet: StandaloneWalletRecord): void {
  try {
    const filename = buildWalletTextFilename(wallet, 'csv')
    const body = walletToCsv(wallet)
    downloadBlob(filename, new Blob([body], { type: 'text/csv;charset=utf-8' }))
  } catch (e) {
    console.error('Wallet CSV export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export wallet CSV.')
  }
}

/** Download a vCard 3.0 representation of the wallet as `.vcf`. */
export function exportWalletVcf(wallet: StandaloneWalletRecord): void {
  try {
    const filename = buildWalletTextFilename(wallet, 'vcf')
    const body = walletToVCard(wallet)
    downloadBlob(filename, new Blob([body], { type: 'text/vcard;charset=utf-8' }))
  } catch (e) {
    console.error('Wallet VCF export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export wallet vCard.')
  }
}

/** Download the wallet record as pretty-printed JSON. */
export function exportWalletJson(wallet: StandaloneWalletRecord): void {
  try {
    const filename = buildWalletTextFilename(wallet, 'json')
    const body = walletToJson(wallet)
    downloadBlob(filename, new Blob([body], { type: 'application/json' }))
  } catch (e) {
    console.error('Wallet JSON export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export wallet JSON.')
  }
}

/** Download a Markdown summary of the wallet. */
export function exportWalletMd(wallet: StandaloneWalletRecord): void {
  try {
    const filename = buildWalletTextFilename(wallet, 'md')
    const body = walletToMarkdown(wallet)
    downloadBlob(filename, new Blob([body], { type: 'text/markdown;charset=utf-8' }))
  } catch (e) {
    console.error('Wallet Markdown export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export wallet Markdown.')
  }
}

export default {
  walletToCsv,
  walletToJson,
  walletToMarkdown,
  exportWalletCsv,
  exportWalletVcf,
  exportWalletJson,
  exportWalletMd,
}
