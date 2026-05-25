import type { CensadMemberIsoCode } from './censadMemberIsoCodes'
import type { BondMarketVenue } from './types'

function b(
  name: string,
  website: string,
  email: string,
  twitter: string,
  linkedin: string,
  apiEndpoint: string,
): BondMarketVenue {
  return { name, website, email, twitter, linkedin, apiEndpoint }
}

// ---- Regional venues shared across multiple CEN-SAD members ----

/**
 * Bourse Régionale des Valeurs Mobilières — the single regional listed exchange for the
 * eight UEMOA / West African CFA franc-zone states (BJ, BF, CI, GW, ML, NE, SN, TG).
 * Headquartered in Abidjan with a single trading floor; sovereign and corporate bonds are
 * listed alongside equities. No free public REST API — daily price / yield bulletins are
 * published as PDF / Excel and commercial feeds are distributed via Bloomberg / Refinitiv.
 */
const BRVM = b(
  'BRVM (Bourse Régionale des Valeurs Mobilières)',
  'https://www.brvm.org',
  'info@brvm.org',
  'https://x.com/brvm_officiel',
  'https://www.linkedin.com/company/brvm/',
  '',
)

/**
 * Bourse des Valeurs Mobilières d'Afrique Centrale — the unified CEMAC / Central African
 * CFA franc-zone exchange (post-2019 merger of the former BVMAC Libreville with the
 * Cameroonian Douala Stock Exchange). Covers CM, CF, TD, CG, GQ, GA. Headquartered in
 * Douala. Sovereign and corporate bond listings; no free public REST API — commercial
 * distribution via Bloomberg / Refinitiv.
 */
const BVMAC = b(
  'BVMAC (Bourse des Valeurs Mobilières d\'Afrique Centrale)',
  'https://www.bvm-ac.com',
  'contact@bvm-ac.com',
  'https://x.com/bvmacofficiel',
  'https://www.linkedin.com/company/bvmac/',
  '',
)

/**
 * Bond market venues by ISO 3166-1 alpha-2 for CEN-SAD (Community of Sahel-Saharan States)
 * member economies in this module (informational; verify URLs, handles, and API bases before
 * production use). CEN-SAD spans the Sahel and Sahara from Morocco and Tunisia through West
 * and Central Africa to Egypt, Eritrea, and Somalia. Pattern:
 *   - Regional listed-bond exchanges — BRVM (UEMOA: BJ, BF, CI, GW, ML, NE, SN, TG) and
 *     BVMAC (CEMAC: CF, TD) — appear for franc-zone members.
 *   - Major sovereign markets list exchange + treasury / DMO desk (EG, MA, NG).
 *   - Countries with no listed bond venue use the central bank's Treasury bill / bond desk.
 * `apiEndpoint` is the empty string for virtually all venues — distribution via paid
 * Bloomberg / Refinitiv / vendor feeds. Verify periodically.
 */
export const CENSAD_BOND_MARKETS: Record<CensadMemberIsoCode, readonly BondMarketVenue[]> = {
  BJ: [BRVM],
  BF: [BRVM],
  CF: [BVMAC],
  TD: [BVMAC],
  KM: [
    b(
      'Banque Centrale des Comores (T-bills desk; no listed bond venue)',
      'https://www.banque-comores.km',
      'bcc@banque-comores.km',
      '',
      '',
      '',
    ),
  ],
  DJ: [
    b(
      'Banque Centrale de Djibouti (T-bills desk; no listed bond venue)',
      'https://banque-centrale.dj',
      'info@banque-centrale.dj',
      '',
      '',
      '',
    ),
  ],
  EG: [
    b(
      'Egyptian Exchange (EGX)',
      'https://www.egx.com.eg',
      'egxinfo@egx.com.eg',
      'https://x.com/EGX_Egypt',
      'https://www.linkedin.com/company/the-egyptian-exchange/',
      '',
    ),
    b(
      'Ministry of Finance — Debt Management Unit (sovereign primary)',
      'https://www.mof.gov.eg',
      'contact@mof.gov.eg',
      '',
      '',
      '',
    ),
  ],
  ER: [
    b(
      'Bank of Eritrea (T-bills desk; no listed bond venue)',
      '',
      '',
      '',
      '',
      '',
    ),
  ],
  GM: [
    b(
      'Central Bank of The Gambia (T-bills / Sukuk Al-Salaam desk)',
      'https://www.cbg.gm',
      'info@cbg.gm',
      'https://x.com/CBGambia',
      'https://www.linkedin.com/company/central-bank-of-the-gambia/',
      '',
    ),
  ],
  GH: [
    b(
      'Ghana Fixed Income Market (GFIM) — Ghana Stock Exchange',
      'https://gse.com.gh/gfim',
      'info@gse.com.gh',
      'https://x.com/GSEghana',
      'https://www.linkedin.com/company/ghana-stock-exchange/',
      '',
    ),
  ],
  GN: [
    b(
      'Banque Centrale de la République de Guinée (T-bills desk)',
      'https://www.bcrg-guinee.org',
      'info@bcrg-guinee.org',
      '',
      '',
      '',
    ),
  ],
  GW: [BRVM],
  CI: [BRVM],
  LY: [
    b(
      'Libyan Stock Market (LSM)',
      'https://www.lsm.ly',
      'info@lsm.ly',
      '',
      '',
      '',
    ),
  ],
  ML: [BRVM],
  MR: [
    b(
      'Banque Centrale de Mauritanie (T-bills desk; no listed bond venue)',
      'https://www.bcm.mr',
      'bcm@bcm.mr',
      '',
      '',
      '',
    ),
  ],
  MA: [
    b(
      'Bourse de Casablanca',
      'https://www.casablanca-bourse.com',
      'contact@casablanca-bourse.com',
      '',
      'https://www.linkedin.com/company/bourse-de-casablanca/',
      '',
    ),
    b(
      'Trésor du Royaume du Maroc — Direction du Trésor (sovereign primary)',
      'https://www.finances.gov.ma',
      'contact@dtfe.gov.ma',
      '',
      '',
      '',
    ),
  ],
  NE: [BRVM],
  NG: [
    b(
      'FMDQ Securities Exchange (premier OTC fixed-income & derivatives venue)',
      'https://www.fmdqgroup.com',
      'info@fmdqgroup.com',
      'https://x.com/FMDQGroup',
      'https://www.linkedin.com/company/fmdq/',
      '',
    ),
    b(
      'Nigerian Exchange Group (NGX) — Bond Market',
      'https://ngxgroup.com',
      'contact@ngxgroup.com',
      'https://x.com/NGXGROUP',
      'https://www.linkedin.com/company/nigerian-exchange-group/',
      '',
    ),
    b(
      'Debt Management Office (DMO) Nigeria — sovereign primary',
      'https://www.dmo.gov.ng',
      'enquiries@dmo.gov.ng',
      'https://x.com/DMONigeria',
      'https://www.linkedin.com/company/debt-management-office-nigeria/',
      '',
    ),
  ],
  SN: [BRVM],
  SL: [
    b(
      'Bank of Sierra Leone (T-bills / T-bonds desk; no listed bond venue)',
      'https://www.bsl.gov.sl',
      'info@bsl.gov.sl',
      '',
      '',
      '',
    ),
  ],
  SO: [
    b(
      'Central Bank of Somalia (T-bills desk; no listed bond venue)',
      'https://www.centralbank.gov.so',
      'info@centralbank.gov.so',
      '',
      '',
      '',
    ),
  ],
  SD: [
    b(
      'Khartoum Stock Exchange (KSE) — Sukuk and bonds',
      'https://www.kse.sd',
      'info@kse.sd',
      '',
      'https://www.linkedin.com/company/khartoum-stock-exchange/',
      '',
    ),
  ],
  TG: [BRVM],
  TN: [
    b(
      'Bourse de Tunis (BVMT)',
      'https://www.bvmt.com.tn',
      'bvmt@bvmt.com.tn',
      '',
      'https://www.linkedin.com/company/bourse-de-tunis/',
      '',
    ),
  ],
}
