/**
 * Canonical ISO 3166-1 alpha-2 codes for BRICS founding members represented in this module (5).
 * Original BRIC quartet (BR, RU, IN, CN) plus South Africa (ZA) from 2011 Sanya Summit.
 * Recent expansion rounds are tracked separately in the organisation info on `index.ts` — verify.
 */
export const BRICS_MEMBER_ISO_CODES = ['BR', 'RU', 'IN', 'CN', 'ZA'] as const

export type BricsMemberIsoCode = (typeof BRICS_MEMBER_ISO_CODES)[number]
