import type { CptppMemberIsoCode } from './cptppMemberIsoCodes'
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
 * CPTPP parties (informational; verify against USGS Mineral Commodity Summaries and UN Comtrade
 * periodically). Pacific-rim spread includes resource-led economies (AU, CA, CL, PE) and
 * highly refining / re-exporting hubs (JP, SG); semiconductor / wafer producers (JP, MY, SG, VN)
 * carry `Silicon (Si)`.
 */
export const CPTPP_MAIN_EXPORTED_ELEMENTS: Record<CptppMemberIsoCode, MainExportedElements> = {
  AU: e(
    'Iron (Fe)',
    'Aluminum (Al)',
    'Carbon (C)',
    'Lithium (Li)',
    'Gold (Au)',
    'Copper (Cu)',
    'Nickel (Ni)',
  ),
  BN: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Sulfur (S)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Silicon (Si)',
    'Calcium (Ca)',
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
  CL: e(
    'Copper (Cu)',
    'Lithium (Li)',
    'Molybdenum (Mo)',
    'Iron (Fe)',
    'Silver (Ag)',
    'Gold (Au)',
    'Boron (B)',
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
  MY: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Tin (Sn)',
    'Aluminum (Al)',
    'Iron (Fe)',
    'Gold (Au)',
    'Silicon (Si)',
  ),
  MX: e(
    'Silver (Ag)',
    'Gold (Au)',
    'Copper (Cu)',
    'Zinc (Zn)',
    'Lead (Pb)',
    'Carbon (C)',
    'Hydrogen (H)',
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
  PE: e(
    'Copper (Cu)',
    'Gold (Au)',
    'Silver (Ag)',
    'Zinc (Zn)',
    'Lead (Pb)',
    'Tin (Sn)',
    'Molybdenum (Mo)',
  ),
  SG: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Silicon (Si)',
    'Sulfur (S)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Gold (Au)',
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
  VN: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Silicon (Si)',
    'Copper (Cu)',
    'Tin (Sn)',
  ),
}
