import type { EccasMemberIsoCode } from './eccasMemberIsoCodes'
import type { MainExportedElements } from './types'

function e(
  a: string,
  b: string,
  c: string,
  d: string,
  f: string,
  g: string,
  h: string,
): MainExportedElements {
  return [a, b, c, d, f, g, h]
}

/**
 * Seven principal exported chemical elements (mined or refined) by ISO 3166-1 alpha-2 for
 * ECCAS (Economic Community of Central African States) partner states (informational; verify
 * against USGS Mineral Commodity Summaries, BGS World Mineral Production, and UN Comtrade
 * periodically). Hydrocarbon-led (AO, GA, CG, GQ, CM, TD) carry `Carbon (C)` + `Hydrogen (H)`;
 * Copperbelt / Kivu (CD) leads with `Co` + `Cu`; Great Lakes 3T (BI) carries `Ta / Sn / W`;
 * CAR diamond / uranium (CF) leads with carbon and gold.
 */
export const ECCAS_MAIN_EXPORTED_ELEMENTS: Record<EccasMemberIsoCode, MainExportedElements> = {
  AO: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Iron (Fe)',
    'Manganese (Mn)',
    'Gold (Au)',
    'Copper (Cu)',
    'Phosphorus (P)',
  ),
  BI: e(
    'Gold (Au)',
    'Tin (Sn)',
    'Tungsten (W)',
    'Tantalum (Ta)',
    'Niobium (Nb)',
    'Nickel (Ni)',
    'Iron (Fe)',
  ),
  CM: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Aluminum (Al)',
    'Iron (Fe)',
    'Cobalt (Co)',
    'Manganese (Mn)',
    'Gold (Au)',
  ),
  CF: e(
    'Carbon (C)',
    'Gold (Au)',
    'Iron (Fe)',
    'Uranium (U)',
    'Copper (Cu)',
    'Manganese (Mn)',
    'Cobalt (Co)',
  ),
  TD: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Sulfur (S)',
    'Gold (Au)',
    'Sodium (Na)',
    'Iron (Fe)',
    'Aluminum (Al)',
  ),
  CD: e(
    'Cobalt (Co)',
    'Copper (Cu)',
    'Carbon (C)',
    'Gold (Au)',
    'Tin (Sn)',
    'Tantalum (Ta)',
    'Germanium (Ge)',
  ),
  GQ: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Sulfur (S)',
    'Gold (Au)',
    'Iron (Fe)',
    'Titanium (Ti)',
    'Aluminum (Al)',
  ),
  GA: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Manganese (Mn)',
    'Gold (Au)',
    'Iron (Fe)',
    'Niobium (Nb)',
    'Uranium (U)',
  ),
  CG: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Potassium (K)',
    'Iron (Fe)',
    'Gold (Au)',
    'Copper (Cu)',
    'Phosphorus (P)',
  ),
  ST: e(
    'Calcium (Ca)',
    'Silicon (Si)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Sodium (Na)',
    'Sulfur (S)',
    'Magnesium (Mg)',
  ),
}
