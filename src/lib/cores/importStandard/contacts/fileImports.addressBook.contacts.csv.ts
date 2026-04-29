/**
 * AddressBook → CSV contact import.
 *
 * Robust parser for the Google Contacts CSV export (and similar formats):
 * extracts firstname / lastname / email / phone / company / notes / website
 * across the various column-naming conventions Google and other tools use.
 *
 * Why a dedicated module (vs. inline parsing in `useContactParser.ts`):
 *
 *   - Google CSVs split each email/phone across two columns
 *     (`E-mail N - Type`, `E-mail N - Value`) and use 1-based column numbers
 *     that can go beyond 3 ("E-mail 4 - Value", etc.). The original inline
 *     parser only handled `E-mail 1/2/3 - Value` exactly, so any extra emails
 *     and any minor whitespace/BOM drift in the header silently dropped values.
 *   - Header normalization (BOM strip + trim) is brittle to do inline.
 *   - Phone fields have the same `Phone N - Value` shape as email and benefit
 *     from the same pattern-based collection.
 *
 * The parser returns plain objects matching the shape `AddressBook.vue`'s
 * `addContacts(rows)` consumes (`firstname`, `lastname`, `email`, `phone`,
 * `company`, `notes`, `website`).
 */

import Papa from 'papaparse'

export interface ImportedContact {
  firstname: string
  lastname: string
  email: string
  phone: string
  company: string
  notes: string
  website: string
  relationship?: string
  /** Optional `coinTicker://address, …` blob if the CSV carries wallet rows. */
  wallets?: string
}

/** Single-value header candidates per canonical contact field, in priority order. */
const HEADER_CANDIDATES = {
  firstname: ['First Name', 'FirstName', 'firstname', 'Given Name', 'givenname'],
  lastname: ['Last Name', 'LastName', 'lastname', 'Family Name', 'familyname'],
  company: [
    'Company',
    'company',
    'Organization 1 - Name',
    'Organization Name',
    'Organization',
    'organization',
  ],
  notes: ['Notes', 'notes', 'Note'],
  website: [
    'Website',
    'website',
    'Website 1 - Value',
    'URL',
    'url',
  ],
  relationship: ['Relationship', 'relationship'],
  wallets: ['Wallets', 'wallets'],
} as const

/**
 * Multi-value header patterns. Google-style numbered columns can repeat
 * arbitrarily many times (`E-mail 1/2/3/4… - Value`); we collect them all.
 */
const EMAIL_HEADER_PATTERNS: RegExp[] = [
  /^Email$/i,
  /^E-?mail$/i,
  /^E-?mail \d+ - Value$/i,
  /^E-?mail \d+ Value$/i,
  /^Email \d+$/i,
]

const PHONE_HEADER_PATTERNS: RegExp[] = [
  /^Phone$/i,
  /^Phone \d+ - Value$/i,
  /^Phone \d+ Value$/i,
  /^Phone Number$/i,
]

/** Strip UTF-8 BOM and trim — Papa's `transformHeader` runs this on every header. */
function normalizeHeader(raw: string): string {
  if (raw == null) return ''
  return String(raw).replace(/^\uFEFF/, '').trim()
}

function cellAsString(value: unknown): string {
  if (value == null) return ''
  return String(value).trim()
}

/** First non-empty value across the candidate header list. */
function pickFirstNonEmpty(
  row: Record<string, unknown>,
  candidates: readonly string[],
): string {
  for (const candidate of candidates) {
    const v = cellAsString(row[candidate])
    if (v !== '') return v
  }
  return ''
}

/** Every non-empty value whose header matches any of the supplied patterns. */
function collectByPatterns(
  row: Record<string, unknown>,
  patterns: readonly RegExp[],
): string[] {
  const out: string[] = []
  for (const [key, value] of Object.entries(row)) {
    const v = cellAsString(value)
    if (v === '') continue
    if (patterns.some((p) => p.test(key))) out.push(v)
  }
  return out
}

/** Build a single ImportedContact from one parsed CSV row. Null for rows with
 *  no useful identifying info (no name and no email). */
export function rowToContact(row: Record<string, unknown>): ImportedContact | null {
  const firstname = pickFirstNonEmpty(row, HEADER_CANDIDATES.firstname)
  const lastname = pickFirstNonEmpty(row, HEADER_CANDIDATES.lastname)
  const company = pickFirstNonEmpty(row, HEADER_CANDIDATES.company)
  const notes = pickFirstNonEmpty(row, HEADER_CANDIDATES.notes)
  const website = pickFirstNonEmpty(row, HEADER_CANDIDATES.website)
  const relationship = pickFirstNonEmpty(row, HEADER_CANDIDATES.relationship)
  const wallets = pickFirstNonEmpty(row, HEADER_CANDIDATES.wallets)

  const emails = collectByPatterns(row, EMAIL_HEADER_PATTERNS)
  const phones = collectByPatterns(row, PHONE_HEADER_PATTERNS)

  // Skip phantom rows with no name and no email (matches the legacy filter).
  // Phone-only rows tend to be Google's "no contact info" placeholders.
  if (!firstname && !lastname && emails.length === 0) return null

  return {
    firstname,
    lastname,
    email: emails.join(', '),
    phone: phones.join(', '),
    company,
    notes,
    website,
    ...(relationship ? { relationship } : {}),
    ...(wallets ? { wallets } : {}),
  }
}

/**
 * Parse a CSV `File` (or string) into an array of `ImportedContact`s. Uses
 * Papa Parse with `header: true` and greedy empty-line skipping so rows with
 * only commas are dropped before mapping.
 */
export async function parseContactsCsvFile(file: File | string): Promise<ImportedContact[]> {
  const text = typeof file === 'string' ? file : await file.text()

  return new Promise<ImportedContact[]>((resolve, reject) => {
    Papa.parse<Record<string, unknown>>(text, {
      header: true,
      skipEmptyLines: 'greedy',
      transformHeader: normalizeHeader,
      complete: (results) => {
        const out: ImportedContact[] = []
        for (const raw of results.data ?? []) {
          if (!raw || typeof raw !== 'object') continue
          const mapped = rowToContact(raw as Record<string, unknown>)
          if (mapped) out.push(mapped)
        }
        resolve(out)
      },
      error: (err: Error) => reject(err),
    })
  })
}

export default {
  parseContactsCsvFile,
  rowToContact,
}
