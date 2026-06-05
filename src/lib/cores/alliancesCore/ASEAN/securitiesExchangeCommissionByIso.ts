import type { AseanMemberIsoCode } from './aseanMemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for ASEAN member
 * states in this module (informational; verify URLs, handles, forms portals, and API bases
 * before production use). Self-contained — no imports from other alliance modules.
 * `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const ASEAN_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  AseanMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  BN: sec(
    'Autoriti Monetari Brunei Darussalam (AMBD) — capital-markets supervision',
    'https://www.ambd.gov.bn',
    'ambd@ambd.gov.bn',
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
  ID: sec(
    'Otoritas Jasa Keuangan (OJK Indonesia)',
    'https://www.ojk.go.id',
    'pengaduan@ojk.go.id',
    'https://x.com/OJK_ID',
    'https://www.linkedin.com/company/otoritas-jasa-keuangan/',
    'https://www.ojk.go.id',
  ),
  LA: sec(
    'Lao PDR — capital-markets oversight via Bank of the Lao PDR (no dedicated SEC)',
    'https://www.bol.gov.la',
    '',
    '',
    '',
    'https://www.bol.gov.la',
  ),
  MY: sec(
    'Securities Commission Malaysia (SC)',
    'https://www.sc.com.my',
    'sc@sc.com.my',
    'https://x.com/SC_Malaysia',
    'https://www.linkedin.com/company/securities-commission-malaysia/',
    'https://www.sc.com.my',
  ),
  MM: sec(
    'Securities and Exchange Commission of Myanmar (SECM)',
    'https://www.secm.gov.mm',
    'info@secm.gov.mm',
    '',
    '',
    'https://www.secm.gov.mm',
  ),
  PH: sec(
    'Securities and Exchange Commission Philippines (SEC)',
    'https://www.sec.gov.ph',
    'sec@sec.gov.ph',
    'https://x.com/SEC_PH',
    'https://www.linkedin.com/company/securities-and-exchange-commission-philippines/',
    'https://esparc.sec.gov.ph',
  ),
  SG: sec(
    'Monetary Authority of Singapore (MAS)',
    'https://www.mas.gov.sg',
    'contact_MAS@mas.gov.sg',
    'https://x.com/mas_sg',
    'https://www.linkedin.com/company/monetary-authority-of-singapore/',
    'https://www.mas.gov.sg',
  ),
  TH: sec(
    'Securities and Exchange Commission Thailand (SEC Thailand)',
    'https://www.sec.or.th',
    'info@sec.or.th',
    'https://x.com/SECorThailand',
    'https://www.linkedin.com/company/securities-and-exchange-commission-thailand/',
    'https://www.sec.or.th',
  ),
  TL: sec(
    'Timor-Leste — capital-markets oversight via Banco Central de Timor-Leste (no dedicated SEC)',
    'https://www.bancocentral.tl',
    'info@bancocentral.tl',
    '',
    '',
    'https://www.bancocentral.tl',
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
