import type { ApecMemberIsoCode } from './apecMemberIsoCodes'
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
 * Bond market venues by ISO 3166-1 alpha-2 for APEC member economies (informational;
 * verify URLs, handles, and API bases before production use). APEC spans the world's
 * largest sovereign-bond markets (US, JP, CN), major regional hubs (HK Bond Connect,
 * SG SGX, AU ASX), and smaller emerging venues (PG POMSoX, BN AMBD T-bills only).
 * Multiple venues are listed where they coexist (e.g. CN: CFETS interbank + SSE/SZSE
 * exchange bonds; PH: PDEx OTC + Bureau of the Treasury primary; US: TreasuryDirect +
 * FINRA TRACE). `apiEndpoint` is populated only where a documented public REST base
 * exists (notably US Treasury Fiscal Data); most Asia-Pacific venues distribute via
 * paid Bloomberg / Refinitiv / vendor feeds. Verify periodically.
 */
export const APEC_BOND_MARKETS: Record<ApecMemberIsoCode, readonly BondMarketVenue[]> = {
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
  CA: [
    b(
      'TMX Group — Toronto Stock Exchange / TSX Venture (listed bonds)',
      'https://www.tmx.com',
      'info@tmx.com',
      'https://x.com/TMXGroup',
      'https://www.linkedin.com/company/tmx-group/',
      '',
    ),
    b(
      'Bank of Canada (Government of Canada bond auctions)',
      'https://www.bankofcanada.ca',
      'info@bankofcanada.ca',
      'https://x.com/BankofCanada',
      'https://www.linkedin.com/company/bank-of-canada/',
      '',
    ),
  ],
  CL: [
    b(
      'Bolsa de Comercio de Santiago (BCS)',
      'https://www.bolsadesantiago.com',
      'info@bcs.cl',
      'https://x.com/bcs_cl',
      'https://www.linkedin.com/company/bolsa-de-comercio-de-santiago/',
      '',
    ),
    b(
      'Ministerio de Hacienda — Tesorería General de la República (sovereign primary)',
      'https://www.hacienda.cl',
      'contacto@hacienda.cl',
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
  HK: [
    b(
      'Hong Kong Exchanges and Clearing (HKEX) — Bond Connect / CMU',
      'https://www.hkex.com.hk',
      'info@hkex.com.hk',
      'https://x.com/hkex',
      'https://www.linkedin.com/company/hkex/',
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
  MX: [
    b(
      'Bolsa Mexicana de Valores (BMV) — Mercado de Deuda',
      'https://www.bmv.com.mx',
      'atencionainversionistas@bmv.com.mx',
      'https://x.com/BMV_Group',
      'https://www.linkedin.com/company/bolsa-mexicana-de-valores/',
      '',
    ),
    b(
      'Secretaría de Hacienda y Crédito Público (SHCP — sovereign primary)',
      'https://www.gob.mx/shcp',
      'atencion@hacienda.gob.mx',
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
  PG: [
    b(
      'Port Moresby Stock Exchange (POMSoX)',
      'https://www.pomsox.com.pg',
      'info@pomsox.com.pg',
      '',
      '',
      '',
    ),
    b(
      'Bank of Papua New Guinea (T-bills desk; no liquid listed bond market)',
      'https://www.bankpng.gov.pg',
      'info@bankpng.gov.pg',
      '',
      '',
      '',
    ),
  ],
  PE: [
    b(
      'Bolsa de Valores de Lima (BVL)',
      'https://www.bvl.com.pe',
      'atencion@bvl.com.pe',
      'https://x.com/BVLperu',
      'https://www.linkedin.com/company/bolsa-de-valores-de-lima/',
      '',
    ),
    b(
      'Ministerio de Economía y Finanzas — Dirección General del Tesoro Público (sovereign primary)',
      'https://www.mef.gob.pe',
      'consultas@mef.gob.pe',
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
  RU: [
    b(
      'Moscow Exchange (MOEX) — Bond Market',
      'https://www.moex.com',
      'info@moex.com',
      'https://x.com/Moscow_Exchange',
      'https://www.linkedin.com/company/moscow-exchange/',
      '',
    ),
    b(
      'Ministry of Finance of the Russian Federation (OFZ primary auctions)',
      'https://minfin.gov.ru',
      'info@minfin.gov.ru',
      '',
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
  TW: [
    b(
      'Taiwan Stock Exchange (TWSE) — Bond Market',
      'https://www.twse.com.tw',
      'service@twse.com.tw',
      '',
      'https://www.linkedin.com/company/taiwan-stock-exchange-corporation/',
      '',
    ),
    b(
      'Taipei Exchange (TPEx) — OTC bonds',
      'https://www.tpex.org.tw',
      'service@tpex.org.tw',
      '',
      '',
      '',
    ),
    b(
      'Central Bank of the Republic of China (Taiwan) — government bond auctions',
      'https://www.cbc.gov.tw',
      'info@cbc.gov.tw',
      '',
      '',
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
  US: [
    b(
      'TreasuryDirect — U.S. Department of the Treasury (sovereign primary / retail)',
      'https://www.treasurydirect.gov',
      'treasurydirect@fiscal.treasury.gov',
      'https://x.com/USTreasury',
      'https://www.linkedin.com/company/us-treasury/',
      'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/',
    ),
    b(
      'FINRA — TRACE (corporate bond transaction reporting)',
      'https://www.finra.org/finra-data/fixed-income/trace',
      'info@finra.org',
      'https://x.com/FINRA',
      'https://www.linkedin.com/company/finra/',
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
