/** CPTPP parties represented in this module (12). */
export const CPTPP_MEMBER_ISO_CODES = [
  'AU',
  'BN',
  'CA',
  'CL',
  'JP',
  'MY',
  'MX',
  'NZ',
  'PE',
  'SG',
  'GB',
  'VN',
] as const

export type CptppMemberIsoCode = (typeof CPTPP_MEMBER_ISO_CODES)[number]
