/** MIKTA members represented in this module (5). */
export const MIKTA_MEMBER_ISO_CODES = ['MX', 'ID', 'KR', 'TR', 'AU'] as const

export type MiktaMemberIsoCode = (typeof MIKTA_MEMBER_ISO_CODES)[number]
