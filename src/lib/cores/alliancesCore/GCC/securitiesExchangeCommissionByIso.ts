import type { GccMemberIsoCode } from './gccMemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for GCC
 * member states in this module (informational; verify URLs, handles, forms portals,
 * and API bases before production use). Self-contained — no imports from other alliance
 * modules. `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const GCC_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  GccMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  BH: sec(
    'Central Bank of Bahrain (CBB) — capital-markets supervision',
    'https://www.cbb.gov.bh',
    'cbb@cbb.gov.bh',
    'https://x.com/CBBBahrain',
    'https://www.linkedin.com/company/central-bank-of-bahrain/',
    'https://www.cbb.gov.bh',
  ),
  KW: sec(
    'Capital Markets Authority Kuwait (CMA Kuwait)',
    'https://www.cma.gov.kw',
    'info@cma.gov.kw',
    'https://x.com/CMA_Kuwait',
    'https://www.linkedin.com/company/capital-markets-authority-kuwait/',
    'https://www.cma.gov.kw',
  ),
  OM: sec(
    'Capital Market Authority Oman (CMA Oman)',
    'https://www.cma.gov.om',
    'info@cma.gov.om',
    'https://x.com/CMA_Oman',
    'https://www.linkedin.com/company/capital-market-authority-oman/',
    'https://www.cma.gov.om',
  ),
  QA: sec(
    'Qatar Financial Markets Authority (QFMA)',
    'https://www.qfma.org.qa',
    'qfma@qfma.org.qa',
    'https://x.com/QFMAQatar',
    'https://www.linkedin.com/company/qatar-financial-markets-authority/',
    'https://www.qfma.org.qa',
  ),
  SA: sec(
    'Capital Market Authority Saudi Arabia (CMA)',
    'https://www.cma.org.sa',
    'cma@cma.org.sa',
    'https://x.com/CMA_Saudi',
    'https://www.linkedin.com/company/capital-market-authority-saudi-arabia/',
    'https://www.cma.org.sa',
  ),
  AE: sec(
    'Securities and Commodities Authority (SCA UAE)',
    'https://www.sca.gov.ae',
    'sca@sca.gov.ae',
    'https://x.com/SCA_UAE',
    'https://www.linkedin.com/company/securities-and-commodities-authority/',
    'https://www.sca.gov.ae',
  ),
}
