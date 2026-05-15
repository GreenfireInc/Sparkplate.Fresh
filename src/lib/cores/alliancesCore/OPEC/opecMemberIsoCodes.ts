/** OPEC members represented in this module (12). */
export const OPEC_MEMBER_ISO_CODES = [
  'DZ',
  'CG',
  'GQ',
  'GA',
  'IR',
  'IQ',
  'KW',
  'LY',
  'NG',
  'SA',
  'AE',
  'VE',
] as const

export type OpecMemberIsoCode = (typeof OPEC_MEMBER_ISO_CODES)[number]
