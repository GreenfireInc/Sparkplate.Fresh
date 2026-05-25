import type { NatoMemberIsoCode } from './natoMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for the 32 NATO Allies. Notable entries inside the Alliance:
 *  - United States (US): MP Materials Mountain Pass (CA) — light-REE concentrate and separated
 *    oxides (Ce, La, Nd, Pr); reopened heavy-REE separation circuit.
 *  - Canada (CA): Vital Metals / Cheetah Resources Nechalacho (NWT) — light-REE concentrate
 *    (Saskatchewan REE separation plant commissioning).
 *  - France (FR): Solvay (former Rhodia) La Rochelle Special Chemicals — long-running
 *    commercial REE separation for catalysts / phosphors / magnets feed.
 *  - Estonia (EE): NPM Silmet (Neo Performance Materials) Sillamäe — commercial REE separation
 *    (Nd, Pr, La, Ce) and metals plant; the only operating commercial separator in the EU.
 * Pre-commercial / near-term projects in NATO (not yet enumerated as commercial exports):
 *  - Sweden (SE): Per Geijer / Kiruna (LKAB) and Norra Kärr (Leading Edge Materials) advanced
 *    studies.
 *  - Norway (NO): Fen Complex (REE Minerals) carbonatite project.
 *  - Greenland adjacent — Denmark (DK) sovereign realm — Tanbreez / Kvanefjeld projects; status
 *    fluctuates with Greenlandic licensing; not listed as commercial here.
 *  - Turkey (TR): Eskişehir Beylikova carbonatite (Eti Maden / MTA pilot).
 *  - United Kingdom (GB): Less Common Metals (Ellesmere Port) processes imported feedstock;
 *    not enumerated as a primary export.
 * Remaining Allies (AL, BE, BG, HR, CZ, FI, DE, GR, HU, IS, IT, LV, LT, LU, ME, NL, MK, PL,
 * PT, RO, SK, SI, ES) have no commercial-scale primary REE mining or separation. Informational;
 * verify periodically.
 */
export const NATO_RARE_EARTHS: Record<NatoMemberIsoCode, RareEarths> = {
  AL: [],
  BE: [],
  BG: [],
  CA: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Cerium (Ce)',
    'Lanthanum (La)',
  ],
  HR: [],
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
  IT: [],
  LV: [],
  LT: [],
  LU: [],
  ME: [],
  NL: [],
  MK: [],
  NO: [],
  PL: [],
  PT: [],
  RO: [],
  SK: [],
  SI: [],
  ES: [],
  SE: [],
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
