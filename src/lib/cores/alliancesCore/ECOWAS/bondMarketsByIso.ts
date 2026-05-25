import type { EcowasMemberIsoCode } from './ecowasMemberIsoCodes'
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
 * Bourse Régionale des Valeurs Mobilières — the single regional listed exchange for the
 * eight UEMOA / West African CFA franc-zone states (BJ, BF, CI, GW, ML, NE, SN, TG).
 */
const BRVM = b(
  'BRVM (Bourse Régionale des Valeurs Mobilières)',
  'https://www.brvm.org',
  'info@brvm.org',
  'https://x.com/brvm_officiel',
  'https://www.linkedin.com/company/brvm/',
  '',
)

/**
 * Bond market venues by ISO 3166-1 alpha-2 for ECOWAS (Economic Community of West
 * African States) members in this module (informational; verify URLs, handles, and API
 * bases before production use). Pattern:
 *   - UEMOA / XOF franc-zone members (BJ, CI, GW, SN, TG) share the BRVM regional exchange.
 *   - Cape Verde (CV) has BVC; Ghana (GH) has GFIM; Nigeria (NG) lists FMDQ + NGX + DMO.
 *   - Countries with no listed bond venue use the central bank's Treasury bill / bond desk.
 * `apiEndpoint` is the empty string for virtually all venues. Verify periodically.
 */
export const ECOWAS_BOND_MARKETS: Record<EcowasMemberIsoCode, readonly BondMarketVenue[]> = {
  BJ: [BRVM],
  CV: [
    b(
      'Bolsa de Valores de Cabo Verde (BVC)',
      'https://www.bvc.cv',
      'bvc@bvc.cv',
      '',
      '',
      '',
    ),
  ],
  GM: [
    b(
      'Central Bank of The Gambia (T-bills / Sukuk Al-Salaam desk)',
      'https://www.cbg.gm',
      'info@cbg.gm',
      'https://x.com/CBGambia',
      'https://www.linkedin.com/company/central-bank-of-the-gambia/',
      '',
    ),
  ],
  GH: [
    b(
      'Ghana Fixed Income Market (GFIM) — Ghana Stock Exchange',
      'https://gse.com.gh/gfim',
      'info@gse.com.gh',
      'https://x.com/GSEghana',
      'https://www.linkedin.com/company/ghana-stock-exchange/',
      '',
    ),
  ],
  GN: [
    b(
      'Banque Centrale de la République de Guinée (T-bills desk)',
      'https://www.bcrg-guinee.org',
      'info@bcrg-guinee.org',
      '',
      '',
      '',
    ),
  ],
  GW: [BRVM],
  CI: [BRVM],
  LR: [
    b(
      'Central Bank of Liberia (T-bills desk; no listed bond venue)',
      'https://www.cbl.org.lr',
      'info@cbl.org.lr',
      '',
      'https://www.linkedin.com/company/central-bank-of-liberia/',
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
  SN: [BRVM],
  SL: [
    b(
      'Bank of Sierra Leone (T-bills / T-bonds desk; no listed bond venue)',
      'https://www.bsl.gov.sl',
      'info@bsl.gov.sl',
      '',
      '',
      '',
    ),
  ],
  TG: [BRVM],
}
