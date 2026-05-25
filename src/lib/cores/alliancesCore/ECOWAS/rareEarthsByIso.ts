import type { EcowasMemberIsoCode } from './ecowasMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for ECOWAS (Economic Community of West African States) members. No ECOWAS member currently
 * runs commercial-scale REE mining or separation; coastal heavy-mineral sands (SN, GM, SL)
 * yield REE-bearing monazite as a minor zircon / rutile byproduct only. All entries empty
 * (informational; verify periodically).
 */
export const ECOWAS_RARE_EARTHS: Record<EcowasMemberIsoCode, RareEarths> = {
  BJ: [],
  CV: [],
  GM: [],
  GH: [],
  GN: [],
  GW: [],
  CI: [],
  LR: [],
  NG: [],
  SN: [],
  SL: [],
  TG: [],
}
