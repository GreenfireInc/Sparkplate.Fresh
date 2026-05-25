import type { AuMemberIsoCode } from './auMemberIsoCodes'
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

// ---- Regional venues shared across multiple AU members ----

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
 * Bond market venues by ISO 3166-1 alpha-2 for African Union member states (informational;
 * verify URLs, handles, and API bases before production use). Pattern:
 *   - National listed-bond exchanges (e.g. JSE / BSE / EGX / SEM / NSE) appear as the primary
 *     entry.
 *   - Regional listed-bond exchanges — BRVM (UEMOA) and BVMAC (CEMAC) — appear in the seven
 *     UEMOA members (BJ, BF, CI, GW, ML, NE, SN, TG) and the six CEMAC members (CM, CF, TD,
 *     CG, GQ, GA).
 *   - Countries with no listed bond venue use the central bank's Treasury bill / bond desk.
 *   - Multiple venues are listed where they exist (NG: FMDQ + NGX + DMO; ZW: ZSE + VFEX).
 *   - Empty array when there is no documented bond venue at all (e.g. EH Sahrawi Republic).
 * `apiEndpoint` is the empty string for the vast majority of African venues — distribution
 * is almost always via paid Bloomberg / Refinitiv / IRESS feeds rather than public REST.
 * Verify periodically.
 */
export const AU_BOND_MARKETS: Record<AuMemberIsoCode, readonly BondMarketVenue[]> = {
  AO: [
    b(
      'BODIVA (Bolsa de Dívida e Valores de Angola)',
      'https://www.bodiva.ao',
      'geral@bodiva.ao',
      'https://x.com/BODIVAangola',
      'https://www.linkedin.com/company/bodiva/',
      '',
    ),
  ],
  BF: [BRVM],
  BI: [
    b(
      'Banque de la République du Burundi (T-bills / T-bonds desk)',
      'https://www.brb.bi',
      'info@brb.bi',
      '',
      '',
      '',
    ),
  ],
  BJ: [BRVM],
  BW: [
    b(
      'Botswana Stock Exchange (BSE) — Bond Market',
      'https://www.bse.co.bw',
      'enquiries@bse.co.bw',
      'https://x.com/BSE_Botswana',
      'https://www.linkedin.com/company/botswana-stock-exchange/',
      '',
    ),
  ],
  CD: [
    b(
      'Banque Centrale du Congo (T-bills desk; no listed bond venue)',
      'https://www.bcc.cd',
      'info@bcc.cd',
      '',
      'https://www.linkedin.com/company/banque-centrale-du-congo/',
      '',
    ),
  ],
  CF: [BVMAC],
  CG: [BVMAC],
  CI: [BRVM],
  CM: [BVMAC],
  CV: [
    b(
      'Bolsa de Valores de Cabo Verde (BVC)',
      'https://www.bvc.cv',
      'bvc@bvc.cv',
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
  DZ: [
    b(
      'Bourse d\'Alger (Société de Gestion de la Bourse des Valeurs — SGBV)',
      'https://www.sgbv.dz',
      'contact@sgbv.dz',
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
  EH: [],
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
  ET: [
    b(
      'Ethiopian Securities Exchange (ESX)',
      'https://esx.et',
      'info@esx.et',
      '',
      'https://www.linkedin.com/company/ethiopian-securities-exchange/',
      '',
    ),
    b(
      'National Bank of Ethiopia (T-bills desk)',
      'https://nbe.gov.et',
      'info@nbe.gov.et',
      '',
      '',
      '',
    ),
  ],
  GA: [BVMAC],
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
  GQ: [BVMAC],
  GW: [BRVM],
  KE: [
    b(
      'Nairobi Securities Exchange (NSE) — Fixed Income Market',
      'https://www.nse.co.ke',
      'info@nse.co.ke',
      'https://x.com/NSE_PLC',
      'https://www.linkedin.com/company/nairobi-securities-exchange/',
      '',
    ),
    b(
      'Central Bank of Kenya — DhowCSD (retail Treasury platform)',
      'https://www.dhowcsd.go.ke',
      'info@centralbank.go.ke',
      'https://x.com/CBKKenya',
      'https://www.linkedin.com/company/central-bank-of-kenya/',
      '',
    ),
  ],
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
  LR: [
    b(
      'Central Bank of Liberia (T-bills desk; no listed bond venue)',
      'https://www.cbl.org.lr',
      'info@cbl.org.lr',
      '',
      'https://www.linkedin.com/company/central-bank-of-liberia/',
      '',
    ),
  ],
  LS: [
    b(
      'Maseru Securities Market (MSM) — operated by Central Bank of Lesotho',
      'https://www.centralbank.org.ls',
      'info@centralbank.org.ls',
      '',
      '',
      '',
    ),
  ],
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
  MG: [
    b(
      'Banky Foiben\'i Madagasikara (T-bills auctions; no listed bond venue)',
      'https://www.banky-foiben.mg',
      'bfm@banky-foiben.mg',
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
  MU: [
    b(
      'Stock Exchange of Mauritius (SEM)',
      'https://www.stockexchangeofmauritius.com',
      'info@stockexchangeofmauritius.com',
      '',
      'https://www.linkedin.com/company/stock-exchange-of-mauritius/',
      '',
    ),
    b(
      'Bank of Mauritius (sovereign primary auctions)',
      'https://www.bom.mu',
      'communications@bom.mu',
      '',
      '',
      '',
    ),
  ],
  MW: [
    b(
      'Malawi Stock Exchange (MSE) — Debt Market',
      'https://www.mse.co.mw',
      'info@mse.co.mw',
      '',
      'https://www.linkedin.com/company/malawi-stock-exchange/',
      '',
    ),
  ],
  MZ: [
    b(
      'Bolsa de Valores de Moçambique (BVM)',
      'https://www.bvm.co.mz',
      'bvm@bvm.co.mz',
      '',
      '',
      '',
    ),
  ],
  NA: [
    b(
      'Namibian Stock Exchange (NSX)',
      'https://www.nsx.com.na',
      'info@nsx.com.na',
      '',
      'https://www.linkedin.com/company/namibian-stock-exchange/',
      '',
    ),
    b(
      'Bank of Namibia (sovereign primary auctions)',
      'https://www.bon.com.na',
      'info@bon.com.na',
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
  RW: [
    b(
      'Rwanda Stock Exchange (RSE)',
      'https://rse.rw',
      'info@rse.rw',
      '',
      'https://www.linkedin.com/company/rwanda-stock-exchange/',
      '',
    ),
  ],
  SC: [
    b(
      'MERJ Exchange (Mauritius-anchored multi-asset venue listing Seychelles debt)',
      'https://merj.exchange',
      'info@merj.exchange',
      'https://x.com/MERJexchange',
      'https://www.linkedin.com/company/merj-exchange/',
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
  SN: [BRVM],
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
  SS: [
    b(
      'Bank of South Sudan (T-bills desk; no listed bond venue)',
      'https://boss.gov.ss',
      'info@boss.gov.ss',
      '',
      '',
      '',
    ),
  ],
  ST: [
    b(
      'Banco Central de São Tomé e Príncipe (T-bills desk; no listed bond venue)',
      'https://www.bcstp.st',
      'bcstp@bcstp.st',
      '',
      '',
      '',
    ),
  ],
  SZ: [
    b(
      'Eswatini Stock Exchange (ESE)',
      'https://www.ssx.org.sz',
      'info@ssx.org.sz',
      '',
      'https://www.linkedin.com/company/eswatini-stock-exchange/',
      '',
    ),
  ],
  TD: [BVMAC],
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
  TZ: [
    b(
      'Dar es Salaam Stock Exchange (DSE) — Fixed Income Market',
      'https://www.dse.co.tz',
      'info@dse.co.tz',
      'https://x.com/DSEtanzania',
      'https://www.linkedin.com/company/dar-es-salaam-stock-exchange/',
      '',
    ),
    b(
      'Bank of Tanzania (sovereign primary auctions)',
      'https://www.bot.go.tz',
      'info@bot.go.tz',
      '',
      '',
      '',
    ),
  ],
  UG: [
    b(
      'Uganda Securities Exchange (USE) — Fixed Income Market',
      'https://www.use.or.ug',
      'info@use.or.ug',
      '',
      'https://www.linkedin.com/company/uganda-securities-exchange/',
      '',
    ),
    b(
      'Bank of Uganda (sovereign primary auctions)',
      'https://www.bou.or.ug',
      'info@bou.or.ug',
      '',
      '',
      '',
    ),
  ],
  ZA: [
    b(
      'Johannesburg Stock Exchange (JSE) — Interest Rate Market',
      'https://www.jse.co.za',
      'info@jse.co.za',
      'https://x.com/JSE_Group',
      'https://www.linkedin.com/company/jse-ltd/',
      '',
    ),
    b(
      'National Treasury — Asset and Liability Management (sovereign primary)',
      'https://www.treasury.gov.za',
      'enquiries@treasury.gov.za',
      '',
      '',
      '',
    ),
  ],
  ZM: [
    b(
      'Lusaka Securities Exchange (LuSE) — Government Bond Market',
      'https://luse.co.zm',
      'info@luse.co.zm',
      '',
      'https://www.linkedin.com/company/lusaka-securities-exchange/',
      '',
    ),
  ],
  ZW: [
    b(
      'Zimbabwe Stock Exchange (ZSE)',
      'https://www.zse.co.zw',
      'info@zse.co.zw',
      'https://x.com/ZSE_OFFICIAL',
      'https://www.linkedin.com/company/zimbabwe-stock-exchange/',
      '',
    ),
    b(
      'Victoria Falls Stock Exchange (VFEX) — USD-denominated debt',
      'https://www.vfex.exchange',
      'info@vfex.exchange',
      'https://x.com/VFEX_Exchange',
      'https://www.linkedin.com/company/vfex/',
      '',
    ),
  ],
}
