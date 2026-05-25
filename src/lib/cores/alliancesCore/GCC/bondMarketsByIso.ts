import type { GccMemberIsoCode } from './gccMemberIsoCodes'
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
 * Bond market venues by ISO 3166-1 alpha-2 for GCC members in this module (informational;
 * verify URLs, handles, and API bases before production use). Gulf sovereign Sukuk and
 * conventional bond markets via national exchanges and MoF / central-bank primary desks.
 */
export const GCC_BOND_MARKETS: Record<GccMemberIsoCode, readonly BondMarketVenue[]> = {
  BH: [
    b(
      'Bahrain Bourse',
      'https://www.bahrainbourse.com',
      'info@bahrainbourse.com',
      'https://x.com/BahrainBourse',
      'https://www.linkedin.com/company/bahrain-bourse/',
      '',
    ),
    b(
      'Central Bank of Bahrain (CBB — sovereign Sukuk primary)',
      'https://www.cbb.gov.bh',
      'info@cbb.gov.bh',
      'https://x.com/CentralBankBH',
      'https://www.linkedin.com/company/central-bank-of-bahrain/',
      '',
    ),
  ],
  KW: [
    b(
      'Boursa Kuwait (Kuwait Stock Exchange)',
      'https://www.boursakuwait.com.kw',
      'info@boursakuwait.com.kw',
      'https://x.com/BoursaKuwait',
      'https://www.linkedin.com/company/boursa-kuwait/',
      '',
    ),
    b(
      'Central Bank of Kuwait (CBK — sovereign bond auctions)',
      'https://www.cbk.gov.kw',
      'info@cbk.gov.kw',
      '',
      'https://www.linkedin.com/company/central-bank-of-kuwait/',
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
  QA: [
    b(
      'Qatar Stock Exchange (QSE)',
      'https://www.qe.com.qa',
      'info@qe.com.qa',
      'https://x.com/QatarExchange',
      'https://www.linkedin.com/company/qatar-stock-exchange/',
      '',
    ),
    b(
      'Ministry of Finance — Public Debt Management (sovereign primary)',
      'https://www.mof.gov.qa',
      'info@mof.gov.qa',
      '',
      '',
      '',
    ),
  ],
  SA: [
    b(
      'Saudi Exchange (Tadawul) — Sukuk & Bonds Market',
      'https://www.saudiexchange.sa',
      'info@saudiexchange.sa',
      'https://x.com/SaudiExchange',
      'https://www.linkedin.com/company/saudi-exchange/',
      '',
    ),
    b(
      'Ministry of Finance — Debt Management Office (sovereign primary)',
      'https://www.mof.gov.sa',
      'info@mof.gov.sa',
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
}
