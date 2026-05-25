import type { CaricomMemberIsoCode } from './caricomMemberIsoCodes'
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

// ---- Regional venue shared across Eastern Caribbean Currency Union (ECCU) members ----

/**
 * Eastern Caribbean Securities Exchange — the regional listed exchange for the eight ECCU
 * economies (AG, AI, DM, GD, KN, LC, MS, VC) that share the Eastern Caribbean dollar (XCD).
 * Corporate and government securities are listed on a single regional board headquartered in
 * Basseterre, Saint Kitts and Nevis. No free public REST API — commercial distribution via
 * Bloomberg / Refinitiv.
 */
const ECSE = b(
  'Eastern Caribbean Securities Exchange (ECSE)',
  'https://www.ecseonline.com',
  'info@ecseonline.com',
  '',
  '',
  '',
)

/**
 * Bond market venues by ISO 3166-1 alpha-2 for CARICOM full and associate members
 * (informational; verify URLs, handles, and API bases before production use). Pattern:
 *   - ECCU / XCD economies (AG, AI, DM, GD, KN, LC, MS, VC) share the ECSE regional exchange.
 *   - Larger sovereign markets list national exchange + treasury / central-bank desk (BB, GY, JM,
 *     SR, TT).
 *   - Offshore financial centres (BM, KY, VG) list their securities exchanges or FSC registers.
 *   - Small economies with no listed venue use the central bank or FSC T-bills desk.
 * `apiEndpoint` is the empty string for virtually all venues — distribution via paid Bloomberg /
 * Refinitiv / vendor feeds. Verify periodically.
 */
export const CARICOM_BOND_MARKETS: Record<CaricomMemberIsoCode, readonly BondMarketVenue[]> = {
  AG: [ECSE],
  BS: [
    b(
      'Bahamas International Securities Exchange (BISX)',
      'https://www.bisxbahamas.com',
      'info@bisxbahamas.com',
      '',
      '',
      '',
    ),
    b(
      'Central Bank of The Bahamas (T-bills desk)',
      'https://www.centralbankbahamas.com',
      'info@centralbankbahamas.com',
      '',
      '',
      '',
    ),
  ],
  BB: [
    b(
      'Barbados Stock Exchange (BSE)',
      'https://www.bse.com.bb',
      'info@bse.com.bb',
      '',
      'https://www.linkedin.com/company/barbados-stock-exchange/',
      '',
    ),
    b(
      'Central Bank of Barbados (T-bills desk)',
      'https://www.centralbank.org.bb',
      'info@centralbank.org.bb',
      '',
      '',
      '',
    ),
  ],
  BZ: [
    b(
      'Central Bank of Belize (T-bills / T-notes desk; no listed bond venue)',
      'https://www.centralbank.org.bz',
      'info@centralbank.org.bz',
      '',
      '',
      '',
    ),
  ],
  DM: [ECSE],
  GD: [ECSE],
  GY: [
    b(
      'Guyana Stock Exchange (GSE)',
      'https://www.gyse.com.gy',
      'info@gyse.com.gy',
      '',
      '',
      '',
    ),
    b(
      'Bank of Guyana (T-bills desk)',
      'https://www.bankofguyana.org.gy',
      'info@bankofguyana.org.gy',
      '',
      '',
      '',
    ),
  ],
  HT: [
    b(
      'Banque de la République d\'Haïti (BRH — T-bills desk; no listed bond venue)',
      'https://www.brh.ht',
      'info@brh.ht',
      '',
      '',
      '',
    ),
  ],
  JM: [
    b(
      'Jamaica Stock Exchange (JSE)',
      'https://www.jamstockex.com',
      'info@jamstockex.com',
      'https://x.com/JamStockEx',
      'https://www.linkedin.com/company/jamaica-stock-exchange/',
      '',
    ),
    b(
      'Ministry of Finance and the Public Service (sovereign primary)',
      'https://www.mof.gov.jm',
      'info@mof.gov.jm',
      '',
      '',
      '',
    ),
  ],
  MS: [ECSE],
  KN: [ECSE],
  LC: [ECSE],
  VC: [ECSE],
  SR: [
    b(
      'Suriname Stock Exchange (SSX)',
      'https://www.ssx.sr',
      'info@ssx.sr',
      '',
      '',
      '',
    ),
    b(
      'Central Bank of Suriname (T-bills desk)',
      'https://www.cbvs.sr',
      'info@cbvs.sr',
      '',
      '',
      '',
    ),
  ],
  TT: [
    b(
      'Trinidad and Tobago Stock Exchange (TTSE)',
      'https://www.stockex.co.tt',
      'info@stockex.co.tt',
      '',
      'https://www.linkedin.com/company/trinidad-and-tobago-stock-exchange/',
      '',
    ),
    b(
      'Ministry of Finance (sovereign primary)',
      'https://www.finance.gov.tt',
      'info@finance.gov.tt',
      '',
      '',
      '',
    ),
  ],
  AI: [ECSE],
  BM: [
    b(
      'Bermuda Stock Exchange (BSX)',
      'https://www.bsx.com',
      'info@bsx.com',
      'https://x.com/BermudaSE',
      'https://www.linkedin.com/company/bermuda-stock-exchange/',
      '',
    ),
    b(
      'Bermuda Monetary Authority (debt listings oversight)',
      'https://www.bma.bm',
      'info@bma.bm',
      '',
      '',
      '',
    ),
  ],
  VG: [
    b(
      'BVI Financial Services Commission (offshore debt register; no domestic listed exchange)',
      'https://www.bvifsc.vg',
      'info@bvifsc.vg',
      '',
      '',
      '',
    ),
  ],
  KY: [
    b(
      'Cayman Islands Stock Exchange (CSX)',
      'https://www.csx.com.ky',
      'info@csx.com.ky',
      '',
      'https://www.linkedin.com/company/cayman-islands-stock-exchange/',
      '',
    ),
    b(
      'Cayman Islands Monetary Authority (CIMA)',
      'https://www.cima.ky',
      'info@cima.ky',
      '',
      '',
      '',
    ),
  ],
  TC: [
    b(
      'Financial Services Commission — Turks and Caicos Islands (T-bills desk; no listed bond venue)',
      'https://www.fsc.tc',
      'info@fsc.tc',
      '',
      '',
      '',
    ),
  ],
}
