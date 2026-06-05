import type { MiktaMemberIsoCode } from './miktaMemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for MIKTA
 * member states in this module (informational; verify URLs, handles, forms portals,
 * and API bases before production use). Self-contained — no imports from other alliance
 * modules. `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const MIKTA_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  MiktaMemberIsoCode,
  SecuritiesExchangeCommission
> = {
  MX: sec(
    'Comisión Nacional Bancaria y de Valores (CNBV Mexico)',
    'https://www.gob.mx/cnbv',
    'contacto@cnbv.gob.mx',
    'https://x.com/CNBV_mx',
    'https://www.linkedin.com/company/cnbv/',
    'https://www.gob.mx/cnbv',
  ),
  ID: sec(
    'Otoritas Jasa Keuangan (OJK Indonesia)',
    'https://www.ojk.go.id',
    'konsumen@ojk.go.id',
    'https://x.com/ojkindonesia',
    'https://www.linkedin.com/company/otoritas-jasa-keuangan/',
    'https://www.ojk.go.id',
  ),
  KR: sec(
    'Financial Services Commission South Korea (FSC)',
    'https://www.fsc.go.kr',
    'fsc@korea.kr',
    'https://x.com/FSC_Korea_EN',
    'https://www.linkedin.com/company/financial-services-commission-south-korea/',
    'https://www.fsc.go.kr',
  ),
  TR: sec(
    'Capital Markets Board of Turkey (SPK)',
    'https://www.spk.gov.tr',
    'spk@spk.gov.tr',
    'https://x.com/SPK_Kurumu',
    'https://www.linkedin.com/company/sermaye-piyasası-kurulu/',
    'https://www.spk.gov.tr',
  ),
  AU: sec(
    'Australian Securities and Investments Commission (ASIC)',
    'https://asic.gov.au',
    'enquiries@asic.gov.au',
    'https://x.com/ASICConnect',
    'https://www.linkedin.com/company/asic/',
    'https://asic.gov.au/online-services/',
  ),
}
