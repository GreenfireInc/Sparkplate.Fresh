import type { CptppMemberIsoCode } from './cptppMemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for CPTPP parties
 * in this module (informational; verify URLs, handles, forms portals, and API bases before
 * production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const CPTPP_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  CptppMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  AU: sec(
    'Australian Securities and Investments Commission (ASIC)',
    'https://asic.gov.au',
    'enquiries@asic.gov.au',
    'https://x.com/ASICConnect',
    'https://www.linkedin.com/company/asic/',
    'https://asic.gov.au/online-services/',
  ),
  BN: sec(
    'Autoriti Monetari Brunei Darussalam (AMBD) — capital-markets supervision',
    'https://www.ambd.gov.bn',
    'ambd@ambd.gov.bn',
    '',
    'https://www.linkedin.com/company/autoriti-monetari-brunei-darussalam/',
    'https://www.ambd.gov.bn',
  ),
  CA: sec(
    'Canadian Securities Administrators (CSA)',
    'https://www.securities-administrators.ca',
    'info@csa-acvm.ca',
    'https://x.com/CSA_News',
    'https://www.linkedin.com/company/canadian-securities-administrators/',
    'https://www.securities-administrators.ca',
  ),
  CL: sec(
    'Comisión para el Mercado Financiero (CMF Chile)',
    'https://www.cmfchile.cl',
    'consultas@cmfchile.cl',
    'https://x.com/CMFChile',
    'https://www.linkedin.com/company/comisi-n-para-el-mercado-financiero/',
    'https://www.cmfchile.cl',
  ),
  JP: sec(
    'Financial Services Agency (FSA Japan)',
    'https://www.fsa.go.jp',
    '',
    'https://x.com/FSA_Japan',
    'https://www.linkedin.com/company/financial-services-agency-japan/',
    'https://www.fsa.go.jp',
  ),
  MY: sec(
    'Securities Commission Malaysia (SC)',
    'https://www.sc.com.my',
    'sc@sc.com.my',
    'https://x.com/SC_Malaysia',
    'https://www.linkedin.com/company/securities-commission-malaysia/',
    'https://www.sc.com.my',
  ),
  MX: sec(
    'Comisión Nacional Bancaria y de Valores (CNBV)',
    'https://www.gob.mx/cnbv',
    'atencionciudadana@cnbv.gob.mx',
    'https://x.com/CNBVmx',
    'https://www.linkedin.com/company/cnbv/',
    'https://www.gob.mx/cnbv',
  ),
  NZ: sec(
    'Financial Markets Authority (FMA New Zealand)',
    'https://www.fma.govt.nz',
    'info@fma.govt.nz',
    'https://x.com/FMANZgov',
    'https://www.linkedin.com/company/financial-markets-authority/',
    'https://www.fma.govt.nz',
  ),
  PE: sec(
    'Superintendencia del Mercado de Valores (SMV Peru)',
    'https://www.smv.gob.pe',
    'consultas@smv.gob.pe',
    'https://x.com/SMV_Peru',
    'https://www.linkedin.com/company/superintendencia-del-mercado-de-valores/',
    'https://www.smv.gob.pe',
  ),
  SG: sec(
    'Monetary Authority of Singapore (MAS)',
    'https://www.mas.gov.sg',
    'contact_MAS@mas.gov.sg',
    'https://x.com/mas_sg',
    'https://www.linkedin.com/company/monetary-authority-of-singapore/',
    'https://www.mas.gov.sg',
  ),
  GB: sec(
    'Financial Conduct Authority (FCA United Kingdom)',
    'https://www.fca.org.uk',
    'consumer.queries@fca.org.uk',
    'https://x.com/TheFCA',
    'https://www.linkedin.com/company/financial-conduct-authority/',
    'https://www.fca.org.uk',
  ),
  VN: sec(
    'State Securities Commission of Vietnam (SSC)',
    'https://www.ssc.gov.vn',
    'ssc@ssc.gov.vn',
    '',
    'https://www.linkedin.com/company/state-securities-commission-of-vietnam/',
    'https://www.ssc.gov.vn',
  ),
}
