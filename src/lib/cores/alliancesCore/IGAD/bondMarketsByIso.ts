import type { IgadMemberIsoCode } from './igadMemberIsoCodes'
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
 * Bond market venues by ISO 3166-1 alpha-2 for IGAD members in this module (informational;
 * verify URLs, handles, and API bases before production use). Horn of Africa and East
 * Africa corridor — exchange + CB desk where listed venues exist; CB-only elsewhere.
 */
export const IGAD_BOND_MARKETS: Record<IgadMemberIsoCode, readonly BondMarketVenue[]> = {
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
