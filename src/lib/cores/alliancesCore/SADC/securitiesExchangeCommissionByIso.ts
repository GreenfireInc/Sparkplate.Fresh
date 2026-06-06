import type { SadcMemberIsoCode } from './sadcMemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for SADC
 * member states in this module (informational; verify URLs, handles, forms portals, and
 * API bases before production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const SADC_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  SadcMemberIsoCode,
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
  BW: sec(
    'Non-Bank Financial Institutions Regulatory Authority Botswana (NBFIRA)',
    'https://www.nbfira.org.bw',
    'info@nbfira.org.bw',
    '',
    'https://www.linkedin.com/company/nbfira/',
    'https://www.nbfira.org.bw',
  ),
  KM: sec(
    'Comoros — capital-markets oversight via Banque Centrale des Comores (no dedicated SEC)',
    'https://www.banque-comores.km',
    '',
    '',
    '',
    'https://www.banque-comores.km',
  ),
  CD: sec(
    'DRC — capital-markets oversight via Banque Centrale du Congo (no dedicated SEC)',
    'https://www.bcc.cd',
    'info@bcc.cd',
    '',
    '',
    'https://www.bcc.cd',
  ),
  SZ: sec(
    'Financial Services Regulatory Authority Eswatini (FSRA)',
    'https://www.fsra.co.sz',
    'info@fsra.co.sz',
    '',
    'https://www.linkedin.com/company/financial-services-regulatory-authority-eswatini/',
    'https://www.fsra.co.sz',
  ),
  LS: sec(
    'Lesotho — capital-markets oversight via Central Bank of Lesotho (no dedicated SEC)',
    'https://www.centralbank.org.ls',
    'info@centralbank.org.ls',
    '',
    '',
    'https://www.centralbank.org.ls',
  ),
  MG: sec(
    'Commission de Surveillance du Marché des Valeurs Mobilières et des Capitaux (CSMEC Madagascar)',
    'https://www.csmec.mg',
    '',
    '',
    '',
    'https://www.csmec.mg',
  ),
  MW: sec(
    'Malawi — capital-markets oversight via Reserve Bank of Malawi (nascent Malawi Stock Exchange; verify)',
    'https://www.rbm.mw',
    'info@rbm.mw',
    '',
    '',
    'https://www.rbm.mw',
  ),
  MU: sec(
    'Financial Services Commission Mauritius (FSC)',
    'https://www.fscmauritius.org',
    'fscmauritius@fscmauritius.org',
    'https://x.com/FSCMauritius',
    'https://www.linkedin.com/company/financial-services-commission-mauritius/',
    'https://www.fscmauritius.org',
  ),
  MZ: sec(
    'Mozambique — capital-markets oversight via Banco de Moçambique (nascent CVM; verify status)',
    'https://www.bancomoc.mz',
    '',
    '',
    '',
    'https://www.bancomoc.mz',
  ),
  NA: sec(
    'Namibia Financial Institutions Supervisory Authority (NAMFISA)',
    'https://www.namfisa.com.na',
    'info@namfisa.com.na',
    '',
    'https://www.linkedin.com/company/namfisa/',
    'https://www.namfisa.com.na',
  ),
  SC: sec(
    'Financial Services Authority Seychelles (FSA)',
    'https://www.fsaseychelles.sc',
    'fsa@fsaseychelles.sc',
    '',
    'https://www.linkedin.com/company/financial-services-authority-seychelles/',
    'https://www.fsaseychelles.sc',
  ),
  ZA: sec(
    'Financial Sector Conduct Authority South Africa (FSCA)',
    'https://www.fsca.co.za',
    'info@fsca.co.za',
    'https://x.com/FSCA_ZA',
    'https://www.linkedin.com/company/financial-sector-conduct-authority/',
    'https://www.fsca.co.za',
  ),
  TZ: sec(
    'Capital Markets and Securities Authority Tanzania (CMSA)',
    'https://www.cmsa.go.tz',
    'cmsa@cmsa.go.tz',
    'https://x.com/CMSATanzania',
    'https://www.linkedin.com/company/capital-markets-and-securities-authority-tanzania/',
    'https://www.cmsa.go.tz',
  ),
  ZM: sec(
    'Securities and Exchange Commission of Zambia (SEC Zambia)',
    'https://www.sec.gov.zm',
    'info@sec.gov.zm',
    '',
    'https://www.linkedin.com/company/securities-exchange-commission-of-zambia/',
    'https://www.sec.gov.zm',
  ),
  ZW: sec(
    'Securities and Exchange Commission of Zimbabwe (SECZ)',
    'https://www.secz.org.zw',
    'info@secz.org.zw',
    '',
    'https://www.linkedin.com/company/securities-and-exchange-commission-of-zimbabwe/',
    'https://www.secz.org.zw',
  ),
}
