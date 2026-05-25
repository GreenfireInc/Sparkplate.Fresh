import type { MintMemberIsoCode } from './mintMemberIsoCodes'
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
 * Seven principal exported chemical elements (mined or refined) by ISO 3166-1 alpha-2 for MINT
 * members (informational; verify against USGS Mineral Commodity Summaries, BGS World Mineral
 * Production, and UN Comtrade periodically). MINT (Mexico / Indonesia / Nigeria / Turkey) is an
 * informal investment grouping coined by Fidelity and popularised by Jim O'Neill — there is no
 * shared resource profile, so each member's seven-element list reflects its own mining and
 * refining base:
 *  - MX: world-leading Silver (Ag); Copper (Cu — Buenavista / Cananea); Au / Zn / Pb / Fe.
 *  - ID: coal-derived Carbon (C); Nickel (Ni) EV / stainless feedstock; Tin (Sn) Bangka-Belitung;
 *    Copper (Cu — Grasberg / Batu Hijau); Aluminum (Al — Inalum); Gold (Au); hydrocarbon-derived H.
 *  - NG: dominant Carbon (C) and Hydrogen (H) from crude oil and gas; Tin (Sn — Plateau); Tantalum
 *    (Ta) / Niobium (Nb) artisanal; Iron (Fe — Itakpe); Sulfur (S — sour-gas / petrochemical).
 *  - TR: Iron (Fe); Chromium (Cr — major Cr exporter); Copper (Cu — Çayeli / Mazıdağı); Boron (B —
 *    Eti Maden global leadership); Aluminum (Al); Gold (Au — Çöpler / Kışladağ); Zinc (Zn).
 */
export const MINT_MAIN_EXPORTED_ELEMENTS: Record<MintMemberIsoCode, MainExportedElements> = {
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
  NG: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Tin (Sn)',
    'Tantalum (Ta)',
    'Niobium (Nb)',
    'Iron (Fe)',
    'Sulfur (S)',
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
}
