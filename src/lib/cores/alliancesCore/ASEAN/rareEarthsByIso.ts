import type { AseanMemberIsoCode } from './aseanMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for ASEAN member states. Notable entries: Malaysia (Lynas refined REE separation plant),
 * Myanmar (significant heavy-REE / ion-adsorption clay production routed via Yunnan border trade),
 * Vietnam (Nam Xe / Dong Pao / Yen Phu) and Thailand (monazite from tin tailings). Other ASEAN
 * states are empty (informational; verify periodically).
 */
export const ASEAN_RARE_EARTHS: Record<AseanMemberIsoCode, RareEarths> = {
  BN: [],
  KH: [],
  ID: [],
  LA: [],
  MY: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Dysprosium (Dy)',
    'Terbium (Tb)',
  ],
  MM: [
    'Yttrium (Y)',
    'Dysprosium (Dy)',
    'Terbium (Tb)',
    'Holmium (Ho)',
    'Erbium (Er)',
  ],
  PH: [],
  SG: [],
  TH: ['Cerium (Ce)', 'Lanthanum (La)', 'Neodymium (Nd)'],
  TL: [],
  VN: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Yttrium (Y)',
  ],
}
