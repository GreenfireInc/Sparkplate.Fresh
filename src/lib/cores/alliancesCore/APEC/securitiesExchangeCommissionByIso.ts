import type { ApecMemberIsoCode } from './apecMemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for APEC member
 * economies in this module (informational; verify URLs, handles, forms portals, and API bases
 * before production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const APEC_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  ApecMemberIsoCode,
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
  CN: sec(
    'China Securities Regulatory Commission (CSRC)',
    'http://www.csrc.gov.cn',
    '',
    '',
    '',
    'http://www.csrc.gov.cn',
  ),
  HK: sec(
    'Securities and Futures Commission (SFC Hong Kong)',
    'https://www.sfc.hk',
    'enforce@sfc.hk',
    'https://x.com/HKFSAuthority',
    'https://www.linkedin.com/company/securities-and-futures-commission/',
    'https://www.sfc.hk/en/Regulatory-functions/Intermediaries/Licensing',
  ),
  ID: sec(
    'Otoritas Jasa Keuangan (OJK Indonesia)',
    'https://www.ojk.go.id',
    'pengaduan@ojk.go.id',
    'https://x.com/OJK_ID',
    'https://www.linkedin.com/company/otoritas-jasa-keuangan/',
    'https://www.ojk.go.id',
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
  PG: sec(
    'Securities Commission of Papua New Guinea (SCPNG)',
    'https://www.scpng.gov.pg',
    'info@scpng.gov.pg',
    '',
    '',
    'https://www.scpng.gov.pg',
  ),
  PE: sec(
    'Superintendencia del Mercado de Valores (SMV Peru)',
    'https://www.smv.gob.pe',
    'consultas@smv.gob.pe',
    'https://x.com/SMV_Peru',
    'https://www.linkedin.com/company/superintendencia-del-mercado-de-valores/',
    'https://www.smv.gob.pe',
  ),
  PH: sec(
    'Securities and Exchange Commission Philippines (SEC)',
    'https://www.sec.gov.ph',
    'sec@sec.gov.ph',
    'https://x.com/SEC_PH',
    'https://www.linkedin.com/company/securities-and-exchange-commission-philippines/',
    'https://esparc.sec.gov.ph',
  ),
  RU: sec(
    'Bank of Russia — securities market supervision',
    'https://www.cbr.ru',
    'info@cbr.ru',
    'https://x.com/BankofRussia',
    'https://www.linkedin.com/company/central-bank-of-russian-federation/',
    'https://www.cbr.ru',
  ),
  SG: sec(
    'Monetary Authority of Singapore (MAS)',
    'https://www.mas.gov.sg',
    'contact_MAS@mas.gov.sg',
    'https://x.com/mas_sg',
    'https://www.linkedin.com/company/monetary-authority-of-singapore/',
    'https://www.mas.gov.sg',
  ),
  KR: sec(
    'Financial Services Commission (FSC Korea)',
    'https://www.fsc.go.kr',
    'info@fsc.go.kr',
    'https://x.com/Korea_FSC',
    'https://www.linkedin.com/company/financial-services-commission-korea/',
    'https://www.fsc.go.kr',
  ),
  TW: sec(
    'Financial Supervisory Commission (FSC Taiwan)',
    'https://www.fsc.gov.tw',
    'fsc@fsc.gov.tw',
    '',
    'https://www.linkedin.com/company/financial-supervisory-commission-roc-taiwan/',
    'https://www.fsc.gov.tw',
  ),
  TH: sec(
    'Securities and Exchange Commission Thailand (SEC Thailand)',
    'https://www.sec.or.th',
    'info@sec.or.th',
    'https://x.com/SECorThailand',
    'https://www.linkedin.com/company/securities-and-exchange-commission-thailand/',
    'https://www.sec.or.th',
  ),
  US: sec(
    'U.S. Securities and Exchange Commission (SEC)',
    'https://www.sec.gov',
    'help@sec.gov',
    'https://x.com/SECGov',
    'https://www.linkedin.com/company/us-securities-and-exchange-commission/',
    'https://www.sec.gov/forms',
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
