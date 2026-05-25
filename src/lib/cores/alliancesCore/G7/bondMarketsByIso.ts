import type { G7MemberIsoCode } from './g7MemberIsoCodes'
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
 * Bond market venues by ISO 3166-1 alpha-2 for G7 members in this module (informational;
 * verify URLs, handles, and API bases before production use). All seven are among the world's
 * largest sovereign-bond markets with listed exchanges and sovereign primary desks.
 */
export const G7_BOND_MARKETS: Record<G7MemberIsoCode, readonly BondMarketVenue[]> = {
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
  DE: [
    b(
      'Frankfurt Stock Exchange (Deutsche Börse) — Xetra Bonds',
      'https://www.deutsche-boerse.com',
      'info@deutsche-boerse.com',
      'https://x.com/deutscheboerse',
      'https://www.linkedin.com/company/deutsche-boerse/',
      '',
    ),
    b(
      'Bundesrepublik Deutschland — Finanzagentur (sovereign primary)',
      'https://www.deutsche-finanzagentur.de',
      'info@finanzagentur.de',
      'https://x.com/Finanzagentur',
      'https://www.linkedin.com/company/deutsche-finanzagentur/',
      '',
    ),
  ],
  IT: [
    b(
      'Euronext Milan (Borsa Italiana) — MOT / EuroTLX bond segment',
      'https://www.borsaitaliana.it',
      'info@borsaitaliana.it',
      'https://x.com/borsaitaliana',
      'https://www.linkedin.com/company/borsa-italiana/',
      '',
    ),
    b(
      'Ministero dell\'Economia e delle Finanze — Dipartimento del Tesoro (sovereign primary)',
      'https://www.mef.gov.it',
      'info@dt.mef.gov.it',
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
