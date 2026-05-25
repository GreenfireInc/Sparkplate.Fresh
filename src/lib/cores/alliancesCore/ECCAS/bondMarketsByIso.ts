import type { EccasMemberIsoCode } from './eccasMemberIsoCodes'
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
 * Bourse des Valeurs Mobilières d'Afrique Centrale — the unified CEMAC / Central African
 * CFA franc-zone exchange. Covers CM, CF, TD, CG, GQ, GA. No free public REST API.
 */
const BVMAC = b(
  'BVMAC (Bourse des Valeurs Mobilières d\'Afrique Centrale)',
  'https://www.bvm-ac.com',
  'contact@bvm-ac.com',
  'https://x.com/bvmacofficiel',
  'https://www.linkedin.com/company/bvmac/',
  '',
)

/**
 * Bond market venues by ISO 3166-1 alpha-2 for ECCAS (Economic Community of Central
 * African States) members in this module (informational; verify URLs, handles, and API
 * bases before production use). Pattern:
 *   - CEMAC franc-zone members (CM, CF, TD, CG, GQ, GA) share the BVMAC regional exchange.
 *   - Angola (AO) has BODIVA; DRC (CD) and Burundi (BI) use central-bank desks.
 *   - São Tomé and Príncipe (ST) uses the central bank T-bills desk.
 * `apiEndpoint` is the empty string for virtually all venues. Verify periodically.
 */
export const ECCAS_BOND_MARKETS: Record<EccasMemberIsoCode, readonly BondMarketVenue[]> = {
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
  BI: [
    b(
      'Banque de la République du Burundi (T-bills / T-bonds desk)',
      'https://www.brb.bi',
      'info@brb.bi',
      '',
      '',
      '',
    ),
  ],
  CM: [BVMAC],
  CF: [BVMAC],
  TD: [BVMAC],
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
  GQ: [BVMAC],
  GA: [BVMAC],
  CG: [BVMAC],
  ST: [
    b(
      'Banco Central de São Tomé e Príncipe (T-bills desk; no listed bond venue)',
      'https://www.bcstp.st',
      'bcstp@bcstp.st',
      '',
      '',
      '',
    ),
  ],
}
