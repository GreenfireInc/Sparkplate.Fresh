/** G20 sovereign members represented in this module (19). */
export const G20_SOVEREIGN_MEMBER_ISO_CODES = [
  'AR',
  'AU',
  'BR',
  'CA',
  'CN',
  'FR',
  'DE',
  'IN',
  'ID',
  'IT',
  'JP',
  'MX',
  'RU',
  'SA',
  'ZA',
  'KR',
  'TR',
  'GB',
  'US',
] as const

export type G20SovereignMemberIsoCode = (typeof G20_SOVEREIGN_MEMBER_ISO_CODES)[number]
