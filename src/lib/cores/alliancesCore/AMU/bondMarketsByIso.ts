import type { AmuMemberIsoCode } from './amuMemberIsoCodes'
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
 * Bond market venues by ISO 3166-1 alpha-2 for Arab Maghreb Union (AMU) founding members
 * (informational; verify URLs, handles, and API bases before production use). Pattern:
 *   - National listed-bond exchanges (DZ SGBV, MA Casablanca, TN BVMT, LY LSM) appear as
 *     the primary entry.
 *   - Morocco also lists the Trésor du Royaume (Direction du Trésor) for sovereign primary
 *     auctions alongside Bourse de Casablanca secondary trading.
 *   - Mauritania (MR) has no listed bond venue — the central bank's T-bills desk is listed.
 * `apiEndpoint` is the empty string for the vast majority of Maghreb venues — distribution
 * is almost always via paid Bloomberg / Refinitiv / IRESS feeds rather than public REST.
 * Verify periodically.
 */
export const AMU_BOND_MARKETS: Record<AmuMemberIsoCode, readonly BondMarketVenue[]> = {
  DZ: [
    b(
      'Bourse d\'Alger (Société de Gestion de la Bourse des Valeurs — SGBV)',
      'https://www.sgbv.dz',
      'contact@sgbv.dz',
      '',
      '',
      '',
    ),
  ],
  LY: [
    b(
      'Libyan Stock Market (LSM)',
      'https://www.lsm.ly',
      'info@lsm.ly',
      '',
      '',
      '',
    ),
  ],
  MR: [
    b(
      'Banque Centrale de Mauritanie (T-bills desk; no listed bond venue)',
      'https://www.bcm.mr',
      'bcm@bcm.mr',
      '',
      '',
      '',
    ),
  ],
  MA: [
    b(
      'Bourse de Casablanca',
      'https://www.casablanca-bourse.com',
      'contact@casablanca-bourse.com',
      '',
      'https://www.linkedin.com/company/bourse-de-casablanca/',
      '',
    ),
    b(
      'Trésor du Royaume du Maroc — Direction du Trésor (sovereign primary)',
      'https://www.finances.gov.ma',
      'contact@dtfe.gov.ma',
      '',
      '',
      '',
    ),
  ],
  TN: [
    b(
      'Bourse de Tunis (BVMT)',
      'https://www.bvmt.com.tn',
      'bvmt@bvmt.com.tn',
      '',
      'https://www.linkedin.com/company/bourse-de-tunis/',
      '',
    ),
  ],
}
