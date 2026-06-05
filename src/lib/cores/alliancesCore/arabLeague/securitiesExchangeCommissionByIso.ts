import type { ArabLeagueMemberIsoCode } from './arabLeagueMemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for League of Arab
 * States members in this module (informational; verify URLs, handles, forms portals, and API
 * bases before production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const ARAB_LEAGUE_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  ArabLeagueMemberIsoCode,
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
  BH: sec(
    'Central Bank of Bahrain (CBB) — capital-markets supervision',
    'https://www.cbb.gov.bh',
    'info@cbb.gov.bh',
    'https://x.com/CentralBankBH',
    'https://www.linkedin.com/company/central-bank-of-bahrain/',
    'https://www.cbb.gov.bh',
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
  IQ: sec(
    'Iraq Securities Commission (ISC)',
    'https://www.isc.gov.iq',
    'info@isc.gov.iq',
    '',
    '',
    'https://www.isc.gov.iq',
  ),
  JO: sec(
    'Jordan Securities Commission (JSC)',
    'https://www.jsc.gov.jo',
    'info@jsc.gov.jo',
    'https://x.com/JordanSecurities',
    'https://www.linkedin.com/company/jordan-securities-commission/',
    'https://www.jsc.gov.jo',
  ),
  KW: sec(
    'Capital Markets Authority Kuwait (CMA Kuwait)',
    'https://www.cma.gov.kw',
    'info@cma.gov.kw',
    'https://x.com/CMA_Kuwait',
    'https://www.linkedin.com/company/capital-markets-authority-kuwait/',
    'https://www.cma.gov.kw',
  ),
  LB: sec(
    'Capital Markets Authority Lebanon (CMA Lebanon)',
    'https://www.cma.gov.lb',
    'info@cma.gov.lb',
    '',
    'https://www.linkedin.com/company/capital-markets-authority-lebanon/',
    'https://www.cma.gov.lb',
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
  OM: sec(
    'Capital Market Authority Oman (CMA Oman)',
    'https://www.cma.gov.om',
    'info@cma.gov.om',
    'https://x.com/CMA_Oman',
    'https://www.linkedin.com/company/capital-market-authority-oman/',
    'https://www.cma.gov.om',
  ),
  PS: sec(
    'Palestine Capital Market Authority (PCMA)',
    'https://www.pcma.ps',
    'info@pcma.ps',
    '',
    '',
    'https://www.pcma.ps',
  ),
  QA: sec(
    'Qatar Financial Markets Authority (QFMA)',
    'https://www.qfma.org.qa',
    'info@qfma.org.qa',
    'https://x.com/QFMA_Qatar',
    'https://www.linkedin.com/company/qatar-financial-markets-authority/',
    'https://www.qfma.org.qa',
  ),
  SA: sec(
    'Capital Market Authority Saudi Arabia (CMA Saudi Arabia)',
    'https://cma.org.sa',
    'info@cma.org.sa',
    'https://x.com/CMA_SA',
    'https://www.linkedin.com/company/capital-market-authority-saudi-arabia/',
    'https://cma.org.sa',
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
  SY: sec(
    'Syria — capital-markets oversight via Central Bank of Syria (no dedicated SEC; verify status)',
    'https://www.banquecentrale.gov.sy',
    '',
    '',
    '',
    'https://www.banquecentrale.gov.sy',
  ),
  TN: sec(
    'Conseil du Marché Financier (CMF Tunisie)',
    'https://www.cmf.gov.tn',
    'cmf@cmf.gov.tn',
    '',
    'https://www.linkedin.com/company/conseil-du-marché-financier-tunisie/',
    'https://www.cmf.gov.tn',
  ),
  AE: sec(
    'Securities and Commodities Authority (SCA UAE)',
    'https://www.sca.gov.ae',
    'info@sca.gov.ae',
    'https://x.com/SCAUAE',
    'https://www.linkedin.com/company/securities-and-commodities-authority/',
    'https://www.sca.gov.ae',
  ),
  YE: sec(
    'Capital Market Authority Yemen (CMA Yemen) — verify current operational status',
    'https://www.cma-ye.org',
    '',
    '',
    '',
    'https://www.cma-ye.org',
  ),
}
