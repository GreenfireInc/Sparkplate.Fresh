import type { OecsMemberIsoCode } from './oecsMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for OECS members. None of the Eastern Caribbean island microstates has commercial-scale
 * primary REE mining or lanthanide-separation exports. Informational; verify periodically.
 */
export const OECS_RARE_EARTHS: Record<OecsMemberIsoCode, RareEarths> = {
  AG: [],
  DM: [],
  GD: [],
  MS: [],
  KN: [],
  LC: [],
  VC: [],
  AI: [],
}
