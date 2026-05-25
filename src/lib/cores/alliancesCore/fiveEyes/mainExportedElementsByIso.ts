import type { FiveEyesMemberIsoCode } from './fiveEyesMemberIsoCodes'
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
 * Five Eyes signatories (informational; verify against USGS Mineral Commodity Summaries,
 * BGS World Mineral Production, and UN Comtrade periodically). All five are large net
 * exporters of mined / refined elements.
 */
export const FIVE_EYES_MAIN_EXPORTED_ELEMENTS: Record<FiveEyesMemberIsoCode, MainExportedElements> = {
  AU: e(
    'Iron (Fe)',
    'Aluminum (Al)',
    'Carbon (C)',
    'Lithium (Li)',
    'Gold (Au)',
    'Copper (Cu)',
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
  NZ: e(
    'Gold (Au)',
    'Aluminum (Al)',
    'Iron (Fe)',
    'Carbon (C)',
    'Silver (Ag)',
    'Hydrogen (H)',
    'Titanium (Ti)',
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
