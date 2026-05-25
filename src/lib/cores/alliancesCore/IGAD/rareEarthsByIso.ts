import type { IgadMemberIsoCode } from './igadMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for IGAD members. No IGAD member currently has commercial-scale primary REE mining or
 * lanthanide-separation exports.
 *  - Kenya (KE): Mrima Hill carbonatite (Cortec / Pacific Wildcat Resources) — significant
 *    Nb-REE prospect; licence history disputed and currently pre-commercial (informational).
 *  - Uganda (UG): Makuutu Rare Earths (Ionic Rare Earths / Rwenzori Rare Metals) — ionic-clay
 *    project advancing through feasibility; pre-commercial (informational).
 *  - Ethiopia (ET) and Sudan (SD): carbonatite occurrences noted in geological surveys; no
 *    commercial REE production.
 * Informational; verify periodically.
 */
export const IGAD_RARE_EARTHS: Record<IgadMemberIsoCode, RareEarths> = {
  DJ: [],
  ET: [],
  SO: [],
  SS: [],
  SD: [],
  KE: [],
  UG: [],
}
