/** G7 members represented in this module (7). */
export const G7_MEMBER_ISO_CODES = ['CA', 'FR', 'DE', 'IT', 'JP', 'GB', 'US'] as const

export type G7MemberIsoCode = (typeof G7_MEMBER_ISO_CODES)[number]
