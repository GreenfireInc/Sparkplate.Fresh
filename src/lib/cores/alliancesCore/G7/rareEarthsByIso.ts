import type { G7MemberIsoCode } from './g7MemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for G7 members. Notable entries:
 *  - United States (US): MP Materials Mountain Pass (CA) — light-REE concentrate and
 *    separated oxides (Ce, La, Nd, Pr); reopened heavy-REE separation circuit.
 *  - Canada (CA): Vital Metals / Cheetah Resources Nechalacho (NWT) — light-REE concentrate.
 *  - France (FR): Solvay (former Rhodia) La Rochelle Special Chemicals — long-running
 *    commercial REE separation for catalysts / phosphors / magnets feed.
 * Germany, Italy, Japan and the United Kingdom have no commercial-scale REE mining or
 * separation today (Japan refines / re-exports separated oxides through Honshu but no
 * primary mining; informational; verify periodically).
 */
export const G7_RARE_EARTHS: Record<G7MemberIsoCode, RareEarths> = {
  CA: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Cerium (Ce)',
    'Lanthanum (La)',
  ],
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
  IT: [],
  JP: [],
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
