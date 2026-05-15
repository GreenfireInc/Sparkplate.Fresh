/** GCC members represented in this module (6). */
export const GCC_MEMBER_ISO_CODES = ['BH', 'KW', 'OM', 'QA', 'SA', 'AE'] as const

export type GccMemberIsoCode = (typeof GCC_MEMBER_ISO_CODES)[number]
