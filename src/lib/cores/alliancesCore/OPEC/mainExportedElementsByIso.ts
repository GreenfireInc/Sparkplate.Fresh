import type { OpecMemberIsoCode } from './opecMemberIsoCodes'
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
 * Seven principal exported chemical elements (mined or refined) by ISO 3166-1 alpha-2 for the
 * 12 OPEC members (informational; verify against USGS Mineral Commodity Summaries, BGS World
 * Mineral Production, and UN Comtrade periodically). OPEC is the cartel of crude-oil exporting
 * states, so Carbon (C) and Hydrogen (H) — proxies for crude oil and natural gas / LNG /
 * NGL / petrochemical exports — lead virtually every list, followed by Sulfur (S) as a sour-gas
 * and refining co-product (notably SA Ghawar / Khurais, KW Burgan, AE Habshan, IR South Pars).
 * Aluminum (Al) reflects large smelting capacity inside the bloc (EGA in AE, Sohar in OM-
 * adjacent context, Aluminium Bahrain in BH, ALBA-style; Saudi Ma'aden Ras Al Khair). Helium
 * (He) appears for AE (Habshan); Phosphorus (P) for SA (Ma'aden Wa'ad Al Shamal); Gold (Au)
 * for SA, AE, DZ; Tin (Sn) / Tantalum (Ta) / Niobium (Nb) for NG.
 */
export const OPEC_MAIN_EXPORTED_ELEMENTS: Record<OpecMemberIsoCode, MainExportedElements> = {
  DZ: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Iron (Fe)',
    'Phosphorus (P)',
    'Sulfur (S)',
    'Gold (Au)',
    'Mercury (Hg)',
  ),
  CG: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Iron (Fe)',
    'Potassium (K)',
    'Copper (Cu)',
    'Calcium (Ca)',
    'Aluminum (Al)',
  ),
  GQ: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Sulfur (S)',
    'Iron (Fe)',
    'Calcium (Ca)',
    'Silicon (Si)',
    'Aluminum (Al)',
  ),
  GA: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Manganese (Mn)',
    'Iron (Fe)',
    'Gold (Au)',
    'Aluminum (Al)',
    'Sulfur (S)',
  ),
  IR: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Sulfur (S)',
    'Iron (Fe)',
    'Copper (Cu)',
    'Zinc (Zn)',
    'Aluminum (Al)',
  ),
  IQ: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Sulfur (S)',
    'Phosphorus (P)',
    'Iron (Fe)',
    'Calcium (Ca)',
    'Aluminum (Al)',
  ),
  KW: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Sulfur (S)',
    'Nitrogen (N)',
    'Aluminum (Al)',
    'Calcium (Ca)',
    'Silicon (Si)',
  ),
  LY: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Sulfur (S)',
    'Iron (Fe)',
    'Calcium (Ca)',
    'Sodium (Na)',
    'Aluminum (Al)',
  ),
  NG: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Tin (Sn)',
    'Tantalum (Ta)',
    'Niobium (Nb)',
    'Iron (Fe)',
    'Sulfur (S)',
  ),
  SA: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Sulfur (S)',
    'Phosphorus (P)',
    'Aluminum (Al)',
    'Gold (Au)',
    'Copper (Cu)',
  ),
  AE: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Aluminum (Al)',
    'Sulfur (S)',
    'Helium (He)',
    'Iron (Fe)',
    'Gold (Au)',
  ),
  VE: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Gold (Au)',
    'Tantalum (Ta)',
    'Sulfur (S)',
  ),
}
