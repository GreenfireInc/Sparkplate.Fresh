import type { MiktaMemberIsoCode } from './miktaMemberIsoCodes'
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
 * Seven principal exported chemical elements (mined or refined) by ISO 3166-1 alpha-2 for MIKTA
 * members (informational; verify against USGS Mineral Commodity Summaries, BGS World Mineral
 * Production, and UN Comtrade periodically). MIKTA is a cross-regional middle-power consultative
 * partnership, so the profiles vary widely:
 *  - MX: Silver (Ag) and Copper (Cu) dominance (world-leading Ag producer; Buenavista / Cananea Cu).
 *  - ID: Coal-derived Carbon (C), Nickel (Ni) for EV/stainless feedstock, Tin (Sn) Bangka-Belitung.
 *  - KR: Silicon (Si) and Copper (Cu) refining hubs (LS-Nikko Onsan smelter; Posco etc.); Indium (In)
 *    by-product from Zn refining historically.
 *  - TR: Iron (Fe) ferrochrome / Chromite (Cr) — major Cr exporter; Boron (B) Eti Maden global
 *    leadership; Cu / Au / Zn from Çayeli / Çöpler.
 *  - AU: Iron (Fe), Aluminum (Al — alumina/bauxite), Carbon (C — coal), Lithium (Li) hard-rock
 *    spodumene world leader, Gold (Au), Copper (Cu), Uranium (U).
 */
export const MIKTA_MAIN_EXPORTED_ELEMENTS: Record<MiktaMemberIsoCode, MainExportedElements> = {
  MX: e(
    'Silver (Ag)',
    'Copper (Cu)',
    'Gold (Au)',
    'Zinc (Zn)',
    'Iron (Fe)',
    'Lead (Pb)',
    'Carbon (C)',
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
  AU: e(
    'Iron (Fe)',
    'Aluminum (Al)',
    'Carbon (C)',
    'Lithium (Li)',
    'Gold (Au)',
    'Copper (Cu)',
    'Uranium (U)',
  ),
}
