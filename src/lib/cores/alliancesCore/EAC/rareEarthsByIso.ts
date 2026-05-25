import type { EacMemberIsoCode } from './eacMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for EAC (East African Community) partner states. No EAC partner state currently runs
 * sustained commercial-scale REE mining or separation: Mrima Hill (KE), Wigu Hill / Ngualla
 * (TZ), Sukulu (UG) and other carbonatite-hosted resources host advanced exploration but
 * remain pre-commercial. All entries empty (informational; verify periodically).
 */
export const EAC_RARE_EARTHS: Record<EacMemberIsoCode, RareEarths> = {
  BI: [],
  CD: [],
  KE: [],
  RW: [],
  SO: [],
  SS: [],
  TZ: [],
  UG: [],
}
