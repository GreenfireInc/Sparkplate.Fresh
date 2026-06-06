import type { IgadMemberIsoCode } from './igadMemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for IGAD
 * member states in this module (informational; verify URLs, handles, forms portals,
 * and API bases before production use). Self-contained — no imports from other alliance
 * modules. `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const IGAD_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  IgadMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  DJ: sec(
    'Banque Centrale de Djibouti — capital-markets oversight (no dedicated SEC)',
    'https://www.banque-centrale.dj',
    '',
    '',
    '',
    'https://www.banque-centrale.dj',
  ),
  ET: sec(
    'Ethiopian Capital Market Authority (ECMA)',
    'https://www.ecma.gov.et',
    'info@ecma.gov.et',
    '',
    'https://www.linkedin.com/company/ethiopian-capital-market-authority/',
    'https://www.ecma.gov.et',
  ),
  KE: sec(
    'Capital Markets Authority Kenya (CMA Kenya)',
    'https://www.cma.or.ke',
    'cma@cma.or.ke',
    'https://x.com/CMA_Kenya',
    'https://www.linkedin.com/company/capital-markets-authority-kenya/',
    'https://www.cma.or.ke',
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
  SD: sec(
    'Capital Market Authority Sudan (CMA Sudan)',
    'https://www.cma.gov.sd',
    'info@cma.gov.sd',
    '',
    '',
    'https://www.cma.gov.sd',
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
