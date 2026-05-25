import type { OpecMemberIsoCode } from './opecMemberIsoCodes'
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

/**
 * BVMAC — unified CEMAC franc-zone exchange (CM, CF, TD, CG, GQ, GA).
 */
const BVMAC = b(
  'BVMAC (Bourse des Valeurs Mobilières d\'Afrique Centrale)',
  'https://www.bvm-ac.com',
  'contact@bvm-ac.com',
  'https://x.com/bvmacofficiel',
  'https://www.linkedin.com/company/bvmac/',
  '',
)

/** Bond market venues for OPEC members in this module (informational; verify periodically). */
export const OPEC_BOND_MARKETS: Record<OpecMemberIsoCode, readonly BondMarketVenue[]> = {
  DZ: [
    b(
      'Bourse d\'Alger (Société de Gestion de la Bourse des Valeurs — SGBV)',
      'https://www.sgbv.dz',
      'contact@sgbv.dz',
      '',
      '',
      '',
    ),
  ],
  CG: [
    BVMAC,
  ],
  GQ: [
    BVMAC,
  ],
  GA: [
    BVMAC,
  ],
  IR: [
    b(
      'Tehran Stock Exchange (TSE)',
      'https://www.tse.ir',
      'info@tse.ir',
      '',
      '',
      '',
    ),
    b(
      'Central Bank of Iran (government bond auctions)',
      'https://www.cbi.ir',
      'info@cbi.ir',
      '',
      '',
      '',
    ),
  ],
  IQ: [
    b(
      'Iraq Stock Exchange (ISX)',
      'https://www.isx-iq.net',
      'info@isx-iq.net',
      '',
      '',
      '',
    ),
    b(
      'Central Bank of Iraq (government bond auctions)',
      'https://cbi.iq',
      'info@cbi.iq',
      '',
      '',
      '',
    ),
  ],
  KW: [
    b(
      'Boursa Kuwait (Kuwait Stock Exchange)',
      'https://www.boursakuwait.com.kw',
      'info@boursakuwait.com.kw',
      'https://x.com/BoursaKuwait',
      'https://www.linkedin.com/company/boursa-kuwait/',
      '',
    ),
    b(
      'Central Bank of Kuwait (CBK — sovereign bond auctions)',
      'https://www.cbk.gov.kw',
      'info@cbk.gov.kw',
      '',
      'https://www.linkedin.com/company/central-bank-of-kuwait/',
      '',
    ),
  ],
  LY: [
    b(
      'Libyan Stock Market (LSM)',
      'https://www.lsm.ly',
      'info@lsm.ly',
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
  SA: [
    b(
      'Saudi Exchange (Tadawul) — Sukuk & Bonds Market',
      'https://www.saudiexchange.sa',
      'info@saudiexchange.sa',
      'https://x.com/SaudiExchange',
      'https://www.linkedin.com/company/saudi-exchange/',
      '',
    ),
    b(
      'Ministry of Finance — Debt Management Office (sovereign primary)',
      'https://www.mof.gov.sa',
      'info@mof.gov.sa',
      '',
      '',
      '',
    ),
  ],
  AE: [
    b(
      'Abu Dhabi Securities Exchange (ADX)',
      'https://www.adx.ae',
      'info@adx.ae',
      'https://x.com/ADXUAE',
      'https://www.linkedin.com/company/abu-dhabi-securities-exchange/',
      '',
    ),
    b(
      'Dubai Financial Market (DFM)',
      'https://www.dfm.ae',
      'info@dfm.ae',
      'https://x.com/DubaiFinancialMarket',
      'https://www.linkedin.com/company/dubai-financial-market/',
      '',
    ),
    b(
      'Ministry of Finance — Public Debt Management (sovereign primary)',
      'https://www.mof.gov.ae',
      'info@mof.gov.ae',
      '',
      '',
      '',
    ),
  ],
  VE: [
    b(
      'Bolsa de Valores de Caracas (BVC)',
      'https://www.bvc.com.ve',
      'info@bvc.com.ve',
      '',
      '',
      '',
    ),
    b(
      'Banco Central de Venezuela (sovereign primary — verify status)',
      'https://www.bcv.org.ve',
      'info@bcv.org.ve',
      '',
      '',
      '',
    ),
  ],
}
