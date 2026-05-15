/** ECCAS partner states represented in this module (10). */
export const ECCAS_MEMBER_ISO_CODES = [
  'AO',
  'BI',
  'CM',
  'CF',
  'TD',
  'CD',
  'GQ',
  'GA',
  'CG',
  'ST',
] as const

export type EccasMemberIsoCode = (typeof ECCAS_MEMBER_ISO_CODES)[number]
