import type { ApecMemberIsoCode } from './apecMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for APEC member economies. Entries reflect commercial mining or downstream refining /
 * separation exports as of authoring (e.g. Lynas's Malaysian separation plant exports refined
 * REE products even though concentrate is sourced from Mt Weld, Australia). Empty tuples
 * indicate no documented commercial-scale REE exports (informational; verify periodically).
 */
export const APEC_RARE_EARTHS: Record<ApecMemberIsoCode, RareEarths> = {
  AU: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Dysprosium (Dy)',
  ],
  BN: [],
  CA: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Lanthanum (La)',
    'Cerium (Ce)',
    'Dysprosium (Dy)',
  ],
  CL: [],
  CN: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Dysprosium (Dy)',
    'Terbium (Tb)',
    'Yttrium (Y)',
    'Samarium (Sm)',
  ],
  HK: [],
  ID: [],
  JP: [],
  MY: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Dysprosium (Dy)',
    'Terbium (Tb)',
  ],
  MX: [],
  NZ: [],
  PG: [],
  PE: [],
  PH: [],
  RU: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Yttrium (Y)',
  ],
  SG: [],
  KR: [],
  TW: [],
  TH: ['Cerium (Ce)', 'Lanthanum (La)', 'Neodymium (Nd)'],
  US: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Samarium (Sm)',
  ],
  VN: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Yttrium (Y)',
  ],
}
