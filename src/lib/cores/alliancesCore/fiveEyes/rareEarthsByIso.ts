import type { FiveEyesMemberIsoCode } from './fiveEyesMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for Five Eyes signatories. Notable entries:
 *  - Australia (AU): Lynas Mt Weld concentrate (Nd, Pr, Ce, La, Sm, Eu, Gd, Tb, Dy); Iluka
 *    Eneabba project; near-mine cracking & leaching.
 *  - United States (US): MP Materials Mountain Pass (CA) — light-REE concentrate and
 *    separated oxides (Ce, La, Nd, Pr); reopened heavy-REE separation circuit.
 *  - Canada (CA): Vital Metals / Cheetah Resources Nechalacho (NWT) — light-REE concentrate.
 * United Kingdom and New Zealand have no commercial-scale REE production
 * (informational; verify periodically).
 */
export const FIVE_EYES_RARE_EARTHS: Record<FiveEyesMemberIsoCode, RareEarths> = {
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
  CA: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Cerium (Ce)',
    'Lanthanum (La)',
  ],
  NZ: [],
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
