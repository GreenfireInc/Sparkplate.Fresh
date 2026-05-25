import type { ComesaMemberIsoCode } from './comesaMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for COMESA (Common Market for Eastern and Southern Africa) members. Notable entries:
 *  - Egypt (EG): Rosetta-coast monazite black-sand operations producing Nd, Ce, La, Y.
 * Other COMESA members host REE exploration / advanced projects (Kangankunde in Malawi,
 * Mrima Hill in Kenya, Wigu Hill in Tanzania-adjacent, Songwe in Malawi, etc.) but no
 * sustained commercial-scale REE separation today (informational; verify periodically).
 */
export const COMESA_RARE_EARTHS: Record<ComesaMemberIsoCode, RareEarths> = {
  DJ: [],
  EG: [
    'Neodymium (Nd)',
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Yttrium (Y)',
  ],
  ER: [],
  ET: [],
  LY: [],
  SD: [],
  TN: [],
  KM: [],
  MG: [],
  MU: [],
  SC: [],
  BI: [],
  KE: [],
  MW: [],
  RW: [],
  UG: [],
  SZ: [],
  ZM: [],
  ZW: [],
  CD: [],
}
