import type { CensadMemberIsoCode } from './censadMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for CEN-SAD (Community of Sahel-Saharan States) members. Notable entries:
 *  - Egypt (EG): Rosetta-coast monazite black-sand operations producing Nd, Ce, La, Y.
 * Other CEN-SAD members do not currently run commercial-scale REE mining or separation
 * (Niger / Mauritania / Mali host exploration targets; verify periodically).
 */
export const CENSAD_RARE_EARTHS: Record<CensadMemberIsoCode, RareEarths> = {
  BJ: [],
  BF: [],
  CF: [],
  TD: [],
  KM: [],
  DJ: [],
  EG: [
    'Neodymium (Nd)',
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Yttrium (Y)',
  ],
  ER: [],
  GM: [],
  GH: [],
  GN: [],
  GW: [],
  CI: [],
  LY: [],
  ML: [],
  MR: [],
  MA: [],
  NE: [],
  NG: [],
  SN: [],
  SL: [],
  SO: [],
  SD: [],
  TG: [],
  TN: [],
}
