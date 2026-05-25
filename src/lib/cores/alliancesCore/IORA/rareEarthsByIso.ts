import type { IoraMemberIsoCode } from './ioraMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for IORA members. Notable entries:
 *  - Australia (AU): Lynas Mt Weld (WA) — light-REE concentrate exported to Malaysian LAMP;
 *    Iluka Eneabba project — separated oxides commissioning.
 *  - India (IN): IREL beach-sand monazite — light-REE concentrate and select separated oxides.
 *  - Malaysia (MY): Lynas Advanced Materials Plant (LAMP) Kuantan — separates Australian feed
 *    into commercial REE oxides (informational; export hub on imported feedstock).
 *  - France (FR): Solvay (former Rhodia) La Rochelle — long-running commercial REE separation
 *    for catalysts / phosphors / magnets feed (mainland industrial seat of the IORA listing).
 *  - South Africa (ZA): Steenkampskraal monazite (Western Cape) — Nd, Pr, Sm, Eu, Gd-bearing.
 *  - Madagascar (MG): Tantalus Rare Earths / Toliara mineral-sands project pipeline — currently
 *    pre-commercial for separated REE oxides; excluded from this list.
 * Remaining members (BD, KM, ID, IR, KE, MV, MU, MZ, OM, SC, SG, SO, LK, TZ, TH, AE, YE) lack
 * commercial-scale REE mining or separation. Informational; verify periodically.
 */
export const IORA_RARE_EARTHS: Record<IoraMemberIsoCode, RareEarths> = {
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
  BD: [],
  KM: [],
  FR: [
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
  IN: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Samarium (Sm)',
    'Yttrium (Y)',
  ],
  ID: [],
  IR: [],
  KE: [],
  MG: [],
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
  MV: [],
  MU: [],
  MZ: [],
  OM: [],
  SC: [],
  SG: [],
  SO: [],
  ZA: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Samarium (Sm)',
    'Europium (Eu)',
    'Gadolinium (Gd)',
  ],
  LK: [],
  TZ: [],
  TH: [],
  AE: [],
  YE: [],
}
