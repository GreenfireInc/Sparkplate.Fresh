import type { G20SovereignMemberIsoCode } from './g20MemberIsoCodes'
import type { RareEarths } from './types'

/**
 * Documented rare-earth element exports (lanthanide series plus Sc and Y) by ISO 3166-1 alpha-2
 * for the 19 sovereign G20 members. Notable entries:
 *  - China (CN): Bayan Obo (Inner Mongolia) and Sichuan / South China ionic-clay districts —
 *    full lanthanide separation and the dominant share of global heavy-REE separation capacity.
 *  - India (IN): IREL beach-sand monazite — light-REE concentrate and select separated oxides.
 *  - Brazil (BR): CBMM and CMOC niobium / REE co-products; Serra Verde ionic-adsorption project.
 *  - Russia (RU): Lovozero (Kola) loparite — Ce, La, Nd, Pr, Y feed; some heavy REE.
 *  - South Africa (ZA): Steenkampskraal monazite (Western Cape) — Nd, Pr, Sm, Eu, Gd-bearing.
 *  - Australia (AU): Lynas Mt Weld (WA) — light-REE concentrate exported to Malaysian LAMP;
 *    Iluka Eneabba project — separated oxides commissioning.
 *  - United States (US): MP Materials Mountain Pass (CA) — light-REE concentrate and separated
 *    oxides (Ce, La, Nd, Pr); reopened heavy-REE separation circuit.
 *  - Canada (CA): Vital Metals / Cheetah Resources Nechalacho (NWT) — light-REE concentrate.
 *  - France (FR): Solvay (former Rhodia) La Rochelle — long-running commercial REE separation
 *    for catalysts / phosphors / magnets feed.
 *  - Saudi Arabia (SA): Ma'aden-led REE projects targeted under Vision 2030 (informational —
 *    pre-commercial separation; verify).
 * Remaining sovereign members (AR, DE, ID, IT, JP, MX, KR, TR, GB) currently lack
 * commercial-scale REE mining or separation; refining of imported feedstock is not enumerated.
 */
export const G20_RARE_EARTHS: Record<G20SovereignMemberIsoCode, RareEarths> = {
  AR: [],
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
  BR: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
  ],
  CA: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Cerium (Ce)',
    'Lanthanum (La)',
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
  IN: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Samarium (Sm)',
    'Yttrium (Y)',
  ],
  ID: [],
  IT: [],
  JP: [],
  MX: [],
  RU: [
    'Cerium (Ce)',
    'Lanthanum (La)',
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Yttrium (Y)',
  ],
  SA: [],
  ZA: [
    'Neodymium (Nd)',
    'Praseodymium (Pr)',
    'Samarium (Sm)',
    'Europium (Eu)',
    'Gadolinium (Gd)',
  ],
  KR: [],
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
