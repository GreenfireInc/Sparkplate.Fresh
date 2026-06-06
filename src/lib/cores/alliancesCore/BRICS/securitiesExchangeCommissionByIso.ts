import type { BricsMemberIsoCode } from './bricsMemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for BRICS founding
 * members in this module (informational; verify URLs, handles, forms portals, and API bases
 * before production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const BRICS_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  BricsMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  BR: sec(
    'Comissão de Valores Mobiliários (CVM Brazil)',
    'https://www.gov.br/cvm',
    'cvm@cvm.gov.br',
    'https://x.com/CVMBrasil',
    'https://www.linkedin.com/company/cvm-comiss%C3%A3o-de-valores-mobili%C3%A1rios/',
    'https://www.gov.br/cvm',
  ),
  RU: sec(
    'Bank of Russia — securities market supervision',
    'https://www.cbr.ru',
    'info@cbr.ru',
    'https://x.com/BankofRussia',
    'https://www.linkedin.com/company/central-bank-of-russian-federation/',
    'https://www.cbr.ru',
  ),
  IN: sec(
    'Securities and Exchange Board of India (SEBI)',
    'https://www.sebi.gov.in',
    'sebi@sebi.gov.in',
    'https://x.com/SEBI_India',
    'https://www.linkedin.com/company/securities-and-exchange-board-of-india/',
    'https://www.sebi.gov.in',
  ),
  CN: sec(
    'China Securities Regulatory Commission (CSRC)',
    'http://www.csrc.gov.cn',
    '',
    '',
    '',
    'http://www.csrc.gov.cn',
  ),
  ZA: sec(
    'Financial Sector Conduct Authority (FSCA South Africa)',
    'https://www.fsca.co.za',
    'info@fsca.co.za',
    'https://x.com/theFSCA_ZA',
    'https://www.linkedin.com/company/financial-sector-conduct-authority/',
    'https://www.fsca.co.za',
  ),
}
