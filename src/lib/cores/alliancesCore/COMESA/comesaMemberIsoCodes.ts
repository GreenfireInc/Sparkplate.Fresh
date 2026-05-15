/** COMESA members represented in this module (20). */
export const COMESA_MEMBER_ISO_CODES = [
  'DJ',
  'EG',
  'ER',
  'ET',
  'LY',
  'SD',
  'TN',
  'KM',
  'MG',
  'MU',
  'SC',
  'BI',
  'KE',
  'MW',
  'RW',
  'UG',
  'SZ',
  'ZM',
  'ZW',
  'CD',
] as const

export type ComesaMemberIsoCode = (typeof COMESA_MEMBER_ISO_CODES)[number]
