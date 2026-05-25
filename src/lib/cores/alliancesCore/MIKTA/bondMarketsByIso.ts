import type { MiktaMemberIsoCode } from './miktaMemberIsoCodes'
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

/** Bond market venues for MIKTA members (informational; verify periodically). */
export const MIKTA_BOND_MARKETS: Record<MiktaMemberIsoCode, readonly BondMarketVenue[]> = {
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
  KR: [
    b(
      'Korea Exchange (KRX) — Bond Market',
      'https://global.krx.co.kr',
      'info@krx.co.kr',
      'https://x.com/KRX_official',
      'https://www.linkedin.com/company/korea-exchange/',
      '',
    ),
    b(
      'Ministry of Economy and Finance — Korea Treasury Bonds (KTB primary)',
      'https://www.moef.go.kr',
      'webmaster@moef.go.kr',
      '',
      '',
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
  AU: [
    b(
      'Australian Securities Exchange (ASX) — Fixed Interest Market',
      'https://www.asx.com.au',
      'info@asx.com.au',
      'https://x.com/ASX',
      'https://www.linkedin.com/company/asx-limited/',
      '',
    ),
    b(
      'Australian Office of Financial Management (AOFM — sovereign primary)',
      'https://www.aofm.gov.au',
      'info@aofm.gov.au',
      'https://x.com/AOFM',
      'https://www.linkedin.com/company/australian-office-of-financial-management/',
      '',
    ),
  ],
}
