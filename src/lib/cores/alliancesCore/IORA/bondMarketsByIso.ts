import type { IoraMemberIsoCode } from './ioraMemberIsoCodes'
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
 * Bond market venues by ISO 3166-1 alpha-2 for IORA members in this module (informational;
 * verify URLs, handles, and API bases before production use). Indian Ocean Rim economies
 * spanning major Asia-Pacific hubs (AU, IN, SG, MY, TH), Gulf members (AE, OM), and
 * African / island economies with smaller or CB-only bond markets.
 */
export const IORA_BOND_MARKETS: Record<IoraMemberIsoCode, readonly BondMarketVenue[]> = {
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
  BD: [
    b(
      'Dhaka Stock Exchange (DSE) — Corporate Bond Market',
      'https://www.dsebd.org',
      'info@dsebd.org',
      '',
      'https://www.linkedin.com/company/dhaka-stock-exchange/',
      '',
    ),
    b(
      'Bangladesh Bank (government bond auctions)',
      'https://www.bb.org.bd',
      'info@bb.org.bd',
      '',
      '',
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
  FR: [
    b(
      'Euronext Paris — Fixed Income',
      'https://www.euronext.com',
      'info@euronext.com',
      'https://x.com/Euronext',
      'https://www.linkedin.com/company/euronext/',
      '',
    ),
    b(
      'Agence France Trésor (AFT — sovereign primary)',
      'https://www.aft.gouv.fr',
      'info@aft.gouv.fr',
      'https://x.com/AgenceFranceTresor',
      'https://www.linkedin.com/company/agence-france-tresor/',
      '',
    ),
  ],
  IN: [
    b(
      'National Stock Exchange of India (NSE) — Corporate Bond Market',
      'https://www.nseindia.com',
      'helpdesk@nseindia.com',
      'https://x.com/NSEIndia',
      'https://www.linkedin.com/company/national-stock-exchange-of-india-limited/',
      '',
    ),
    b(
      'Reserve Bank of India — Government Securities (G-Sec primary)',
      'https://www.rbi.org.in',
      'helpdesk@rbi.org.in',
      'https://x.com/RBI',
      'https://www.linkedin.com/company/reserve-bank-of-india/',
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
  IR: [
    b(
      'Tehran Stock Exchange (TSE)',
      'https://www.tse.ir',
      'info@tse.ir',
      '',
      '',
      '',
    ),
    b(
      'Central Bank of Iran (government bond auctions)',
      'https://www.cbi.ir',
      'info@cbi.ir',
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
  MV: [
    b(
      'Maldives Stock Exchange (MSE)',
      'https://www.mse.com.mv',
      'info@mse.com.mv',
      '',
      '',
      '',
    ),
    b(
      'Maldives Monetary Authority (T-bills desk)',
      'https://www.mma.gov.mv',
      'info@mma.gov.mv',
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
  OM: [
    b(
      'Muscat Securities Market (MSM)',
      'https://www.msx.om',
      'info@msx.om',
      'https://x.com/MuscatSecMarket',
      'https://www.linkedin.com/company/muscat-securities-market/',
      '',
    ),
    b(
      'Central Bank of Oman (CBO — government development bonds)',
      'https://www.cbo.gov.om',
      'info@cbo.gov.om',
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
  LK: [
    b(
      'Colombo Stock Exchange (CSE)',
      'https://www.cse.lk',
      'info@cse.lk',
      'https://x.com/CSEColombo',
      'https://www.linkedin.com/company/colombo-stock-exchange/',
      '',
    ),
    b(
      'Central Bank of Sri Lanka (government securities)',
      'https://www.cbsl.gov.lk',
      'info@cbsl.gov.lk',
      '',
      '',
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
  AE: [
    b(
      'Abu Dhabi Securities Exchange (ADX)',
      'https://www.adx.ae',
      'info@adx.ae',
      'https://x.com/ADXUAE',
      'https://www.linkedin.com/company/abu-dhabi-securities-exchange/',
      '',
    ),
    b(
      'Dubai Financial Market (DFM)',
      'https://www.dfm.ae',
      'info@dfm.ae',
      'https://x.com/DubaiFinancialMarket',
      'https://www.linkedin.com/company/dubai-financial-market/',
      '',
    ),
    b(
      'Ministry of Finance — Public Debt Management (sovereign primary)',
      'https://www.mof.gov.ae',
      'info@mof.gov.ae',
      '',
      '',
      '',
    ),
  ],
  YE: [
    b(
      'Central Bank of Yemen (T-bills desk; no listed bond venue)',
      'https://www.cby-ye.com',
      'info@cby-ye.com',
      '',
      '',
      '',
    ),
  ],
}
