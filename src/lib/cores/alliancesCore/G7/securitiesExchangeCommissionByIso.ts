import type { G7MemberIsoCode } from './g7MemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for G7
 * member states in this module (informational; verify URLs, handles, forms portals,
 * and API bases before production use). Self-contained — no imports from other alliance
 * modules. `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const G7_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  G7MemberIsoCode,
  SecuritiesExchangeCommission
> = {
  CA: sec(
    'Canadian Securities Administrators (CSA)',
    'https://www.securities-administrators.ca',
    'info@csa-acvm.ca',
    'https://x.com/CSA_News',
    'https://www.linkedin.com/company/canadian-securities-administrators/',
    'https://www.securities-administrators.ca',
  ),
  FR: sec(
    'Autorité des marchés financiers (AMF France)',
    'https://www.amf-france.org',
    'relationsemet@amf-france.org',
    'https://x.com/AMF_actu',
    'https://www.linkedin.com/company/autorité-des-marchés-financiers-amf/',
    'https://www.amf-france.org',
  ),
  DE: sec(
    'Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin)',
    'https://www.bafin.de',
    'poststelle@bafin.de',
    'https://x.com/BaFin_de',
    'https://www.linkedin.com/company/bafin/',
    'https://www.bafin.de',
  ),
  IT: sec(
    'Commissione Nazionale per le Società e la Borsa (CONSOB)',
    'https://www.consob.it',
    'consob@consob.it',
    'https://x.com/consob_it',
    'https://www.linkedin.com/company/consob/',
    'https://www.consob.it',
  ),
  JP: sec(
    'Financial Services Agency Japan (FSA)',
    'https://www.fsa.go.jp',
    'info@fsa.go.jp',
    'https://x.com/FSA_JAPAN',
    'https://www.linkedin.com/company/financial-services-agency-japan/',
    'https://www.fsa.go.jp',
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
