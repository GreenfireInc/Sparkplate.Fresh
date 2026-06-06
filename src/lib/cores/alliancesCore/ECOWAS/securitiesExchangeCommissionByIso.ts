import type { EcowasMemberIsoCode } from './ecowasMemberIsoCodes'
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

/** UEMOA regional capital-markets regulator shared by BJ, GW, SN, TG. */
const CREPMF = sec(
  'Conseil Régional de l\'Épargne Publique et des Marchés Financiers (CREPMF)',
  'https://www.crepmf.org',
  'crepmf@crepmf.org',
  '',
  'https://www.linkedin.com/company/crepmf/',
  'https://www.crepmf.org',
)

/**
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for ECOWAS member
 * states in this module (informational; verify URLs, handles, forms portals, and API bases
 * before production use). Self-contained — no imports from other alliance modules.
 * Note: Mali, Burkina Faso, and Niger withdrew from ECOWAS (2024) and are not in this module.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const ECOWAS_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  EcowasMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  BJ: CREPMF,
  CV: sec(
    'Comissão do Mercado de Valores Mobiliários de Cabo Verde (CMVM-CV)',
    'https://www.cmvm.cv',
    'info@cmvm.cv',
    '',
    '',
    'https://www.cmvm.cv',
  ),
  GM: sec(
    'Gambia — capital-markets oversight via Central Bank of The Gambia (no dedicated SEC)',
    'https://www.cbg.gm',
    'info@cbg.gm',
    '',
    '',
    'https://www.cbg.gm',
  ),
  GH: sec(
    'Securities and Exchange Commission Ghana (SEC Ghana)',
    'https://www.sec.gov.gh',
    'sec@sec.gov.gh',
    'https://x.com/SECGhana',
    'https://www.linkedin.com/company/securities-and-exchange-commission-ghana/',
    'https://www.sec.gov.gh',
  ),
  GN: sec(
    'Guinea — capital-markets oversight via Banque Centrale de la République de Guinée (no dedicated SEC)',
    'https://www.bcrg-guinee.org',
    '',
    '',
    '',
    'https://www.bcrg-guinee.org',
  ),
  GW: CREPMF,
  CI: sec(
    'Autorité des Marchés Financiers de Côte d\'Ivoire (AMF-CI)',
    'https://www.amf-ci.org',
    'contact@amf-ci.org',
    '',
    '',
    'https://www.amf-ci.org',
  ),
  LR: sec(
    'Liberia — capital-markets oversight via Central Bank of Liberia (no dedicated SEC)',
    'https://www.cbl.org.lr',
    'info@cbl.org.lr',
    '',
    '',
    'https://www.cbl.org.lr',
  ),
  NG: sec(
    'Securities and Exchange Commission Nigeria (SEC Nigeria)',
    'https://www.sec.gov.ng',
    'sec@sec.gov.ng',
    'https://x.com/SECNigeria',
    'https://www.linkedin.com/company/securities-and-exchange-commission-nigeria/',
    'https://www.sec.gov.ng',
  ),
  SN: CREPMF,
  SL: sec(
    'Sierra Leone — capital-markets oversight via Bank of Sierra Leone (no dedicated SEC)',
    'https://www.bsl.gov.sl',
    'info@bsl.gov.sl',
    '',
    '',
    'https://www.bsl.gov.sl',
  ),
  TG: CREPMF,
}
