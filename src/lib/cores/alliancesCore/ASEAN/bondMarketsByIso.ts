import type { AseanMemberIsoCode } from './aseanMemberIsoCodes'
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
 * Bond market venues by ISO 3166-1 alpha-2 for ASEAN member economies (informational;
 * verify URLs, handles, and API bases before production use). ASEAN spans major Southeast
 * Asian fixed-income hubs (SG SGX, TH ThaiBMA/SET, MY Bursa, ID IDX/SBN, PH PDEx, VN HNX)
 * and smaller or pre-commercial venues (KH CSX, LA LSX, MM YSX, TL BCTL). Brunei (BN)
 * has no listed bond market — AMBD T-bills / Sukuk desk only. Multiple venues are listed
 * where they coexist (ID: IDX + MoF SBN; MY: Bursa + BNM MGS; PH: PDEx + BTr; SG: SGX +
 * MAS; TH: ThaiBMA + SET + PDMO; VN: HNX + HOSE + State Treasury). `apiEndpoint` is the
 * empty string for virtually all venues — distribution via paid Bloomberg / Refinitiv /
 * vendor feeds. Verify periodically.
 */
export const ASEAN_BOND_MARKETS: Record<AseanMemberIsoCode, readonly BondMarketVenue[]> = {
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
      'https://www.linkedin.com/company/cambodia-securities-exchange/',
      '',
    ),
    b(
      'National Bank of Cambodia (government bond auctions)',
      'https://www.nbc.gov.kh',
      'info@nbc.gov.kh',
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
      'Bank of the Lao PDR (government bond auctions)',
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
      'Yangon Stock Exchange (YSX — limited corporate listings; no liquid bond market)',
      'https://www.ysx-mm.com',
      'info@ysx-mm.com',
      '',
      '',
      '',
    ),
    b(
      'Central Bank of Myanmar (T-bills desk; no listed bond venue)',
      'https://www.cbm.gov.mm',
      'info@cbm.gov.mm',
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
  TL: [
    b(
      'Banco Central de Timor-Leste (T-bills desk; no listed bond venue)',
      'https://www.bancocentral.tl',
      'info@bancocentral.tl',
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
