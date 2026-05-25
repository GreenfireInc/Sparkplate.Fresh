import type { AseanMemberIsoCode } from './aseanMemberIsoCodes'
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
 * Seven principal exported chemical elements (mined or refined) by ISO 3166-1 alpha-2
 * for ASEAN member states (informational; verify against USGS Mineral Commodity Summaries
 * and UN Comtrade periodically). Hydrocarbon-led economies carry `Carbon (C)` and
 * `Hydrogen (H)`; semiconductor / wafer hubs carry `Silicon (Si)`.
 */
export const ASEAN_MAIN_EXPORTED_ELEMENTS: Record<AseanMemberIsoCode, MainExportedElements> = {
  BN: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Sulfur (S)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Silicon (Si)',
    'Calcium (Ca)',
  ),
  KH: e(
    'Iron (Fe)',
    'Manganese (Mn)',
    'Gold (Au)',
    'Aluminum (Al)',
    'Phosphorus (P)',
    'Calcium (Ca)',
    'Carbon (C)',
  ),
  ID: e(
    'Carbon (C)',
    'Nickel (Ni)',
    'Copper (Cu)',
    'Tin (Sn)',
    'Gold (Au)',
    'Aluminum (Al)',
    'Hydrogen (H)',
  ),
  LA: e(
    'Copper (Cu)',
    'Gold (Au)',
    'Tin (Sn)',
    'Iron (Fe)',
    'Potassium (K)',
    'Silver (Ag)',
    'Zinc (Zn)',
  ),
  MY: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Tin (Sn)',
    'Aluminum (Al)',
    'Iron (Fe)',
    'Gold (Au)',
    'Silicon (Si)',
  ),
  MM: e(
    'Tin (Sn)',
    'Tungsten (W)',
    'Lead (Pb)',
    'Zinc (Zn)',
    'Copper (Cu)',
    'Carbon (C)',
    'Antimony (Sb)',
  ),
  PH: e(
    'Nickel (Ni)',
    'Copper (Cu)',
    'Gold (Au)',
    'Iron (Fe)',
    'Chromium (Cr)',
    'Cobalt (Co)',
    'Silver (Ag)',
  ),
  SG: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Silicon (Si)',
    'Sulfur (S)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Gold (Au)',
  ),
  TH: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Tin (Sn)',
    'Iron (Fe)',
    'Copper (Cu)',
    'Gold (Au)',
    'Silicon (Si)',
  ),
  TL: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Calcium (Ca)',
    'Silicon (Si)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Sodium (Na)',
  ),
  VN: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Silicon (Si)',
    'Copper (Cu)',
    'Tin (Sn)',
  ),
}
