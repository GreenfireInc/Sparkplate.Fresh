import type { CptppMemberIsoCode } from './cptppMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for CPTPP parties. Notable entries:
 *  - Australia (AU): Lynas Mt Weld concentrate (Nd, Pr, Ce, La, Sm, Eu, Gd, Tb, Dy);
 *    Iluka Eneabba project under build-out.
 *  - Malaysia (MY): Lynas Advanced Materials Plant (LAMP) at Gebeng refines Mt Weld concentrate.
 *  - Vietnam (VN): Nam Xe / Dong Pao / Yen Phu light-REE concentrate.
 *  - Canada (CA): Vital Metals / Cheetah Resources Nechalacho light-REE concentrate (NWT).
 *  - Japan (JP): Pacific seafloor mud REE resources in EEZ are pre-commercial; exports are
 *    refined / re-exported separated oxides through Honshu refineries (entry omitted as
 *    non-mining export).
 * Other entries are empty (informational; verify periodically).
 */
export const CPTPP_RARE_EARTHS: Record<CptppMemberIsoCode, RareEarths> = {
  AU: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Samarium (Sm)',
    'Europium (Eu)',
    'Gadolinium (Gd)',
    'Terbium (Tb)',
    'Dysprosium (Dy)',
  ],
  BN: [],
  CA: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Cerium (Ce)',
    'Lanthanum (La)',
  ],
  CL: [],
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
  PE: [],
  SG: [],
  GB: [],
  VN: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Yttrium (Y)',
  ],
}
