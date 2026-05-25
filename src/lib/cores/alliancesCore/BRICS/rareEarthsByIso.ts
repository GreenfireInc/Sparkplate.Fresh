import type { BricsMemberIsoCode } from './bricsMemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for BRICS founding members. Notable entries:
 *  - China (CN): full light + heavy REE separation, oxide / metal / alloy exports.
 *  - India (IN): monazite-derived light REE concentrates / oxides via IREL (Kerala, Odisha).
 *  - Brazil (BR): Araxá / Catalão niobium-REE associations, monazite from coastal sands.
 *  - Russia (RU): Lovozero loparite + Solikamsk Magnesium light-REE concentrate.
 *  - South Africa (ZA): Steenkampskraal historical / restart light-REE concentrate.
 * Informational; verify periodically.
 */
export const BRICS_RARE_EARTHS: Record<BricsMemberIsoCode, RareEarths> = {
  BR: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
  ],
  RU: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
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
  CN: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Samarium (Sm)',
    'Europium (Eu)',
    'Gadolinium (Gd)',
    'Terbium (Tb)',
    'Dysprosium (Dy)',
    'Holmium (Ho)',
    'Erbium (Er)',
    'Thulium (Tm)',
    'Ytterbium (Yb)',
    'Lutetium (Lu)',
    'Yttrium (Y)',
    'Scandium (Sc)',
  ],
  ZA: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
  ],
}
