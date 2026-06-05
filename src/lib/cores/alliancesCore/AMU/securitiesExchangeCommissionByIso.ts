import type { AmuMemberIsoCode } from './amuMemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for Arab Maghreb
 * Union founding members in this module (informational; verify URLs, handles, forms portals,
 * and API bases before production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.asea.net / https://www.iosco.org/about/membership/
 */
export const AMU_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  AmuMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  DZ: sec(
    'Commission d\'Organisation et de Surveillance des Opérations de Bourse (COSOB)',
    'https://www.cosob.org',
    'cosob@cosob.org',
    '',
    '',
    'https://www.cosob.org',
  ),
  LY: sec(
    'Libya Financial Markets Authority (LFMA) — verify current operational status',
    'https://www.lsm.ly',
    '',
    '',
    '',
    'https://www.lsm.ly',
  ),
  MR: sec(
    'Mauritania — capital-markets oversight via Banque Centrale de Mauritanie (no dedicated SEC)',
    'https://www.bcm.mr',
    '',
    '',
    '',
    'https://www.bcm.mr',
  ),
  MA: sec(
    'Autorité Marocaine du Marché des Capitaux (AMMC)',
    'https://www.ammc.ma',
    'ammc@ammc.ma',
    'https://x.com/AMMC_maroc',
    'https://www.linkedin.com/company/ammc/',
    'https://www.ammc.ma',
  ),
  TN: sec(
    'Conseil du Marché Financier (CMF Tunisie)',
    'https://www.cmf.gov.tn',
    'cmf@cmf.gov.tn',
    '',
    'https://www.linkedin.com/company/conseil-du-marché-financier-tunisie/',
    'https://www.cmf.gov.tn',
  ),
}
