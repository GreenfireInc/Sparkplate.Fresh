/** Five Eyes members represented in this module (5). */
export const FIVE_EYES_MEMBER_ISO_CODES = ['AU', 'CA', 'NZ', 'GB', 'US'] as const

export type FiveEyesMemberIsoCode = (typeof FIVE_EYES_MEMBER_ISO_CODES)[number]
