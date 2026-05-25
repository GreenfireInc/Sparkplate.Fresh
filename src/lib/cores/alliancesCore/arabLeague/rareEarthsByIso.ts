import type { ArabLeagueMemberIsoCode } from './arabLeagueMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for League of Arab States members. Egypt's monazite-bearing black sands are the only
 * commercial-scale REE source in the league as of authoring; Saudi Arabia and Algeria have
 * exploration-stage / phosphate co-product REE potential (informational; verify periodically).
 */
export const ARAB_LEAGUE_RARE_EARTHS: Record<ArabLeagueMemberIsoCode, RareEarths> = {
  DZ: [],
  BH: [],
  KM: [],
  DJ: [],
  EG: ['Neodymium (Nd)', 'Cerium (Ce)', 'Lanthanum (La)', 'Yttrium (Y)'],
  IQ: [],
  JO: [],
  KW: [],
  LB: [],
  LY: [],
  MR: [],
  MA: [],
  OM: [],
  PS: [],
  QA: [],
  SA: [],
  SO: [],
  SD: [],
  SY: [],
  TN: [],
  AE: [],
  YE: [],
}
