import type { RcepMemberIsoCode } from './rcepMemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for RCEP
 * parties in this module (informational; verify URLs, handles, forms portals, and API
 * bases before production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const RCEP_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  RcepMemberIsoCode,
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
    'info@ambd.gov.bn',
    '',
    'https://www.linkedin.com/company/autoriti-monetari-brunei-darussalam/',
    'https://www.ambd.gov.bn',
  ),
  KH: sec(
    'Securities and Exchange Regulator of Cambodia (SERC)',
    'https://www.serc.gov.kh',
    'info@serc.gov.kh',
    '',
    'https://www.linkedin.com/company/securities-and-exchange-regulator-of-cambodia/',
    'https://www.serc.gov.kh',
  ),
  CN: sec(
    'China Securities Regulatory Commission (CSRC)',
    'https://www.csrc.gov.cn',
    'csrc@csrc.gov.cn',
    '',
    'https://www.linkedin.com/company/china-securities-regulatory-commission/',
    'https://www.csrc.gov.cn',
  ),
  ID: sec(
    'Otoritas Jasa Keuangan (OJK Indonesia)',
    'https://www.ojk.go.id',
    'konsumen@ojk.go.id',
    'https://x.com/ojkindonesia',
    'https://www.linkedin.com/company/otoritas-jasa-keuangan/',
    'https://www.ojk.go.id',
  ),
  JP: sec(
    'Financial Services Agency Japan (FSA)',
    'https://www.fsa.go.jp',
    'info@fsa.go.jp',
    'https://x.com/FSA_JAPAN',
    'https://www.linkedin.com/company/financial-services-agency-japan/',
    'https://www.fsa.go.jp',
  ),
  KR: sec(
    'Financial Services Commission South Korea (FSC)',
    'https://www.fsc.go.kr',
    'fsc@korea.kr',
    'https://x.com/FSC_Korea_EN',
    'https://www.linkedin.com/company/financial-services-commission-south-korea/',
    'https://www.fsc.go.kr',
  ),
  LA: sec(
    'Lao Securities Commission (LSC)',
    'https://www.lsc.gov.la',
    'lsc@lsc.gov.la',
    '',
    '',
    'https://www.lsc.gov.la',
  ),
  MY: sec(
    'Securities Commission Malaysia (SC)',
    'https://www.sc.com.my',
    'cic@seccom.com.my',
    'https://x.com/SecComMY',
    'https://www.linkedin.com/company/securities-commission-malaysia/',
    'https://www.sc.com.my',
  ),
  MM: sec(
    'Securities and Exchange Commission Myanmar (SECM)',
    'https://www.secm.gov.mm',
    'info@secm.gov.mm',
    '',
    '',
    'https://www.secm.gov.mm',
  ),
  NZ: sec(
    'Financial Markets Authority (FMA New Zealand)',
    'https://www.fma.govt.nz',
    'info@fma.govt.nz',
    'https://x.com/FMANZgov',
    'https://www.linkedin.com/company/financial-markets-authority/',
    'https://www.fma.govt.nz',
  ),
  PH: sec(
    'Securities and Exchange Commission Philippines (SEC Philippines)',
    'https://www.sec.gov.ph',
    'mis@sec.gov.ph',
    'https://x.com/SECgovPH',
    'https://www.linkedin.com/company/securities-and-exchange-commission-philippines/',
    'https://www.sec.gov.ph',
  ),
  SG: sec(
    'Monetary Authority of Singapore (MAS)',
    'https://www.mas.gov.sg',
    'webmaster@mas.gov.sg',
    'https://x.com/MAS_sg',
    'https://www.linkedin.com/company/monetary-authority-of-singapore/',
    'https://www.mas.gov.sg',
  ),
  TH: sec(
    'Securities and Exchange Commission Thailand (SEC Thailand)',
    'https://www.sec.or.th',
    'info@sec.or.th',
    'https://x.com/sec_th',
    'https://www.linkedin.com/company/sec-thailand/',
    'https://www.sec.or.th',
  ),
  VN: sec(
    'State Securities Commission of Vietnam (SSC)',
    'https://www.ssc.gov.vn',
    'ubcknn@ssc.gov.vn',
    '',
    'https://www.linkedin.com/company/state-securities-commission-of-vietnam/',
    'https://www.ssc.gov.vn',
  ),
}
