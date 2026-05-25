import type { AmuMemberIsoCode } from './amuMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for AMU member states. None of the five AMU founding economies have commercial-scale REE
 * production as of authoring; Algeria and Morocco have phosphate co-product REE potential
 * under study (informational; verify periodically).
 */
export const AMU_RARE_EARTHS: Record<AmuMemberIsoCode, RareEarths> = {
  DZ: [],
  LY: [],
  MR: [],
  MA: [],
  TN: [],
}
