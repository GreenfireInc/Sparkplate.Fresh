/**
 * Canonical ISO 3166-1 alpha-2 codes for Arab Maghreb Union (AMU / UMA) founding members
 * represented in this module (Algeria, Libya, Mauritania, Morocco, Tunisia).
 */
export const AMU_MEMBER_ISO_CODES = ['DZ', 'LY', 'MR', 'MA', 'TN'] as const

export type AmuMemberIsoCode = (typeof AMU_MEMBER_ISO_CODES)[number]
