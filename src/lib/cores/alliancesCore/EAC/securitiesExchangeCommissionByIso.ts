import type { EacMemberIsoCode } from './eacMemberIsoCodes'
import type { SecuritiesExchangeCommission } from './types'

function sec(
  name: string,
  website: string,
  email: string,
  twitter: string,
  linkedin: string,
  formsUrl: string,
  apiEndpoint = '',
): SecuritiesExchangeCommission {
  return { name, website, email, twitter, linkedin, formsUrl, apiEndpoint }
}

/**
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for East African
 * Community member states in this module (informational; verify URLs, handles, forms portals,
 * and API bases before production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const EAC_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  EacMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  BI: sec(
    'Banque de la République du Burundi — capital-markets oversight (no dedicated SEC)',
    'https://www.brb.bi',
    'info@brb.bi',
    '',
    '',
    'https://www.brb.bi',
  ),
  CD: sec(
    'Autorité des Marchés Financiers — DRC (oversight via Banque Centrale du Congo)',
    'https://www.bcc.cd',
    'info@bcc.cd',
    '',
    '',
    'https://www.bcc.cd',
  ),
  KE: sec(
    'Capital Markets Authority Kenya (CMA Kenya)',
    'https://www.cma.or.ke',
    'cma@cma.or.ke',
    'https://x.com/CMA_Kenya',
    'https://www.linkedin.com/company/capital-markets-authority-kenya/',
    'https://www.cma.or.ke',
  ),
  RW: sec(
    'Capital Markets Authority Rwanda (CMA Rwanda)',
    'https://www.cma.rw',
    'info@cma.rw',
    'https://x.com/CMA_Rwanda',
    'https://www.linkedin.com/company/capital-markets-authority-rwanda/',
    'https://www.cma.rw',
  ),
  SO: sec(
    'Somalia — capital-markets oversight via Central Bank of Somalia (no dedicated SEC)',
    'https://www.centralbank.gov.so',
    '',
    '',
    '',
    'https://www.centralbank.gov.so',
  ),
  SS: sec(
    'South Sudan — capital-markets oversight via Bank of South Sudan (nascent SSSE; verify status)',
    'https://www.bss.gov.ss',
    '',
    '',
    '',
    'https://www.bss.gov.ss',
  ),
  TZ: sec(
    'Capital Markets and Securities Authority Tanzania (CMSA)',
    'https://www.cmsa.go.tz',
    'cmsa@cmsa.go.tz',
    'https://x.com/CMSATanzania',
    'https://www.linkedin.com/company/capital-markets-and-securities-authority-tanzania/',
    'https://www.cmsa.go.tz',
  ),
  UG: sec(
    'Capital Markets Authority Uganda (CMA Uganda)',
    'https://www.cmauganda.co.ug',
    'cma@cmauganda.co.ug',
    'https://x.com/CMAUganda',
    'https://www.linkedin.com/company/capital-markets-authority-uganda/',
    'https://www.cmauganda.co.ug',
  ),
}
