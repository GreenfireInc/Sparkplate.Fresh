import type { OecsMemberIsoCode } from './oecsMemberIsoCodes'
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
 * Seven principal exported chemical elements (mined or refined) by ISO 3166-1 alpha-2 for OECS
 * members (informational; verify against USGS Mineral Commodity Summaries, BGS World Mineral
 * Production, and UN Comtrade periodically). The Eastern Caribbean island microstates have very
 * small mining sectors dominated by aggregate / construction-mineral exports (pumice / sand /
 * gravel / lime), with no commercial metallic-ore mining. The seven-element lists therefore
 * reflect generic crustal / aggregate / sea-derived elements (Ca, Si, Fe, Al, Na, Cl, Mg, C),
 * the C / H entries reflect petroleum re-exports / bunkering rather than indigenous production,
 * and Sulfur (S) appears for Saint Lucia (Sulphur Springs, La Soufrière) and Saint Vincent and
 * the Grenadines (La Soufrière complex) reflecting volcanogenic sulfur and pumice exports.
 */
export const OECS_MAIN_EXPORTED_ELEMENTS: Record<OecsMemberIsoCode, MainExportedElements> = {
  AG: e(
    'Calcium (Ca)',
    'Silicon (Si)',
    'Sodium (Na)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Carbon (C)',
    'Magnesium (Mg)',
  ),
  DM: e(
    'Calcium (Ca)',
    'Silicon (Si)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Sulfur (S)',
    'Carbon (C)',
    'Sodium (Na)',
  ),
  GD: e(
    'Calcium (Ca)',
    'Silicon (Si)',
    'Sodium (Na)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Carbon (C)',
    'Magnesium (Mg)',
  ),
  MS: e(
    'Silicon (Si)',
    'Calcium (Ca)',
    'Aluminum (Al)',
    'Iron (Fe)',
    'Sulfur (S)',
    'Carbon (C)',
    'Sodium (Na)',
  ),
  KN: e(
    'Calcium (Ca)',
    'Silicon (Si)',
    'Sodium (Na)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Carbon (C)',
    'Magnesium (Mg)',
  ),
  LC: e(
    'Sulfur (S)',
    'Calcium (Ca)',
    'Silicon (Si)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Carbon (C)',
    'Sodium (Na)',
  ),
  VC: e(
    'Sulfur (S)',
    'Calcium (Ca)',
    'Silicon (Si)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Carbon (C)',
    'Sodium (Na)',
  ),
  AI: e(
    'Sodium (Na)',
    'Chlorine (Cl)',
    'Calcium (Ca)',
    'Silicon (Si)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Carbon (C)',
  ),
}
