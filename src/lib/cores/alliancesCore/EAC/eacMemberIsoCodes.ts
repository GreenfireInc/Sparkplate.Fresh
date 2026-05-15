/** EAC partner states represented in this module (8). */
export const EAC_MEMBER_ISO_CODES = ['BI', 'CD', 'KE', 'RW', 'SO', 'SS', 'TZ', 'UG'] as const

export type EacMemberIsoCode = (typeof EAC_MEMBER_ISO_CODES)[number]
