import type { AesMemberIsoCode } from './aesMemberIsoCodes'
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

/** UEMOA regional capital-markets regulator shared by BF, ML, and NE. */
const CREPMF = sec(
  'Conseil Régional de l\'Épargne Publique et des Marchés Financiers (CREPMF)',
  'https://www.crepmf.org',
  'crepmf@crepmf.org',
  '',
  'https://www.linkedin.com/company/crepmf/',
  'https://www.crepmf.org',
)

/**
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for Alliance of
 * Sahel States founding members in this module (informational; verify URLs, handles, forms
 * portals, and API bases before production use). Self-contained — no imports from other
 * alliance modules. All three AES members are UEMOA states supervised regionally by CREPMF.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.asea.net / https://www.iosco.org/about/membership/
 */
export const AES_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  AesMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  BF: CREPMF,
  ML: CREPMF,
  NE: CREPMF,
}
