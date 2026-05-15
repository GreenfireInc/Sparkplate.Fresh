/** OECS members represented in this module (8 — module roster order). */
export const OECS_MEMBER_ISO_CODES = ['AG', 'DM', 'GD', 'MS', 'KN', 'LC', 'VC', 'AI'] as const

export type OecsMemberIsoCode = (typeof OECS_MEMBER_ISO_CODES)[number]
