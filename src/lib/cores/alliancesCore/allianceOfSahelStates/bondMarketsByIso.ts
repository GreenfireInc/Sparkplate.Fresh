import type { AesMemberIsoCode } from './aesMemberIsoCodes'
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
 * Bourse Régionale des Valeurs Mobilières — the single regional listed exchange for the
 * eight UEMOA / West African CFA franc-zone states (BJ, BF, CI, GW, ML, NE, SN, TG).
 * All three Alliance of Sahel States founding members (Burkina Faso, Mali, Niger) list
 * sovereign and corporate bonds on BRVM alongside equities. Headquartered in Abidjan.
 * No free public REST API — daily price / yield bulletins are published as PDF / Excel
 * and commercial feeds are distributed via Bloomberg / Refinitiv.
 */
const BRVM = b(
  'BRVM (Bourse Régionale des Valeurs Mobilières)',
  'https://www.brvm.org',
  'info@brvm.org',
  'https://x.com/brvm_officiel',
  'https://www.linkedin.com/company/brvm/',
  '',
)

/**
 * Bond market venues by ISO 3166-1 alpha-2 for Alliance of Sahel States founding members
 * (informational; verify URLs, handles, and API bases before production use). All three
 * AES members (BF, ML, NE) are UEMOA / West African CFA franc-zone economies whose sovereign
 * and corporate bonds trade on BRVM. National Trésor / debt-management offices conduct
 * primary auctions but secondary listing and trading occur through the regional exchange.
 * `apiEndpoint` is the empty string — distribution is via paid Bloomberg / Refinitiv /
 * IRESS feeds rather than public REST. Verify periodically.
 */
export const AES_BOND_MARKETS: Record<AesMemberIsoCode, readonly BondMarketVenue[]> = {
  BF: [BRVM],
  ML: [BRVM],
  NE: [BRVM],
}
