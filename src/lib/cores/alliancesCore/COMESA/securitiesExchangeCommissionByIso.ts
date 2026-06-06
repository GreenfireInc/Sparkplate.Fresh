import type { ComesaMemberIsoCode } from './comesaMemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for COMESA
 * member states in this module (informational; verify URLs, handles, forms portals, and API
 * bases before production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const COMESA_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  ComesaMemberIsoCode,
  SecuritiesExchangeCommission
> = {
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
  ET: sec(
    'Ethiopian Capital Market Authority (ECMA)',
    'https://www.ecma.gov.et',
    'info@ecma.gov.et',
    'https://x.com/ECMAEthiopia',
    'https://www.linkedin.com/company/ethiopian-capital-market-authority/',
    'https://www.ecma.gov.et',
  ),
  LY: sec(
    'Libya Financial Markets Authority (LFMA) — verify current operational status',
    'https://www.lsm.ly',
    '',
    '',
    '',
    'https://www.lsm.ly',
  ),
  SD: sec(
    'Sudan Capital Market Authority (CMA Sudan)',
    'https://www.cma.gov.sd',
    '',
    '',
    '',
    'https://www.cma.gov.sd',
  ),
  TN: sec(
    'Conseil du Marché Financier (CMF Tunisie)',
    'https://www.cmf.gov.tn',
    'cmf@cmf.gov.tn',
    '',
    'https://www.linkedin.com/company/conseil-du-marché-financier-tunisie/',
    'https://www.cmf.gov.tn',
  ),
  KM: sec(
    'Comores — capital-markets oversight via Banque Centrale des Comores (no dedicated SEC)',
    'https://www.banque-comores.km',
    '',
    '',
    '',
    'https://www.banque-comores.km',
  ),
  MG: sec(
    'Commission de Surveillance du Marché de l\'Épargne et des Capitaux (CSMEC Madagascar)',
    'https://www.csmec.mg',
    'csmec@csmec.mg',
    '',
    '',
    'https://www.csmec.mg',
  ),
  MU: sec(
    'Financial Services Commission Mauritius (FSC)',
    'https://www.fscmauritius.org',
    'fscmauritius@fscmauritius.org',
    'https://x.com/FSCMauritius',
    'https://www.linkedin.com/company/financial-services-commission-mauritius/',
    'https://www.fscmauritius.org',
  ),
  SC: sec(
    'Financial Services Authority Seychelles (FSA)',
    'https://www.fsaseychelles.sc',
    'fsaseychelles@fsaseychelles.sc',
    '',
    'https://www.linkedin.com/company/financial-services-authority-seychelles/',
    'https://www.fsaseychelles.sc',
  ),
  BI: sec(
    'Banque de la République du Burundi — capital-markets oversight (no dedicated SEC)',
    'https://www.brb.bi',
    'info@brb.bi',
    '',
    '',
    'https://www.brb.bi',
  ),
  KE: sec(
    'Capital Markets Authority Kenya (CMA Kenya)',
    'https://www.cma.or.ke',
    'cma@cma.or.ke',
    'https://x.com/CMA_Kenya',
    'https://www.linkedin.com/company/capital-markets-authority-kenya/',
    'https://www.cma.or.ke',
  ),
  MW: sec(
    'Reserve Bank of Malawi — Capital Markets Unit (no separate SEC)',
    'https://www.rbm.mw',
    'info@rbm.mw',
    '',
    '',
    'https://www.rbm.mw',
  ),
  RW: sec(
    'Capital Markets Authority Rwanda (CMA Rwanda)',
    'https://www.cma.rw',
    'info@cma.rw',
    'https://x.com/CMA_Rwanda',
    'https://www.linkedin.com/company/capital-markets-authority-rwanda/',
    'https://www.cma.rw',
  ),
  UG: sec(
    'Capital Markets Authority Uganda (CMA Uganda)',
    'https://www.cmauganda.co.ug',
    'cma@cmauganda.co.ug',
    'https://x.com/CMAUganda',
    'https://www.linkedin.com/company/capital-markets-authority-uganda/',
    'https://www.cmauganda.co.ug',
  ),
  SZ: sec(
    'Financial Services Regulatory Authority Eswatini (FSRA)',
    'https://www.fsra.co.sz',
    'info@fsra.co.sz',
    '',
    '',
    'https://www.fsra.co.sz',
  ),
  ZM: sec(
    'Securities and Exchange Commission Zambia (SEC Zambia)',
    'https://www.sec.gov.zm',
    'info@sec.gov.zm',
    'https://x.com/SECZambia',
    'https://www.linkedin.com/company/securities-and-exchange-commission-zambia/',
    'https://www.sec.gov.zm',
  ),
  ZW: sec(
    'Securities and Exchange Commission of Zimbabwe (SECZ)',
    'https://www.secz.org.zw',
    'secz@secz.org.zw',
    '',
    '',
    'https://www.secz.org.zw',
  ),
  CD: sec(
    'Autorité des Marchés Financiers — DRC (oversight via Banque Centrale du Congo)',
    'https://www.bcc.cd',
    'info@bcc.cd',
    '',
    '',
    'https://www.bcc.cd',
  ),
}
