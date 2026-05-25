import type { G7MemberIsoCode } from './g7MemberIsoCodes'
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
 * G7 members (informational; verify against USGS Mineral Commodity Summaries, BGS World
 * Mineral Production, and UN Comtrade periodically). G7 spans large primary producers
 * (CA, US) and refining / re-export hubs (JP, DE, FR, IT, GB).
 */
export const G7_MAIN_EXPORTED_ELEMENTS: Record<G7MemberIsoCode, MainExportedElements> = {
  CA: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Potassium (K)',
    'Aluminum (Al)',
    'Nickel (Ni)',
    'Gold (Au)',
    'Uranium (U)',
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
