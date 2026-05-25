import type { MintMemberIsoCode } from './mintMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for MINT members. None of MX, ID, NG or TR currently has commercial-scale primary REE mining
 * or lanthanide-separation exports. Notable pre-commercial prospects:
 *  - Turkey (TR): Eskişehir Beylikova carbonatite — large REE deposit advanced by Eti Maden /
 *    MTA, with a state pilot processing plant announced; not yet a commercial exporter.
 *  - Nigeria (NG): monazite occurrences in tin-tailings (Plateau / Bauchi); artisanal only.
 *  - Indonesia (ID): monazite as a tin-mining by-product (Bangka-Belitung) routed to PTBR
 *    radio-active waste management; no commercial separated-oxide exports.
 *  - Mexico (MX): no commercial REE production documented.
 * Informational; verify periodically.
 */
export const MINT_RARE_EARTHS: Record<MintMemberIsoCode, RareEarths> = {
  MX: [],
  ID: [],
  NG: [],
  TR: [],
}
