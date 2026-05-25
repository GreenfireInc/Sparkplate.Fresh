import type { EcowasMemberIsoCode } from './ecowasMemberIsoCodes'
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
 * ECOWAS (Economic Community of West African States) member states (informational; verify
 * against USGS Mineral Commodity Summaries, BGS World Mineral Production, and UN Comtrade
 * periodically). Sahel-belt gold producers (GH, CI, BF would be Sahel-side) carry `Gold (Au)`;
 * bauxite-led GN carries `Aluminum (Al)`; phosphate-led SN, TG carry `Phosphorus (P)`;
 * hydrocarbon-led NG carries `Carbon (C)` + `Hydrogen (H)`.
 */
export const ECOWAS_MAIN_EXPORTED_ELEMENTS: Record<EcowasMemberIsoCode, MainExportedElements> = {
  BJ: e(
    'Calcium (Ca)',
    'Carbon (C)',
    'Silicon (Si)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Gold (Au)',
    'Sodium (Na)',
  ),
  CV: e(
    'Sodium (Na)',
    'Calcium (Ca)',
    'Silicon (Si)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Sulfur (S)',
    'Magnesium (Mg)',
  ),
  GM: e(
    'Titanium (Ti)',
    'Zirconium (Zr)',
    'Silicon (Si)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Sodium (Na)',
    'Calcium (Ca)',
  ),
  GH: e(
    'Gold (Au)',
    'Manganese (Mn)',
    'Aluminum (Al)',
    'Carbon (C)',
    'Hydrogen (H)',
    'Lithium (Li)',
    'Iron (Fe)',
  ),
  GN: e(
    'Aluminum (Al)',
    'Iron (Fe)',
    'Gold (Au)',
    'Carbon (C)',
    'Uranium (U)',
    'Copper (Cu)',
    'Calcium (Ca)',
  ),
  GW: e(
    'Phosphorus (P)',
    'Aluminum (Al)',
    'Silicon (Si)',
    'Calcium (Ca)',
    'Iron (Fe)',
    'Sodium (Na)',
    'Sulfur (S)',
  ),
  CI: e(
    'Gold (Au)',
    'Carbon (C)',
    'Hydrogen (H)',
    'Manganese (Mn)',
    'Nickel (Ni)',
    'Aluminum (Al)',
    'Iron (Fe)',
  ),
  LR: e(
    'Iron (Fe)',
    'Gold (Au)',
    'Carbon (C)',
    'Manganese (Mn)',
    'Aluminum (Al)',
    'Calcium (Ca)',
    'Silver (Ag)',
  ),
  NG: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Tin (Sn)',
    'Tantalum (Ta)',
    'Niobium (Nb)',
    'Lead (Pb)',
    'Gold (Au)',
  ),
  SN: e(
    'Phosphorus (P)',
    'Gold (Au)',
    'Titanium (Ti)',
    'Zirconium (Zr)',
    'Carbon (C)',
    'Hydrogen (H)',
    'Iron (Fe)',
  ),
  SL: e(
    'Iron (Fe)',
    'Titanium (Ti)',
    'Zirconium (Zr)',
    'Carbon (C)',
    'Aluminum (Al)',
    'Gold (Au)',
    'Manganese (Mn)',
  ),
  TG: e(
    'Phosphorus (P)',
    'Calcium (Ca)',
    'Iron (Fe)',
    'Manganese (Mn)',
    'Aluminum (Al)',
    'Silicon (Si)',
    'Carbon (C)',
  ),
}
