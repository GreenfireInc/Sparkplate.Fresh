import type { CensadMemberIsoCode } from './censadMemberIsoCodes'
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

/** UEMOA regional capital-markets regulator shared by BJ, BF, GW, ML, NE, SN, TG. */
const CREPMF = sec(
  'Conseil Régional de l\'Épargne Publique et des Marchés Financiers (CREPMF)',
  'https://www.crepmf.org',
  'crepmf@crepmf.org',
  '',
  'https://www.linkedin.com/company/crepmf/',
  'https://www.crepmf.org',
)

/**
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for CEN-SAD
 * member states in this module (informational; verify URLs, handles, forms portals, and API
 * bases before production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const CENSAD_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  CensadMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  BJ: CREPMF,
  BF: CREPMF,
  CF: sec(
    'Commission de Surveillance du Marché Financier de l\'Afrique Centrale (COSUMAF)',
    'https://www.cosumaf.org',
    'cosumaf@cosumaf.org',
    '',
    '',
    'https://www.cosumaf.org',
  ),
  TD: sec(
    'Commission de Surveillance du Marché Financier de l\'Afrique Centrale (COSUMAF)',
    'https://www.cosumaf.org',
    'cosumaf@cosumaf.org',
    '',
    '',
    'https://www.cosumaf.org',
  ),
  KM: sec(
    'Comores — capital-markets oversight via Banque Centrale des Comores (no dedicated SEC)',
    'https://www.banque-comores.km',
    '',
    '',
    '',
    'https://www.banque-comores.km',
  ),
  DJ: sec(
    'Djibouti — capital markets oversight via Ministry of Finance (no dedicated SEC)',
    'https://www.ministere-finances.dj',
    '',
    '',
    '',
    'https://www.ministere-finances.dj',
  ),
  EG: sec(
    'Financial Regulatory Authority (FRA Egypt)',
    'https://www.fra.gov.eg',
    'fra@fra.gov.eg',
    'https://x.com/FRAegypt',
    'https://www.linkedin.com/company/financial-regulatory-authority-egypt/',
    'https://www.fra.gov.eg',
  ),
  ER: sec(
    'Eritrea — no formal securities / capital-markets regulator documented',
    'https://www.eritrea.be',
    '',
    '',
    '',
    'https://www.eritrea.be',
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
  LY: sec(
    'Libya Financial Markets Authority (LFMA) — verify current operational status',
    'https://www.lsm.ly',
    '',
    '',
    '',
    'https://www.lsm.ly',
  ),
  ML: CREPMF,
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
  NE: CREPMF,
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
  SO: sec(
    'Somalia — capital-markets oversight via Central Bank of Somalia (no dedicated SEC)',
    'https://www.centralbank.gov.so',
    '',
    '',
    '',
    'https://www.centralbank.gov.so',
  ),
  SD: sec(
    'Sudan Capital Market Authority (CMA Sudan)',
    'https://www.cma.gov.sd',
    '',
    '',
    '',
    'https://www.cma.gov.sd',
  ),
  TG: CREPMF,
  TN: sec(
    'Conseil du Marché Financier (CMF Tunisie)',
    'https://www.cmf.gov.tn',
    'cmf@cmf.gov.tn',
    '',
    'https://www.linkedin.com/company/conseil-du-marché-financier-tunisie/',
    'https://www.cmf.gov.tn',
  ),
}
