import type { EuMemberIsoCode } from './euMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for EU member states. Notable entries:
 *  - Estonia (EE): Neo Performance Materials Silmet plant at Sillamäe — one of only two
 *    commercial REE separation facilities in the EU, producing Ce / La / Nd / Pr / Sm / Eu /
 *    Gd / Tb / Dy / Y oxides from imported concentrate.
 *  - France (FR): Solvay (former Rhodia) La Rochelle Special Chemicals plant — long-running
 *    commercial REE separation for catalysts, phosphors, magnets feed.
 * Other EU members host advanced REE projects (Norra Kärr / Per Geijer SE, Sokli FI,
 * Matamulas / Castilla La Mancha ES, Kvanefjeld GL via Denmark) but no sustained
 * commercial-scale REE production today. All other entries empty (informational; verify
 * periodically).
 */
export const EU_RARE_EARTHS: Record<EuMemberIsoCode, RareEarths> = {
  AT: [],
  BE: [],
  BG: [],
  HR: [],
  CY: [],
  CZ: [],
  DK: [],
  EE: [
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
  IE: [],
  IT: [],
  LV: [],
  LT: [],
  LU: [],
  MT: [],
  NL: [],
  PL: [],
  PT: [],
  RO: [],
  SK: [],
  SI: [],
  ES: [],
  SE: [],
}
