/**
 * Canonical ISO 3166-1 alpha-2 codes for League of Arab States members represented in this module (22).
 * Membership and suspensions evolve — verify against official Arab League communiqués for production use.
 */
export const ARAB_LEAGUE_MEMBER_ISO_CODES = [
  'DZ',
  'BH',
  'KM',
  'DJ',
  'EG',
  'IQ',
  'JO',
  'KW',
  'LB',
  'LY',
  'MR',
  'MA',
  'OM',
  'PS',
  'QA',
  'SA',
  'SO',
  'SD',
  'SY',
  'TN',
  'AE',
  'YE',
] as const

export type ArabLeagueMemberIsoCode = (typeof ARAB_LEAGUE_MEMBER_ISO_CODES)[number]
