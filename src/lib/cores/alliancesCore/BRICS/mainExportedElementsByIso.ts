import type { BricsMemberIsoCode } from './bricsMemberIsoCodes'
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
 * for BRICS founding members (informational; verify against USGS Mineral Commodity Summaries
 * and UN Comtrade periodically). Each entry reflects each country's dominant mining / refining
 * / hydrocarbon footprint.
 */
export const BRICS_MAIN_EXPORTED_ELEMENTS: Record<BricsMemberIsoCode, MainExportedElements> = {
  BR: e(
    'Iron (Fe)',
    'Niobium (Nb)',
    'Aluminum (Al)',
    'Carbon (C)',
    'Hydrogen (H)',
    'Copper (Cu)',
    'Gold (Au)',
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
  IN: e(
    'Iron (Fe)',
    'Aluminum (Al)',
    'Carbon (C)',
    'Hydrogen (H)',
    'Copper (Cu)',
    'Manganese (Mn)',
    'Titanium (Ti)',
  ),
  CN: e(
    'Carbon (C)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Silicon (Si)',
    'Copper (Cu)',
    'Tungsten (W)',
    'Antimony (Sb)',
  ),
  ZA: e(
    'Platinum (Pt)',
    'Palladium (Pd)',
    'Gold (Au)',
    'Chromium (Cr)',
    'Manganese (Mn)',
    'Carbon (C)',
    'Iron (Fe)',
  ),
}
