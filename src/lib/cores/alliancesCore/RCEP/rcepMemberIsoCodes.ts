/** RCEP parties represented in this module (15). */
export const RCEP_MEMBER_ISO_CODES = [
  'AU',
  'BN',
  'KH',
  'CN',
  'ID',
  'JP',
  'KR',
  'LA',
  'MY',
  'MM',
  'NZ',
  'PH',
  'SG',
  'TH',
  'VN',
] as const

export type RcepMemberIsoCode = (typeof RCEP_MEMBER_ISO_CODES)[number]
