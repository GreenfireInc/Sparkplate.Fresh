import type { EacMemberIsoCode } from './eacMemberIsoCodes'
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
 * EAC (East African Community) partner states (informational; verify against USGS Mineral
 * Commodity Summaries, BGS World Mineral Production, and UN Comtrade periodically). Strongly
 * mineral-led region: Great Lakes 3T (Ta / Sn / W) belt (BI, RW), Copperbelt fringe (CD),
 * world-class Au / C (graphite) potential (TZ), heavy mineral sands (KE), and oil-led
 * Albertine Graben (UG, SS).
 */
export const EAC_MAIN_EXPORTED_ELEMENTS: Record<EacMemberIsoCode, MainExportedElements> = {
  BI: e(
    'Gold (Au)',
    'Tin (Sn)',
    'Tungsten (W)',
    'Tantalum (Ta)',
    'Niobium (Nb)',
    'Nickel (Ni)',
    'Iron (Fe)',
  ),
  CD: e(
    'Cobalt (Co)',
    'Copper (Cu)',
    'Carbon (C)',
    'Gold (Au)',
    'Tin (Sn)',
    'Tantalum (Ta)',
    'Germanium (Ge)',
  ),
  KE: e(
    'Titanium (Ti)',
    'Zirconium (Zr)',
    'Sodium (Na)',
    'Fluorine (F)',
    'Gold (Au)',
    'Niobium (Nb)',
    'Calcium (Ca)',
  ),
  RW: e(
    'Tantalum (Ta)',
    'Tin (Sn)',
    'Tungsten (W)',
    'Gold (Au)',
    'Niobium (Nb)',
    'Beryllium (Be)',
    'Iron (Fe)',
  ),
  SO: e(
    'Calcium (Ca)',
    'Silicon (Si)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Sulfur (S)',
    'Sodium (Na)',
    'Magnesium (Mg)',
  ),
  SS: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Sulfur (S)',
    'Gold (Au)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Calcium (Ca)',
  ),
  TZ: e(
    'Gold (Au)',
    'Carbon (C)',
    'Nickel (Ni)',
    'Copper (Cu)',
    'Silver (Ag)',
    'Titanium (Ti)',
    'Niobium (Nb)',
  ),
  UG: e(
    'Gold (Au)',
    'Copper (Cu)',
    'Carbon (C)',
    'Hydrogen (H)',
    'Cobalt (Co)',
    'Iron (Fe)',
    'Phosphorus (P)',
  ),
}
