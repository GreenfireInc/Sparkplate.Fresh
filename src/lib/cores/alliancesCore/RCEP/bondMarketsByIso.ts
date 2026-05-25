import type { RcepMemberIsoCode } from './rcepMemberIsoCodes'
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
 * Bond market venues by ISO 3166-1 alpha-2 for RCEP parties in this module (informational;
 * verify URLs, handles, and API bases before production use). RCEP spans major Asia-Pacific
 * sovereign-bond markets (CN, JP, KR, AU) and ASEAN hubs (SG, MY, TH, VN, ID, PH). Pattern:
 *   - Major economies list exchange + sovereign / central-bank primary desk.
 *   - Smaller ASEAN members (BN, KH, LA, MM) may have limited or CB-only markets.
 * `apiEndpoint` is the empty string for virtually all venues. Verify periodically.
 */
export const RCEP_BOND_MARKETS: Record<RcepMemberIsoCode, readonly BondMarketVenue[]> = {
  AU: [
    b(
      'Australian Securities Exchange (ASX) — Fixed Interest Market',
      'https://www.asx.com.au',
      'info@asx.com.au',
      'https://x.com/ASX',
      'https://www.linkedin.com/company/asx-limited/',
      '',
    ),
    b(
      'Australian Office of Financial Management (AOFM — sovereign primary)',
      'https://www.aofm.gov.au',
      'info@aofm.gov.au',
      'https://x.com/AOFM',
      'https://www.linkedin.com/company/australian-office-of-financial-management/',
      '',
    ),
  ],
  BN: [
    b(
      'Autoriti Monetari Brunei Darussalam (AMBD — T-bills / Sukuk desk; no listed bond venue)',
      'https://www.ambd.gov.bn',
      'info@ambd.gov.bn',
      '',
      'https://www.linkedin.com/company/autoriti-monetari-brunei-darussalam/',
      '',
    ),
  ],
  KH: [
    b(
      'Cambodia Securities Exchange (CSX)',
      'https://www.csx.com.kh',
      'info@csx.com.kh',
      '',
      '',
      '',
    ),
    b(
      'National Bank of Cambodia (T-bills / T-bonds desk)',
      'https://www.nbc.org.kh',
      'info@nbc.org.kh',
      '',
      '',
      '',
    ),
  ],
  CN: [
    b(
      'China Foreign Exchange Trade System (CFETS) — China Interbank Bond Market (CIBM)',
      'https://www.chinamoney.com.cn',
      'service@cfets.com.cn',
      '',
      '',
      '',
    ),
    b(
      'Shanghai Stock Exchange (SSE) — Exchange Bond Market',
      'https://www.sse.com.cn',
      'service@sse.com.cn',
      '',
      'https://www.linkedin.com/company/shanghai-stock-exchange/',
      '',
    ),
    b(
      'Shenzhen Stock Exchange (SZSE) — Exchange Bond Market',
      'https://www.szse.cn',
      'service@szse.cn',
      '',
      '',
      '',
    ),
  ],
  ID: [
    b(
      'Indonesia Stock Exchange (IDX) — Corporate Bond Market',
      'https://www.idx.co.id',
      'info@idx.co.id',
      'https://x.com/IDXOfficial',
      'https://www.linkedin.com/company/indonesia-stock-exchange/',
      '',
    ),
    b(
      'Directorate General of Financing and Risk Management — Ministry of Finance (SBN primary)',
      'https://www.djppr.kemenkeu.go.id',
      'djppr@kemenkeu.go.id',
      '',
      '',
      '',
    ),
  ],
  JP: [
    b(
      'Japan Exchange Group (JPX) — Tokyo Stock Exchange (listed corporate bonds)',
      'https://www.jpx.co.jp',
      'info@jpx.co.jp',
      'https://x.com/JPX_official',
      'https://www.linkedin.com/company/japan-exchange-group/',
      '',
    ),
    b(
      'Ministry of Finance Japan — Government Bond Management (JGB auctions)',
      'https://www.mof.go.jp',
      'zeimu-siryou@mof.go.jp',
      '',
      '',
      '',
    ),
  ],
  KR: [
    b(
      'Korea Exchange (KRX) — Bond Market',
      'https://global.krx.co.kr',
      'info@krx.co.kr',
      'https://x.com/KRX_official',
      'https://www.linkedin.com/company/korea-exchange/',
      '',
    ),
    b(
      'Ministry of Economy and Finance — Korea Treasury Bonds (KTB primary)',
      'https://www.moef.go.kr',
      'webmaster@moef.go.kr',
      '',
      '',
      '',
    ),
  ],
  LA: [
    b(
      'Lao Securities Exchange (LSX)',
      'https://www.lsx.com.la',
      'info@lsx.com.la',
      '',
      '',
      '',
    ),
    b(
      'Bank of the Lao PDR (T-bills desk)',
      'https://www.bol.gov.la',
      'info@bol.gov.la',
      '',
      '',
      '',
    ),
  ],
  MY: [
    b(
      'Bursa Malaysia — Bond Market',
      'https://www.bursamalaysia.com',
      'bursamalaysia@bursamalaysia.com',
      'https://x.com/BursaMalaysia',
      'https://www.linkedin.com/company/bursa-malaysia/',
      '',
    ),
    b(
      'Bank Negara Malaysia — Malaysian Government Securities (MGS primary)',
      'https://www.bnm.gov.my',
      'bnmtelelink@bnm.gov.my',
      'https://x.com/BNM_official',
      'https://www.linkedin.com/company/bank-negara-malaysia/',
      '',
    ),
  ],
  MM: [
    b(
      'Yangon Stock Exchange (YSX)',
      'https://www.ysx-mm.com',
      'info@ysx-mm.com',
      '',
      '',
      '',
    ),
    b(
      'Central Bank of Myanmar (T-bills desk)',
      'https://www.cbm.gov.mm',
      'info@cbm.gov.mm',
      '',
      '',
      '',
    ),
  ],
  NZ: [
    b(
      'NZX Limited — Debt Market',
      'https://www.nzx.com',
      'info@nzx.com',
      'https://x.com/NZXGroup',
      'https://www.linkedin.com/company/nzx-limited/',
      '',
    ),
    b(
      'New Zealand Debt Management Office (NZDMO — sovereign primary)',
      'https://debtmanagement.treasury.govt.nz',
      'info@treasury.govt.nz',
      '',
      '',
      '',
    ),
  ],
  PH: [
    b(
      'Philippine Dealing & Exchange Corp (PDEx) — OTC fixed-income platform',
      'https://www.pde.com.ph',
      'info@pde.com.ph',
      '',
      'https://www.linkedin.com/company/philippine-dealing-exchange-corp/',
      '',
    ),
    b(
      'Bureau of the Treasury (BTr — sovereign primary / retail Treasury bonds)',
      'https://www.treasury.gov.ph',
      'info@treasury.gov.ph',
      'https://x.com/PH_Treasury',
      '',
      '',
    ),
  ],
  SG: [
    b(
      'Singapore Exchange (SGX) — Fixed Income',
      'https://www.sgx.com',
      'helpdesk@sgx.com',
      'https://x.com/SGX',
      'https://www.linkedin.com/company/sgx/',
      '',
    ),
    b(
      'Monetary Authority of Singapore (MAS — Singapore Government Securities primary)',
      'https://www.mas.gov.sg',
      'contact@mas.gov.sg',
      'https://x.com/mas_sg',
      'https://www.linkedin.com/company/monetary-authority-of-singapore/',
      '',
    ),
  ],
  TH: [
    b(
      'Thai Bond Market Association (ThaiBMA)',
      'https://www.thaibma.or.th',
      'info@thaibma.or.th',
      '',
      'https://www.linkedin.com/company/thai-bond-market-association/',
      '',
    ),
    b(
      'Stock Exchange of Thailand (SET) — Corporate Bonds',
      'https://www.set.or.th',
      'info@set.or.th',
      'https://x.com/SET_Thailand',
      'https://www.linkedin.com/company/the-stock-exchange-of-thailand/',
      '',
    ),
    b(
      'Public Debt Management Office (PDMO — sovereign primary)',
      'https://www.pdmo.go.th',
      'info@pdmo.go.th',
      '',
      '',
      '',
    ),
  ],
  VN: [
    b(
      'Hanoi Stock Exchange (HNX) — Government & Corporate Bond Market',
      'https://www.hnx.vn',
      'info@hnx.vn',
      '',
      'https://www.linkedin.com/company/hanoi-stock-exchange/',
      '',
    ),
    b(
      'Ho Chi Minh Stock Exchange (HOSE) — Corporate Bonds',
      'https://www.hsx.vn',
      'info@hsx.vn',
      '',
      '',
      '',
    ),
    b(
      'State Treasury of Vietnam (sovereign primary)',
      'https://www.kbnn.gov.vn',
      'info@kbnn.gov.vn',
      '',
      '',
      '',
    ),
  ],
}
