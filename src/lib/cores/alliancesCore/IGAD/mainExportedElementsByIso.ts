import type { IgadMemberIsoCode } from './igadMemberIsoCodes'
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
 * Seven principal exported chemical elements (mined or refined) by ISO 3166-1 alpha-2 for IGAD
 * members (informational; verify against USGS Mineral Commodity Summaries, BGS World Mineral
 * Production, and UN Comtrade periodically). The Horn of Africa / Eastern Africa profile is
 * dominated by hydrocarbon flows through Sudan / South Sudan, artisanal and industrial Gold (Au)
 * mining (notably SD, ET, KE, UG, SS), copper-zinc-lead from Eritrea-style VMS belts and the
 * Kenyan Mrima Hill / coastal mineral sands, and re-export logistics through Djibouti. Carbon (C)
 * and Hydrogen (H) reflect crude-oil and gas exports (notably SS pipelined via SD; KE's Lokichar
 * basin pilot exports; UG's Lake Albert oil under development — informational).
 */
export const IGAD_MAIN_EXPORTED_ELEMENTS: Record<IgadMemberIsoCode, MainExportedElements> = {
  DJ: e(
    'Sodium (Na)',
    'Chlorine (Cl)',
    'Calcium (Ca)',
    'Carbon (C)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Silicon (Si)',
  ),
  ET: e(
    'Gold (Au)',
    'Tantalum (Ta)',
    'Iron (Fe)',
    'Potassium (K)',
    'Calcium (Ca)',
    'Carbon (C)',
    'Silicon (Si)',
  ),
  SO: e(
    'Iron (Fe)',
    'Calcium (Ca)',
    'Silicon (Si)',
    'Aluminum (Al)',
    'Sulfur (S)',
    'Carbon (C)',
    'Sodium (Na)',
  ),
  SS: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Gold (Au)',
    'Iron (Fe)',
    'Calcium (Ca)',
    'Silicon (Si)',
    'Aluminum (Al)',
  ),
  SD: e(
    'Gold (Au)',
    'Carbon (C)',
    'Hydrogen (H)',
    'Chromium (Cr)',
    'Iron (Fe)',
    'Manganese (Mn)',
    'Calcium (Ca)',
  ),
  KE: e(
    'Titanium (Ti)',
    'Zirconium (Zr)',
    'Carbon (C)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Sodium (Na)',
    'Fluorine (F)',
  ),
  UG: e(
    'Gold (Au)',
    'Copper (Cu)',
    'Cobalt (Co)',
    'Tin (Sn)',
    'Tungsten (W)',
    'Iron (Fe)',
    'Carbon (C)',
  ),
}
