import type { CptppMemberIsoCode } from './cptppMemberIsoCodes'
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
 * Bond market venues by ISO 3166-1 alpha-2 for CPTPP (Comprehensive and Progressive
 * Agreement for Trans-Pacific Partnership) parties in this module (informational; verify
 * URLs, handles, and API bases before production use). CPTPP spans major Pacific-rim
 * sovereign-bond markets (JP, CA, AU, MX), Southeast Asian hubs (SG, MY, VN), and the
 * UK (acceded party). Pattern:
 *   - National listed-bond exchanges and OTC fixed-income platforms appear as the primary
 *     entry where they exist.
 *   - Sovereign primary-market desks (DMO / MoF / central bank) are listed alongside
 *     exchanges for major economies (AU, CA, CL, JP, MX, NZ, PE, GB, VN).
 *   - Brunei (BN) has no listed bond market — AMBD T-bills / Sukuk desk only.
 * `apiEndpoint` is the empty string for virtually all venues — distribution via paid
 * Bloomberg / Refinitiv / vendor feeds. Verify periodically.
 */
export const CPTPP_BOND_MARKETS: Record<CptppMemberIsoCode, readonly BondMarketVenue[]> = {
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
  BN: [
    b(
      'Autoriti Monetari Brunei Darussalam (AMBD — T-bills / Sukuk desk; no listed bond venue)',
      'https://www.ambd.gov.bn',
      'info@ambd.gov.bn',
      '',
      'https://www.linkedin.com/company/autoriti-monetari-brunei-darussalam/',
      '',
    ),
  ],
  CA: [
    b(
      'TMX Group — Toronto Stock Exchange / TSX Venture (listed bonds)',
      'https://www.tmx.com',
      'info@tmx.com',
      'https://x.com/TMXGroup',
      'https://www.linkedin.com/company/tmx-group/',
      '',
    ),
    b(
      'Bank of Canada (Government of Canada bond auctions)',
      'https://www.bankofcanada.ca',
      'info@bankofcanada.ca',
      'https://x.com/BankofCanada',
      'https://www.linkedin.com/company/bank-of-canada/',
      '',
    ),
  ],
  CL: [
    b(
      'Bolsa de Comercio de Santiago (BCS)',
      'https://www.bolsadesantiago.com',
      'info@bcs.cl',
      'https://x.com/bcs_cl',
      'https://www.linkedin.com/company/bolsa-de-comercio-de-santiago/',
      '',
    ),
    b(
      'Ministerio de Hacienda — Tesorería General de la República (sovereign primary)',
      'https://www.hacienda.cl',
      'contacto@hacienda.cl',
      '',
      '',
      '',
    ),
  ],
  JP: [
    b(
      'Japan Exchange Group (JPX) — Tokyo Stock Exchange (listed corporate bonds)',
      'https://www.jpx.co.jp',
      'info@jpx.co.jp',
      'https://x.com/JPX_official',
      'https://www.linkedin.com/company/japan-exchange-group/',
      '',
    ),
    b(
      'Ministry of Finance Japan — Government Bond Management (JGB auctions)',
      'https://www.mof.go.jp',
      'zeimu-siryou@mof.go.jp',
      '',
      '',
      '',
    ),
  ],
  MY: [
    b(
      'Bursa Malaysia — Bond Market',
      'https://www.bursamalaysia.com',
      'bursamalaysia@bursamalaysia.com',
      'https://x.com/BursaMalaysia',
      'https://www.linkedin.com/company/bursa-malaysia/',
      '',
    ),
    b(
      'Bank Negara Malaysia — Malaysian Government Securities (MGS primary)',
      'https://www.bnm.gov.my',
      'bnmtelelink@bnm.gov.my',
      'https://x.com/BNM_official',
      'https://www.linkedin.com/company/bank-negara-malaysia/',
      '',
    ),
  ],
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
  NZ: [
    b(
      'NZX Limited — Debt Market',
      'https://www.nzx.com',
      'info@nzx.com',
      'https://x.com/NZXGroup',
      'https://www.linkedin.com/company/nzx-limited/',
      '',
    ),
    b(
      'New Zealand Debt Management Office (NZDMO — sovereign primary)',
      'https://debtmanagement.treasury.govt.nz',
      'info@treasury.govt.nz',
      '',
      '',
      '',
    ),
  ],
  PE: [
    b(
      'Bolsa de Valores de Lima (BVL)',
      'https://www.bvl.com.pe',
      'atencion@bvl.com.pe',
      'https://x.com/BVLperu',
      'https://www.linkedin.com/company/bolsa-de-valores-de-lima/',
      '',
    ),
    b(
      'Ministerio de Economía y Finanzas — Dirección General del Tesoro Público (sovereign primary)',
      'https://www.mef.gob.pe',
      'consultas@mef.gob.pe',
      '',
      '',
      '',
    ),
  ],
  SG: [
    b(
      'Singapore Exchange (SGX) — Fixed Income',
      'https://www.sgx.com',
      'helpdesk@sgx.com',
      'https://x.com/SGX',
      'https://www.linkedin.com/company/sgx/',
      '',
    ),
    b(
      'Monetary Authority of Singapore (MAS — Singapore Government Securities primary)',
      'https://www.mas.gov.sg',
      'contact@mas.gov.sg',
      'https://x.com/mas_sg',
      'https://www.linkedin.com/company/monetary-authority-of-singapore/',
      '',
    ),
  ],
  GB: [
    b(
      'London Stock Exchange (LSE) — Main Market / ORB (Order book for Retail Bonds)',
      'https://www.londonstockexchange.com',
      'info@londonstockexchange.com',
      'https://x.com/LSEplc',
      'https://www.linkedin.com/company/london-stock-exchange/',
      '',
    ),
    b(
      'UK Debt Management Office (DMO — sovereign primary)',
      'https://www.dmo.gov.uk',
      'enquiries@dmo.gov.uk',
      'https://x.com/UKDMO',
      'https://www.linkedin.com/company/debt-management-office/',
      '',
    ),
  ],
  VN: [
    b(
      'Hanoi Stock Exchange (HNX) — Government & Corporate Bond Market',
      'https://www.hnx.vn',
      'info@hnx.vn',
      '',
      'https://www.linkedin.com/company/hanoi-stock-exchange/',
      '',
    ),
    b(
      'Ho Chi Minh Stock Exchange (HOSE) — Corporate Bonds',
      'https://www.hsx.vn',
      'info@hsx.vn',
      '',
      '',
      '',
    ),
    b(
      'State Treasury of Vietnam (sovereign primary)',
      'https://www.kbnn.gov.vn',
      'info@kbnn.gov.vn',
      '',
      '',
      '',
    ),
  ],
}
