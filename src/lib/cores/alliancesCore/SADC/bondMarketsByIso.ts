import type { SadcMemberIsoCode } from './sadcMemberIsoCodes'
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
 * Bond market venues by ISO 3166-1 alpha-2 for SADC members in this module (informational;
 * verify URLs, handles, and API bases before production use). Southern African pattern:
 *   - JSE + National Treasury (ZA) anchors the region; NSX, LuSE, ZSE/VFEX, DSE, BSE (BW).
 *   - Island economies (MU, SC, KM, MG) use SEM, MERJ, or central-bank T-bills desks.
 *   - DRC (CD) uses central-bank-only; Angola (AO) has BODIVA.
 * `apiEndpoint` is the empty string for virtually all venues. Verify periodically.
 */
export const SADC_BOND_MARKETS: Record<SadcMemberIsoCode, readonly BondMarketVenue[]> = {
  AO: [
    b(
      'BODIVA (Bolsa de Dívida e Valores de Angola)',
      'https://www.bodiva.ao',
      'geral@bodiva.ao',
      'https://x.com/BODIVAangola',
      'https://www.linkedin.com/company/bodiva/',
      '',
    ),
  ],
  BW: [
    b(
      'Botswana Stock Exchange (BSE) — Bond Market',
      'https://www.bse.co.bw',
      'enquiries@bse.co.bw',
      'https://x.com/BSE_Botswana',
      'https://www.linkedin.com/company/botswana-stock-exchange/',
      '',
    ),
  ],
  KM: [
    b(
      'Banque Centrale des Comores (T-bills desk; no listed bond venue)',
      'https://www.banque-comores.km',
      'bcc@banque-comores.km',
      '',
      '',
      '',
    ),
  ],
  CD: [
    b(
      'Banque Centrale du Congo (T-bills desk; no listed bond venue)',
      'https://www.bcc.cd',
      'info@bcc.cd',
      '',
      'https://www.linkedin.com/company/banque-centrale-du-congo/',
      '',
    ),
  ],
  SZ: [
    b(
      'Eswatini Stock Exchange (ESE)',
      'https://www.ssx.org.sz',
      'info@ssx.org.sz',
      '',
      'https://www.linkedin.com/company/eswatini-stock-exchange/',
      '',
    ),
  ],
  LS: [
    b(
      'Maseru Securities Market (MSM) — operated by Central Bank of Lesotho',
      'https://www.centralbank.org.ls',
      'info@centralbank.org.ls',
      '',
      '',
      '',
    ),
  ],
  MG: [
    b(
      'Banky Foiben\'i Madagasikara (T-bills auctions; no listed bond venue)',
      'https://www.banky-foiben.mg',
      'bfm@banky-foiben.mg',
      '',
      '',
      '',
    ),
  ],
  MW: [
    b(
      'Malawi Stock Exchange (MSE) — Debt Market',
      'https://www.mse.co.mw',
      'info@mse.co.mw',
      '',
      'https://www.linkedin.com/company/malawi-stock-exchange/',
      '',
    ),
  ],
  MU: [
    b(
      'Stock Exchange of Mauritius (SEM)',
      'https://www.stockexchangeofmauritius.com',
      'info@stockexchangeofmauritius.com',
      '',
      'https://www.linkedin.com/company/stock-exchange-of-mauritius/',
      '',
    ),
    b(
      'Bank of Mauritius (sovereign primary auctions)',
      'https://www.bom.mu',
      'communications@bom.mu',
      '',
      '',
      '',
    ),
  ],
  MZ: [
    b(
      'Bolsa de Valores de Moçambique (BVM)',
      'https://www.bvm.co.mz',
      'bvm@bvm.co.mz',
      '',
      '',
      '',
    ),
  ],
  NA: [
    b(
      'Namibian Stock Exchange (NSX)',
      'https://www.nsx.com.na',
      'info@nsx.com.na',
      '',
      'https://www.linkedin.com/company/namibian-stock-exchange/',
      '',
    ),
    b(
      'Bank of Namibia (sovereign primary auctions)',
      'https://www.bon.com.na',
      'info@bon.com.na',
      '',
      '',
      '',
    ),
  ],
  SC: [
    b(
      'MERJ Exchange (Mauritius-anchored multi-asset venue listing Seychelles debt)',
      'https://merj.exchange',
      'info@merj.exchange',
      'https://x.com/MERJexchange',
      'https://www.linkedin.com/company/merj-exchange/',
      '',
    ),
  ],
  ZA: [
    b(
      'Johannesburg Stock Exchange (JSE) — Interest Rate Market',
      'https://www.jse.co.za',
      'info@jse.co.za',
      'https://x.com/JSE_Group',
      'https://www.linkedin.com/company/jse-ltd/',
      '',
    ),
    b(
      'National Treasury — Asset and Liability Management (sovereign primary)',
      'https://www.treasury.gov.za',
      'enquiries@treasury.gov.za',
      '',
      '',
      '',
    ),
  ],
  TZ: [
    b(
      'Dar es Salaam Stock Exchange (DSE) — Fixed Income Market',
      'https://www.dse.co.tz',
      'info@dse.co.tz',
      'https://x.com/DSEtanzania',
      'https://www.linkedin.com/company/dar-es-salaam-stock-exchange/',
      '',
    ),
    b(
      'Bank of Tanzania (sovereign primary auctions)',
      'https://www.bot.go.tz',
      'info@bot.go.tz',
      '',
      '',
      '',
    ),
  ],
  ZM: [
    b(
      'Lusaka Securities Exchange (LuSE) — Government Bond Market',
      'https://luse.co.zm',
      'info@luse.co.zm',
      '',
      'https://www.linkedin.com/company/lusaka-securities-exchange/',
      '',
    ),
  ],
  ZW: [
    b(
      'Zimbabwe Stock Exchange (ZSE)',
      'https://www.zse.co.zw',
      'info@zse.co.zw',
      'https://x.com/ZSE_OFFICIAL',
      'https://www.linkedin.com/company/zimbabwe-stock-exchange/',
      '',
    ),
    b(
      'Victoria Falls Stock Exchange (VFEX) — USD-denominated debt',
      'https://www.vfex.exchange',
      'info@vfex.exchange',
      'https://x.com/VFEX_Exchange',
      'https://www.linkedin.com/company/vfex/',
      '',
    ),
  ],
}
