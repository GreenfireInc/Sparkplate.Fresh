/** CARICOM full members represented in this module (15). */
export const CARICOM_FULL_MEMBER_ISO_CODES = [
  'AG',
  'BS',
  'BB',
  'BZ',
  'DM',
  'GD',
  'GY',
  'HT',
  'JM',
  'MS',
  'KN',
  'LC',
  'VC',
  'SR',
  'TT',
] as const

/** CARICOM associate members represented in this module (5). */
export const CARICOM_ASSOCIATE_MEMBER_ISO_CODES = ['AI', 'BM', 'VG', 'KY', 'TC'] as const

export const CARICOM_MEMBER_ISO_CODES = [
  ...CARICOM_FULL_MEMBER_ISO_CODES,
  ...CARICOM_ASSOCIATE_MEMBER_ISO_CODES,
] as const

export type CaricomMemberIsoCode = (typeof CARICOM_MEMBER_ISO_CODES)[number]
