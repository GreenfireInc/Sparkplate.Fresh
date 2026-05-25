import type { AesMemberIsoCode } from './aesMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for AES member states. Entries reflect commercial or near-commercial-stage production /
 * off-take agreements. Empty tuples indicate no documented commercial-scale REE exports as of
 * authoring (informational; verify periodically).
 */
export const AES_RARE_EARTHS: Record<AesMemberIsoCode, RareEarths> = {
  BF: [],
  ML: [],
  NE: [],
}
