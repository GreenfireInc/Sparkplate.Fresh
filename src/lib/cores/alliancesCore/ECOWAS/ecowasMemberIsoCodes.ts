/** ECOWAS member states represented in this module (12). */
export const ECOWAS_MEMBER_ISO_CODES = [
  'BJ',
  'CV',
  'GM',
  'GH',
  'GN',
  'GW',
  'CI',
  'LR',
  'NG',
  'SN',
  'SL',
  'TG',
] as const

export type EcowasMemberIsoCode = (typeof ECOWAS_MEMBER_ISO_CODES)[number]
