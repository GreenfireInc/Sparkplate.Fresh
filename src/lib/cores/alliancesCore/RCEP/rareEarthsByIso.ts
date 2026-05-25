import type { RcepMemberIsoCode } from './rcepMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for the 15 RCEP Parties. Notable commercial entries:
 *  - China (CN): Bayan Obo (Inner Mongolia) and Sichuan / South China ionic-clay districts —
 *    full lanthanide separation and the dominant share of global heavy-REE separation capacity.
 *  - Australia (AU): Lynas Mt Weld (WA) — light-REE concentrate exported to Malaysian LAMP;
 *    Iluka Eneabba project — separated oxides commissioning; Northern Minerals Browns Range
 *    heavy-REE pilot (Dy / Tb).
 *  - Malaysia (MY): Lynas Advanced Materials Plant (LAMP) Kuantan — separates Australian feed
 *    into commercial REE oxides (informational; export hub on imported feedstock).
 *  - Vietnam (VN): Dong Pao mine (Lai Châu) — bastnäsite-fluorite light-REE concentrate;
 *    documented commercial-scale REE production (intermittent; Masan / VTRE downstream).
 *  - Myanmar (MM): Kachin State ionic-clay heavy-REE mining (Dy, Tb, Gd, Y) — feeds Chinese
 *    separators; included as documented commercial-scale exports (verify governance status).
 * Pre-commercial / downstream-only members (not enumerated as commercial primary exports):
 *  - Thailand (TH): monazite from beach sands as tin-mining by-product; no commercial separated
 *    oxides.
 *  - South Korea (KR) and Japan (JP): downstream magnet / phosphor / catalyst processing on
 *    imported feed — not primary exports.
 *  - Indonesia (ID): monazite as tin by-product (Bangka-Belitung) — routed to BATAN waste
 *    management; no commercial separated-oxide exports.
 * Remaining members (BN, KH, LA, NZ, PH, SG) have no commercial-scale REE mining or separation.
 * Informational; verify periodically.
 */
export const RCEP_RARE_EARTHS: Record<RcepMemberIsoCode, RareEarths> = {
  AU: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Samarium (Sm)',
    'Europium (Eu)',
    'Gadolinium (Gd)',
    'Terbium (Tb)',
    'Dysprosium (Dy)',
    'Yttrium (Y)',
  ],
  BN: [],
  KH: [],
  CN: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Samarium (Sm)',
    'Europium (Eu)',
    'Gadolinium (Gd)',
    'Terbium (Tb)',
    'Dysprosium (Dy)',
    'Holmium (Ho)',
    'Erbium (Er)',
    'Thulium (Tm)',
    'Ytterbium (Yb)',
    'Lutetium (Lu)',
    'Yttrium (Y)',
    'Scandium (Sc)',
  ],
  ID: [],
  JP: [],
  KR: [],
  LA: [],
  MY: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Samarium (Sm)',
    'Europium (Eu)',
    'Gadolinium (Gd)',
    'Terbium (Tb)',
    'Dysprosium (Dy)',
    'Yttrium (Y)',
  ],
  MM: [
    'Dysprosium (Dy)',
    'Terbium (Tb)',
    'Gadolinium (Gd)',
    'Yttrium (Y)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
  ],
  NZ: [],
  PH: [],
  SG: [],
  TH: [],
  VN: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
  ],
}
