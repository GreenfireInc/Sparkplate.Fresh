/** IGAD members represented in this module (7). */
export const IGAD_MEMBER_ISO_CODES = ['DJ', 'ET', 'SO', 'SS', 'SD', 'KE', 'UG'] as const

export type IgadMemberIsoCode = (typeof IGAD_MEMBER_ISO_CODES)[number]
