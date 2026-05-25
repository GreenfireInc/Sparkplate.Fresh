import type { AesMemberIsoCode } from './aesMemberIsoCodes'
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
 * for AES member states (informational; verify against USGS Mineral Commodity Summaries
 * and UN Comtrade periodically).
 */
export const AES_MAIN_EXPORTED_ELEMENTS: Record<AesMemberIsoCode, MainExportedElements> = {
  BF: e(
    'Gold (Au)',
    'Zinc (Zn)',
    'Manganese (Mn)',
    'Copper (Cu)',
    'Silver (Ag)',
    'Lead (Pb)',
    'Phosphorus (P)',
  ),
  ML: e(
    'Gold (Au)',
    'Phosphorus (P)',
    'Lithium (Li)',
    'Uranium (U)',
    'Manganese (Mn)',
    'Iron (Fe)',
    'Copper (Cu)',
  ),
  NE: e(
    'Uranium (U)',
    'Gold (Au)',
    'Tin (Sn)',
    'Molybdenum (Mo)',
    'Phosphorus (P)',
    'Iron (Fe)',
    'Carbon (C)',
  ),
}
