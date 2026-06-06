import type { FiveEyesMemberIsoCode } from './fiveEyesMemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for Five Eyes
 * member states in this module (informational; verify URLs, handles, forms portals, and API
 * bases before production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const FIVE_EYES_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  FiveEyesMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  AU: sec(
    'Australian Securities and Investments Commission (ASIC)',
    'https://asic.gov.au',
    'enquiries@asic.gov.au',
    'https://x.com/ASICConnect',
    'https://www.linkedin.com/company/asic/',
    'https://asic.gov.au/online-services/',
  ),
  CA: sec(
    'Canadian Securities Administrators (CSA)',
    'https://www.securities-administrators.ca',
    'info@csa-acvm.ca',
    'https://x.com/CSA_News',
    'https://www.linkedin.com/company/canadian-securities-administrators/',
    'https://www.securities-administrators.ca',
  ),
  NZ: sec(
    'Financial Markets Authority (FMA New Zealand)',
    'https://www.fma.govt.nz',
    'info@fma.govt.nz',
    'https://x.com/FMANZgov',
    'https://www.linkedin.com/company/financial-markets-authority/',
    'https://www.fma.govt.nz',
  ),
  GB: sec(
    'Financial Conduct Authority (FCA United Kingdom)',
    'https://www.fca.org.uk',
    'consumer.queries@fca.org.uk',
    'https://x.com/TheFCA',
    'https://www.linkedin.com/company/financial-conduct-authority/',
    'https://www.fca.org.uk',
  ),
  US: sec(
    'U.S. Securities and Exchange Commission (SEC)',
    'https://www.sec.gov',
    'help@sec.gov',
    'https://x.com/SECGov',
    'https://www.linkedin.com/company/us-securities-and-exchange-commission/',
    'https://www.sec.gov/forms',
  ),
}
