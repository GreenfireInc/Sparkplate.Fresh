/** MINT members represented in this module (4). */
export const MINT_MEMBER_ISO_CODES = ['MX', 'ID', 'NG', 'TR'] as const

export type MintMemberIsoCode = (typeof MINT_MEMBER_ISO_CODES)[number]
