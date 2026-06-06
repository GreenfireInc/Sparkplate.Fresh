import type { EccasMemberIsoCode } from './eccasMemberIsoCodes'
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

/** CEMAC regional capital-markets regulator shared by CF, TD, GQ, GA, CG (and CM has its own national CMF). */
const COSUMAF = sec(
  'Commission de Surveillance du Marché Financier de l\'Afrique Centrale (COSUMAF)',
  'https://www.cosumaf.org',
  'cosumaf@cosumaf.org',
  '',
  '',
  'https://www.cosumaf.org',
)

/**
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for ECCAS member
 * states in this module (informational; verify URLs, handles, forms portals, and API bases
 * before production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const ECCAS_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  EccasMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  AO: sec(
    'Comissão do Mercado de Capitais (CMC Angola)',
    'https://www.cmc.gv.ao',
    'cmc@cmc.gv.ao',
    '',
    'https://www.linkedin.com/company/comissão-do-mercado-de-capitais-angola/',
    'https://www.cmc.gv.ao',
  ),
  BI: sec(
    'Banque de la République du Burundi — capital-markets oversight (no dedicated SEC)',
    'https://www.brb.bi',
    'info@brb.bi',
    '',
    '',
    'https://www.brb.bi',
  ),
  CM: sec(
    'Commission des Marchés Financiers du Cameroun (CMF)',
    'https://www.cmf.cm',
    'cmf@cmf.cm',
    '',
    'https://www.linkedin.com/company/commission-des-marchés-financiers-du-cameroun/',
    'https://www.cmf.cm',
  ),
  CF: COSUMAF,
  TD: COSUMAF,
  CD: sec(
    'Autorité des Marchés Financiers — DRC (oversight via Banque Centrale du Congo)',
    'https://www.bcc.cd',
    'info@bcc.cd',
    '',
    '',
    'https://www.bcc.cd',
  ),
  GQ: COSUMAF,
  GA: COSUMAF,
  CG: COSUMAF,
  ST: sec(
    'Banco Central de São Tomé e Príncipe — capital-markets oversight (no dedicated SEC)',
    'https://www.bcstp.st',
    '',
    '',
    '',
    'https://www.bcstp.st',
  ),
}
