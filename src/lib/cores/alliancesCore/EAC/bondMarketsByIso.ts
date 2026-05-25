import type { EacMemberIsoCode } from './eacMemberIsoCodes'
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
 * Bond market venues by ISO 3166-1 alpha-2 for EAC (East African Community) partner
 * states in this module (informational; verify URLs, handles, and API bases before
 * production use). Pattern:
 *   - National listed-bond exchanges (NSE, DSE, USE, RSE) appear as the primary entry.
 *   - Major sovereign markets list exchange + treasury / central-bank desk (KE, TZ, UG).
 *   - Countries with no listed bond venue use the central bank's Treasury bill / bond desk.
 * `apiEndpoint` is the empty string for virtually all venues — distribution via paid
 * Bloomberg / Refinitiv / vendor feeds. Verify periodically.
 */
export const EAC_BOND_MARKETS: Record<EacMemberIsoCode, readonly BondMarketVenue[]> = {
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
}
