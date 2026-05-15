/**
 * Canonical ISO 3166-1 alpha-2 codes for Alliance of Sahel States (AES) founding members
 * represented in this module (Burkina Faso, Mali, Niger).
 */
export const AES_MEMBER_ISO_CODES = ['ML', 'NE', 'BF'] as const

export type AesMemberIsoCode = (typeof AES_MEMBER_ISO_CODES)[number]
