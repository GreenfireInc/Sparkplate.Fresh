/**
 * Canonical ISO 3166-1 alpha-2 codes for ASEAN entries represented in this module (11).
 * Timor-Leste (TL) is included as a near-accession entry per recent ASEAN Summit decisions — verify
 * de jure full membership status against latest communiqués for production use.
 */
export const ASEAN_MEMBER_ISO_CODES = [
  'BN',
  'KH',
  'ID',
  'LA',
  'MY',
  'MM',
  'PH',
  'SG',
  'TH',
  'TL',
  'VN',
] as const

export type AseanMemberIsoCode = (typeof ASEAN_MEMBER_ISO_CODES)[number]
