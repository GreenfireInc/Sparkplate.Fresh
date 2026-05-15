/** IORA members represented in this module (23). */
export const IORA_MEMBER_ISO_CODES = [
  'AU',
  'BD',
  'KM',
  'FR',
  'IN',
  'ID',
  'IR',
  'KE',
  'MG',
  'MY',
  'MV',
  'MU',
  'MZ',
  'OM',
  'SC',
  'SG',
  'SO',
  'ZA',
  'LK',
  'TZ',
  'TH',
  'AE',
  'YE',
] as const

export type IoraMemberIsoCode = (typeof IORA_MEMBER_ISO_CODES)[number]
