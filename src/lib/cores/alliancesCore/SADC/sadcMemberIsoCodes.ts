/** SADC members represented in this module (16). */
export const SADC_MEMBER_ISO_CODES = [
  'AO',
  'BW',
  'KM',
  'CD',
  'SZ',
  'LS',
  'MG',
  'MW',
  'MU',
  'MZ',
  'NA',
  'SC',
  'ZA',
  'TZ',
  'ZM',
  'ZW',
] as const

export type SadcMemberIsoCode = (typeof SADC_MEMBER_ISO_CODES)[number]
