import type { OecsMemberIsoCode } from './oecsMemberIsoCodes'
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

/** Eastern Caribbean Securities Regulatory Commission — shared by all OECS members. */
const ECSRC = sec(
  'Eastern Caribbean Securities Regulatory Commission (ECSRC)',
  'https://www.ecsrc.com',
  'ecsrc@ecsrc.com',
  '',
  'https://www.linkedin.com/company/eastern-caribbean-securities-regulatory-commission/',
  'https://www.ecsrc.com',
)

/**
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for OECS
 * member states in this module (informational; verify URLs, handles, forms portals,
 * and API bases before production use). Self-contained — no imports from other alliance
 * modules. All OECS members share the Eastern Caribbean Securities Regulatory Commission
 * (ECSRC) as the regional capital-markets regulator. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const OECS_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  OecsMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  AG: ECSRC,
  DM: ECSRC,
  GD: ECSRC,
  MS: ECSRC,
  KN: ECSRC,
  LC: ECSRC,
  VC: ECSRC,
  AI: ECSRC,
}
