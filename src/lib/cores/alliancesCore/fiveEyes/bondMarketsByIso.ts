import type { FiveEyesMemberIsoCode } from './fiveEyesMemberIsoCodes'
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
 * Bond market venues by ISO 3166-1 alpha-2 for Five Eyes members in this module
 * (informational; verify URLs, handles, and API bases before production use). All five
 * economies operate major sovereign-bond markets with listed or OTC fixed-income platforms
 * plus sovereign primary-market desks (DMO / MoF / central bank). `apiEndpoint` is populated
 * only for U.S. Treasury Fiscal Data; other venues distribute via paid Bloomberg / Refinitiv
 * feeds. Verify periodically.
 */
export const FIVE_EYES_BOND_MARKETS: Record<FiveEyesMemberIsoCode, readonly BondMarketVenue[]> = {
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
  GB: [
    b(
      'London Stock Exchange (LSE) — Main Market / ORB (Order book for Retail Bonds)',
      'https://www.londonstockexchange.com',
      'info@londonstockexchange.com',
      'https://x.com/LSEplc',
      'https://www.linkedin.com/company/london-stock-exchange/',
      '',
    ),
    b(
      'UK Debt Management Office (DMO — sovereign primary)',
      'https://www.dmo.gov.uk',
      'enquiries@dmo.gov.uk',
      'https://x.com/UKDMO',
      'https://www.linkedin.com/company/debt-management-office/',
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
}
