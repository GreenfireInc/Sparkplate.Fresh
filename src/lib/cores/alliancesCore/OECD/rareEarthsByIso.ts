import type { OecdMemberIsoCode } from './oecdMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for the 36 OECD economies represented in this module. Notable commercial entries:
 *  - Australia (AU): Lynas Mt Weld (WA) — light-REE concentrate exported to Malaysian LAMP;
 *    Iluka Eneabba project — separated oxides commissioning; Northern Minerals Browns Range
 *    heavy-REE pilot (Dy / Tb).
 *  - United States (US): MP Materials Mountain Pass (CA) — light-REE concentrate and separated
 *    oxides (Ce, La, Nd, Pr); reopened heavy-REE separation circuit.
 *  - Canada (CA): Vital Metals / Cheetah Resources Nechalacho (NWT) — light-REE concentrate;
 *    Saskatchewan REE separation plant commissioning.
 *  - France (FR): Solvay (former Rhodia) La Rochelle Special Chemicals — long-running
 *    commercial REE separation for catalysts / phosphors / magnets feed.
 *  - Estonia (EE): NPM Silmet (Neo Performance Materials) Sillamäe — commercial REE separation
 *    (Nd, Pr, La, Ce) and metals plant; only operating commercial separator in the EU.
 *  - Japan (JP): JOGMEC-backed re-processing / separation hubs operate on imported feed; no
 *    primary REE mining and not enumerated as a primary export here.
 * Pre-commercial / near-term OECD prospects (not enumerated as commercial exports): SE (LKAB
 * Per Geijer / Norra Kärr), NO (Fen Complex), TR (Eskişehir Beylikova), PT (Serra de Arga
 * exploration), GB (Less Common Metals downstream processing), DK (Greenland Tanbreez /
 * Kvanefjeld — separate sovereign realm subject to Greenlandic licensing).
 * Remaining members (AT, BE, CL, CO, CR, CZ, FI, DE, GR, HU, IS, IE, IT, LV, LT, LU, MX, NL,
 * NZ, PL, SK, SI, ES, CH) have no commercial-scale primary REE mining or separation.
 * Informational; verify periodically.
 */
export const OECD_RARE_EARTHS: Record<OecdMemberIsoCode, RareEarths> = {
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
  AT: [],
  BE: [],
  CA: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Cerium (Ce)',
    'Lanthanum (La)',
  ],
  CL: [],
  CO: [],
  CR: [],
  CZ: [],
  DK: [],
  EE: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Lanthanum (La)',
    'Cerium (Ce)',
  ],
  FI: [],
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
  DE: [],
  GR: [],
  HU: [],
  IS: [],
  IE: [],
  IT: [],
  JP: [],
  LV: [],
  LT: [],
  LU: [],
  MX: [],
  NL: [],
  NZ: [],
  NO: [],
  PL: [],
  PT: [],
  SK: [],
  SI: [],
  ES: [],
  SE: [],
  CH: [],
  TR: [],
  GB: [],
  US: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Samarium (Sm)',
    'Europium (Eu)',
    'Gadolinium (Gd)',
    'Terbium (Tb)',
    'Dysprosium (Dy)',
  ],
}
