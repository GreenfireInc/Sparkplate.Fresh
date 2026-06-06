import type { MintMemberIsoCode } from './mintMemberIsoCodes'
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
 * Securities and exchange / capital-markets commission by ISO 3166-1 alpha-2 for MINT
 * member states in this module (informational; verify URLs, handles, forms portals,
 * and API bases before production use). Self-contained — no imports from other alliance
 * modules. `apiEndpoint` is almost always empty. Verify periodically:
 * https://www.iosco.org/about/membership/
 */
export const MINT_SECURITIES_EXCHANGE_COMMISSIONS: Record<
  MintMemberIsoCode,
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
  NG: sec(
    'Securities and Exchange Commission Nigeria (SEC Nigeria)',
    'https://www.sec.gov.ng',
    'sec@sec.gov.ng',
    'https://x.com/SECNigeria',
    'https://www.linkedin.com/company/securities-and-exchange-commission-nigeria/',
    'https://www.sec.gov.ng',
  ),
  TR: sec(
    'Capital Markets Board of Turkey (SPK)',
    'https://www.spk.gov.tr',
    'spk@spk.gov.tr',
    'https://x.com/SPK_Kurumu',
    'https://www.linkedin.com/company/sermaye-piyasası-kurulu/',
    'https://www.spk.gov.tr',
  ),
}
