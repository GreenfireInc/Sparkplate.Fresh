import type { GccMemberIsoCode } from './gccMemberIsoCodes'
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
 * GCC members (informational; verify against USGS Mineral Commodity Summaries, BGS World
 * Mineral Production, and UN Comtrade periodically). The GCC is dominated by hydrocarbon
 * value chains, so Carbon (C) and Hydrogen (H) (from crude oil / natural gas / LNG /
 * petrochemical / blue-and-green ammonia projects) appear across all members. Sulfur (S)
 * is a major sour-gas co-product (notably KSA Ghawar/Khurais, Qatar North Field). Aluminum
 * (Al) reflects large-scale smelting (Aluminium Bahrain ALBA, Emirates Global Aluminium EGA,
 * Ma'aden Ras Al Khair, Sohar Aluminium, Qatalum, EQUATE feedstock). Phosphorus (P) appears
 * for Saudi Arabia (Ma'aden phosphate complex, Wa'ad Al Shamal). Helium (He) appears for
 * Qatar (Ras Laffan — second-largest commercial helium liquefaction globally) and the UAE
 * (Habshan helium plant). Copper (Cu) and Gold (Au) appear for Saudi Arabia (Ma'aden gold
 * belt) and Oman (Sohar copper-gold belt).
 */
export const GCC_MAIN_EXPORTED_ELEMENTS: Record<GccMemberIsoCode, MainExportedElements> = {
  BH: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Aluminum (Al)',
    'Iron (Fe)',
    'Sulfur (S)',
    'Nitrogen (N)',
    'Calcium (Ca)',
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
  OM: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Aluminum (Al)',
    'Copper (Cu)',
    'Iron (Fe)',
    'Chromium (Cr)',
    'Gold (Au)',
  ),
  QA: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Helium (He)',
    'Sulfur (S)',
    'Nitrogen (N)',
    'Aluminum (Al)',
    'Iron (Fe)',
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
}
