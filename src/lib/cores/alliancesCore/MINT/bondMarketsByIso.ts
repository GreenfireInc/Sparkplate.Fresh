import type { MintMemberIsoCode } from './mintMemberIsoCodes'
import type { BondMarketVenue } from './types'

function b(
  name: string,
  website: string,
  email: string,
  twitter: string,
  linkedin: string,
  apiEndpoint: string,
): BondMarketVenue {
  return { name, website, email, twitter, linkedin, apiEndpoint }
}

/** Bond market venues for MINT members (informational; verify periodically). */
export const MINT_BOND_MARKETS: Record<MintMemberIsoCode, readonly BondMarketVenue[]> = {
  MX: [
    b(
      'Bolsa Mexicana de Valores (BMV) — Mercado de Deuda',
      'https://www.bmv.com.mx',
      'atencionainversionistas@bmv.com.mx',
      'https://x.com/BMV_Group',
      'https://www.linkedin.com/company/bolsa-mexicana-de-valores/',
      '',
    ),
    b(
      'Secretaría de Hacienda y Crédito Público (SHCP — sovereign primary)',
      'https://www.gob.mx/shcp',
      'atencion@hacienda.gob.mx',
      '',
      '',
      '',
    ),
  ],
  ID: [
    b(
      'Indonesia Stock Exchange (IDX) — Corporate Bond Market',
      'https://www.idx.co.id',
      'info@idx.co.id',
      'https://x.com/IDXOfficial',
      'https://www.linkedin.com/company/indonesia-stock-exchange/',
      '',
    ),
    b(
      'Directorate General of Financing and Risk Management — Ministry of Finance (SBN primary)',
      'https://www.djppr.kemenkeu.go.id',
      'djppr@kemenkeu.go.id',
      '',
      '',
      '',
    ),
  ],
  NG: [
    b(
      'FMDQ Securities Exchange (premier OTC fixed-income & derivatives venue)',
      'https://www.fmdqgroup.com',
      'info@fmdqgroup.com',
      'https://x.com/FMDQGroup',
      'https://www.linkedin.com/company/fmdq/',
      '',
    ),
    b(
      'Nigerian Exchange Group (NGX) — Bond Market',
      'https://ngxgroup.com',
      'contact@ngxgroup.com',
      'https://x.com/NGXGROUP',
      'https://www.linkedin.com/company/nigerian-exchange-group/',
      '',
    ),
    b(
      'Debt Management Office (DMO) Nigeria — sovereign primary',
      'https://www.dmo.gov.ng',
      'enquiries@dmo.gov.ng',
      'https://x.com/DMONigeria',
      'https://www.linkedin.com/company/debt-management-office-nigeria/',
      '',
    ),
  ],
  TR: [
    b(
      'Borsa Istanbul — Debt Securities Market',
      'https://www.borsaistanbul.com',
      'info@borsaistanbul.com',
      'https://x.com/BorsaIstanbul',
      'https://www.linkedin.com/company/borsa-istanbul/',
      '',
    ),
    b(
      'Undersecretariat of Treasury — Republic of Türkiye (sovereign primary)',
      'https://www.hmb.gov.tr',
      'bilgi@hmb.gov.tr',
      '',
      '',
      '',
    ),
  ],
}
