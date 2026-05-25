import type { MiktaMemberIsoCode } from './miktaMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for MIKTA members. Notable entries:
 *  - Australia (AU): Lynas Mt Weld (WA) — light-REE concentrate exported to Malaysian LAMP;
 *    Iluka Eneabba project — separated oxides commissioning; Northern Minerals Browns Range
 *    heavy-REE pilot (Dy / Tb).
 * The remaining MIKTA members (MX, ID, KR, TR) currently lack commercial-scale REE mining or
 * separation. Korea (KR) operates downstream magnet and phosphor processing on imported feed,
 * which is not enumerated as a primary export here. Turkey hosts the giant Eskişehir Beylikova
 * carbonatite REE project announced by Eti Maden / MTA, but it remains pre-commercial.
 * Informational; verify periodically.
 */
export const MIKTA_RARE_EARTHS: Record<MiktaMemberIsoCode, RareEarths> = {
  MX: [],
  ID: [],
  KR: [],
  TR: [],
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
}
