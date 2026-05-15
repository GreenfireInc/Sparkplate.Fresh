/**
 * Canonical ISO 3166-1 alpha-2 codes for APEC member economies represented in this module (21).
 * APEC economies include Hong Kong (HK) and Chinese Taipei (TW), which follow APEC's "economy"
 * nomenclature rather than sovereign-state taxonomy — informational.
 */
export const APEC_MEMBER_ISO_CODES = [
  'AU',
  'BN',
  'CA',
  'CL',
  'CN',
  'HK',
  'ID',
  'JP',
  'MY',
  'MX',
  'NZ',
  'PG',
  'PE',
  'PH',
  'RU',
  'SG',
  'KR',
  'TW',
  'TH',
  'US',
  'VN',
] as const

export type ApecMemberIsoCode = (typeof APEC_MEMBER_ISO_CODES)[number]
