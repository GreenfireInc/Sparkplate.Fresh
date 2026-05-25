import type { ComesaMemberIsoCode } from './comesaMemberIsoCodes'
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

/**
 * Bond market venues by ISO 3166-1 alpha-2 for COMESA (Common Market for Eastern and
 * Southern Africa) member economies in this module (informational; verify URLs, handles,
 * and API bases before production use). COMESA spans the Horn and North Africa corridor,
 * Indian Ocean islands, Great Lakes, and Southern / Central Africa. Pattern:
 *   - National listed-bond exchanges (JSE-adjacent SEM, NSE, LuSE, ZSE/VFEX, ESX) appear
 *     as the primary entry where they exist.
 *   - Major sovereign markets list exchange + treasury / central-bank desk (EG, KE, UG).
 *   - Countries with no listed bond venue use the central bank's Treasury bill / bond desk.
 * `apiEndpoint` is the empty string for virtually all venues — distribution via paid
 * Bloomberg / Refinitiv / vendor feeds. Verify periodically.
 */
export const COMESA_BOND_MARKETS: Record<ComesaMemberIsoCode, readonly BondMarketVenue[]> = {
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
}
