import type { RcepMemberIsoCode } from './rcepMemberIsoCodes'
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
 * Seven principal exported chemical elements (mined or refined) by ISO 3166-1 alpha-2 for the
 * 15 RCEP Parties (informational; verify against USGS Mineral Commodity Summaries, BGS World
 * Mineral Production, and UN Comtrade periodically). RCEP spans dominant primary producers
 * (CN, AU, ID), refining and re-export hubs (JP, KR, SG, MY, TH), large coal / hydrocarbon
 * exporters (AU, ID, BN, MM), tin / tantalum / tungsten ASEAN belt (MY, ID, MM, TH, VN) and
 * mineral-sands / nickel-cobalt processing in the Philippines. Hydrocarbon-derived elemental
 * references (Carbon (C), Hydrogen (H)) appear for the largest crude / gas / coal exporters
 * (AU, BN, ID, MY, MM).
 */
export const RCEP_MAIN_EXPORTED_ELEMENTS: Record<RcepMemberIsoCode, MainExportedElements> = {
  AU: e(
    'Iron (Fe)',
    'Aluminum (Al)',
    'Carbon (C)',
    'Lithium (Li)',
    'Gold (Au)',
    'Copper (Cu)',
    'Uranium (U)',
  ),
  BN: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Sulfur (S)',
    'Iron (Fe)',
    'Calcium (Ca)',
    'Silicon (Si)',
    'Aluminum (Al)',
  ),
  KH: e(
    'Iron (Fe)',
    'Manganese (Mn)',
    'Gold (Au)',
    'Calcium (Ca)',
    'Silicon (Si)',
    'Aluminum (Al)',
    'Carbon (C)',
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
  ID: e(
    'Carbon (C)',
    'Nickel (Ni)',
    'Tin (Sn)',
    'Copper (Cu)',
    'Aluminum (Al)',
    'Gold (Au)',
    'Hydrogen (H)',
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
  KR: e(
    'Silicon (Si)',
    'Copper (Cu)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Zinc (Zn)',
    'Gold (Au)',
    'Tungsten (W)',
  ),
  LA: e(
    'Copper (Cu)',
    'Gold (Au)',
    'Potassium (K)',
    'Tin (Sn)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Calcium (Ca)',
  ),
  MY: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Tin (Sn)',
    'Aluminum (Al)',
    'Silicon (Si)',
    'Iron (Fe)',
    'Copper (Cu)',
  ),
  MM: e(
    'Tin (Sn)',
    'Tungsten (W)',
    'Antimony (Sb)',
    'Lead (Pb)',
    'Zinc (Zn)',
    'Carbon (C)',
    'Hydrogen (H)',
  ),
  NZ: e(
    'Aluminum (Al)',
    'Iron (Fe)',
    'Calcium (Ca)',
    'Silicon (Si)',
    'Carbon (C)',
    'Gold (Au)',
    'Sodium (Na)',
  ),
  PH: e(
    'Nickel (Ni)',
    'Cobalt (Co)',
    'Copper (Cu)',
    'Gold (Au)',
    'Chromium (Cr)',
    'Iron (Fe)',
    'Silver (Ag)',
  ),
  SG: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Silicon (Si)',
    'Copper (Cu)',
    'Gold (Au)',
    'Aluminum (Al)',
    'Tin (Sn)',
  ),
  TH: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Tin (Sn)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Zinc (Zn)',
    'Antimony (Sb)',
  ),
  VN: e(
    'Carbon (C)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Tungsten (W)',
    'Titanium (Ti)',
    'Bismuth (Bi)',
    'Copper (Cu)',
  ),
}
