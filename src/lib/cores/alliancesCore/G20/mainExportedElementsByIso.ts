import type { G20SovereignMemberIsoCode } from './g20MemberIsoCodes'
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
 * the 19 sovereign members of the G20 (informational; verify against USGS Mineral Commodity
 * Summaries, BGS World Mineral Production, and UN Comtrade periodically). The G20 spans
 * dominant primary producers (AU, BR, CA, CN, IN, ID, RU, SA, ZA, US), large refining /
 * re-export hubs (DE, JP, KR, IT), and mixed-profile economies (AR, FR, MX, TR, GB).
 *
 * Hydrocarbon-derived elemental references (Carbon (C), Hydrogen (H)) appear for the largest
 * crude-oil / natural-gas exporters (e.g. SA, RU, CA, US, AU coal). Helium (He) is listed for
 * US, which dominates global commercial helium liquefaction; Sulfur (S) is listed for SA and
 * CA as a co-product of sour-gas and oil-sand processing. The institutional members EU and AU
 * are intergovernmental seats and do not appear here.
 */
export const G20_MAIN_EXPORTED_ELEMENTS: Record<G20SovereignMemberIsoCode, MainExportedElements> = {
  AR: e(
    'Lithium (Li)',
    'Silver (Ag)',
    'Gold (Au)',
    'Copper (Cu)',
    'Boron (B)',
    'Iron (Fe)',
    'Zinc (Zn)',
  ),
  AU: e(
    'Iron (Fe)',
    'Aluminum (Al)',
    'Carbon (C)',
    'Lithium (Li)',
    'Gold (Au)',
    'Copper (Cu)',
    'Uranium (U)',
  ),
  BR: e(
    'Iron (Fe)',
    'Niobium (Nb)',
    'Aluminum (Al)',
    'Manganese (Mn)',
    'Copper (Cu)',
    'Gold (Au)',
    'Nickel (Ni)',
  ),
  CA: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Potassium (K)',
    'Aluminum (Al)',
    'Nickel (Ni)',
    'Gold (Au)',
    'Uranium (U)',
  ),
  CN: e(
    'Iron (Fe)',
    'Aluminum (Al)',
    'Copper (Cu)',
    'Silicon (Si)',
    'Gallium (Ga)',
    'Germanium (Ge)',
    'Tungsten (W)',
  ),
  FR: e(
    'Uranium (U)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Silicon (Si)',
    'Copper (Cu)',
    'Titanium (Ti)',
    'Gold (Au)',
  ),
  DE: e(
    'Carbon (C)',
    'Copper (Cu)',
    'Potassium (K)',
    'Aluminum (Al)',
    'Iron (Fe)',
    'Silicon (Si)',
    'Gallium (Ga)',
  ),
  IN: e(
    'Iron (Fe)',
    'Aluminum (Al)',
    'Carbon (C)',
    'Manganese (Mn)',
    'Chromium (Cr)',
    'Titanium (Ti)',
    'Zinc (Zn)',
  ),
  ID: e(
    'Carbon (C)',
    'Nickel (Ni)',
    'Tin (Sn)',
    'Copper (Cu)',
    'Aluminum (Al)',
    'Gold (Au)',
    'Hydrogen (H)',
  ),
  IT: e(
    'Iron (Fe)',
    'Aluminum (Al)',
    'Silicon (Si)',
    'Copper (Cu)',
    'Calcium (Ca)',
    'Lead (Pb)',
    'Zinc (Zn)',
  ),
  JP: e(
    'Copper (Cu)',
    'Gold (Au)',
    'Silver (Ag)',
    'Zinc (Zn)',
    'Indium (In)',
    'Silicon (Si)',
    'Iodine (I)',
  ),
  MX: e(
    'Silver (Ag)',
    'Copper (Cu)',
    'Gold (Au)',
    'Zinc (Zn)',
    'Iron (Fe)',
    'Lead (Pb)',
    'Carbon (C)',
  ),
  RU: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Palladium (Pd)',
    'Platinum (Pt)',
    'Nickel (Ni)',
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
  ZA: e(
    'Platinum (Pt)',
    'Palladium (Pd)',
    'Gold (Au)',
    'Iron (Fe)',
    'Chromium (Cr)',
    'Manganese (Mn)',
    'Carbon (C)',
  ),
  KR: e(
    'Silicon (Si)',
    'Copper (Cu)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Zinc (Zn)',
    'Gold (Au)',
    'Tungsten (W)',
  ),
  TR: e(
    'Iron (Fe)',
    'Chromium (Cr)',
    'Copper (Cu)',
    'Boron (B)',
    'Aluminum (Al)',
    'Gold (Au)',
    'Zinc (Zn)',
  ),
  GB: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Lithium (Li)',
    'Aluminum (Al)',
    'Iron (Fe)',
    'Copper (Cu)',
    'Tin (Sn)',
  ),
  US: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Helium (He)',
    'Copper (Cu)',
    'Gold (Au)',
    'Molybdenum (Mo)',
    'Silicon (Si)',
  ),
}
