import type { OpecMemberIsoCode } from './opecMemberIsoCodes'
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

/** CEMAC regional capital-markets regulator shared by CG, GQ, and GA. */
const COSUMAF = sec(
  'Commission de Surveillance du Marché Financier de l\'Afrique Centrale (COSUMAF)',
  'https://www.cosumaf.org',
  'cosumaf@cosumaf.org',
  '',
  '',
  'https://www.cosumaf.org',
)

/**
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for OPEC
 * member states in this module (informational; verify URLs, handles, forms portals,
 * and API bases before production use). Self-contained — no imports from other alliance
 * modules. `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const OPEC_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  OpecMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  DZ: sec(
    'Commission d\'Organisation et de Surveillance des Opérations de Bourse (COSOB Algeria)',
    'https://www.cosob.org',
    'cosob@cosob.org',
    '',
    'https://www.linkedin.com/company/cosob/',
    'https://www.cosob.org',
  ),
  CG: COSUMAF,
  GQ: COSUMAF,
  GA: COSUMAF,
  IR: sec(
    'Securities and Exchange Organization (SEO Iran)',
    'https://www.seo.ir',
    'info@seo.ir',
    '',
    'https://www.linkedin.com/company/securities-and-exchange-organization-of-iran/',
    'https://www.seo.ir',
  ),
  IQ: sec(
    'Iraq Securities Commission (ISC)',
    'https://www.isc.gov.iq',
    'info@isc.gov.iq',
    '',
    '',
    'https://www.isc.gov.iq',
  ),
  KW: sec(
    'Capital Markets Authority Kuwait (CMA Kuwait)',
    'https://www.cma.gov.kw',
    'info@cma.gov.kw',
    'https://x.com/CMA_Kuwait',
    'https://www.linkedin.com/company/capital-markets-authority-kuwait/',
    'https://www.cma.gov.kw',
  ),
  LY: sec(
    'Libya Stock Market (LSM) — securities oversight (no dedicated standalone SEC; verify status)',
    'https://www.lsm.ly',
    '',
    '',
    '',
    'https://www.lsm.ly',
  ),
  NG: sec(
    'Securities and Exchange Commission Nigeria (SEC Nigeria)',
    'https://www.sec.gov.ng',
    'sec@sec.gov.ng',
    'https://x.com/SECNigeria',
    'https://www.linkedin.com/company/securities-and-exchange-commission-nigeria/',
    'https://www.sec.gov.ng',
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
  VE: sec(
    'Superintendencia Nacional de Valores (SUNAVAL Venezuela)',
    'https://www.sunaval.gob.ve',
    'sunaval@sunaval.gob.ve',
    '',
    '',
    'https://www.sunaval.gob.ve',
  ),
}
