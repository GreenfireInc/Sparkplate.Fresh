import type { AmuMemberIsoCode } from './amuMemberIsoCodes'
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
 * for AMU member states (informational; verify against USGS Mineral Commodity Summaries
 * and UN Comtrade periodically). Hydrocarbon exporters carry `Carbon (C)` and `Hydrogen (H)`.
 */
export const AMU_MAIN_EXPORTED_ELEMENTS: Record<AmuMemberIsoCode, MainExportedElements> = {
  DZ: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Helium (He)',
    'Iron (Fe)',
    'Phosphorus (P)',
    'Zinc (Zn)',
    'Mercury (Hg)',
  ),
  LY: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Iron (Fe)',
    'Potassium (K)',
    'Phosphorus (P)',
    'Sulfur (S)',
    'Magnesium (Mg)',
  ),
  MR: e(
    'Iron (Fe)',
    'Gold (Au)',
    'Copper (Cu)',
    'Phosphorus (P)',
    'Uranium (U)',
    'Manganese (Mn)',
    'Sodium (Na)',
  ),
  MA: e(
    'Phosphorus (P)',
    'Lead (Pb)',
    'Zinc (Zn)',
    'Copper (Cu)',
    'Cobalt (Co)',
    'Manganese (Mn)',
    'Silver (Ag)',
  ),
  TN: e(
    'Phosphorus (P)',
    'Iron (Fe)',
    'Lead (Pb)',
    'Zinc (Zn)',
    'Fluorine (F)',
    'Mercury (Hg)',
    'Calcium (Ca)',
  ),
}
