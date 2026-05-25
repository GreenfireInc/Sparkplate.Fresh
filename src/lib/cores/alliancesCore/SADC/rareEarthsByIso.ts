import type { SadcMemberIsoCode } from './sadcMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for the 16 SADC members. Notable commercial entry:
 *  - South Africa (ZA): Steenkampskraal monazite (Western Cape) — Nd, Pr, Sm, Eu, Gd-bearing;
 *    Bayswater / Phalaborwa REE projects in advanced stages.
 *  - Malawi (MW): Songwe Hill carbonatite (Mkango Resources) — feasibility-stage REE project;
 *    Kangankunde historical mining; listed here for documentation but currently pre-commercial,
 *    so REE entries are kept empty until first commercial export.
 *  - Tanzania (TZ): Ngualla REE project (Peak Rare Earths) — feasibility-stage; pre-commercial.
 *  - Madagascar (MG): Tantalus / Toliara mineral-sands project — pre-commercial separated REEs.
 *  - Angola (AO): Longonjo carbonatite (Pensana) — funded construction; pre-commercial.
 *  - Mozambique (MZ): heavy-mineral sands (Moma — Kenmare) include monazite by-product but
 *    routed to disposal rather than commercial separation.
 * Remaining members (BW, KM, CD, SZ, LS, MU, NA, SC, ZM, ZW) have no commercial-scale primary
 * REE mining or separation. Informational; verify periodically.
 */
export const SADC_RARE_EARTHS: Record<SadcMemberIsoCode, RareEarths> = {
  AO: [],
  BW: [],
  KM: [],
  CD: [],
  SZ: [],
  LS: [],
  MG: [],
  MW: [],
  MU: [],
  MZ: [],
  NA: [],
  SC: [],
  ZA: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Samarium (Sm)',
    'Europium (Eu)',
    'Gadolinium (Gd)',
  ],
  TZ: [],
  ZM: [],
  ZW: [],
}
