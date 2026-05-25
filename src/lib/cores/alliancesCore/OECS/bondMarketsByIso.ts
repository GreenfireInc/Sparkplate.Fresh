import type { OecsMemberIsoCode } from './oecsMemberIsoCodes'
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
 * Eastern Caribbean Securities Exchange — regional listed exchange for ECCU / XCD economies.
 */
const ECSE = b(
  'Eastern Caribbean Securities Exchange (ECSE)',
  'https://www.ecseonline.com',
  'info@ecseonline.com',
  '',
  '',
  '',
)

/** Bond market venues for OECS members — all share ECSE (informational; verify periodically). */
export const OECS_BOND_MARKETS: Record<OecsMemberIsoCode, readonly BondMarketVenue[]> = {
  AG: [
    ECSE,
  ],
  DM: [
    ECSE,
  ],
  GD: [
    ECSE,
  ],
  MS: [
    ECSE,
  ],
  KN: [
    ECSE,
  ],
  LC: [
    ECSE,
  ],
  VC: [
    ECSE,
  ],
  AI: [
    ECSE,
  ],
}
