import type { SadcMemberIsoCode } from './sadcMemberIsoCodes'
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
 * 16 SADC members (informational; verify against USGS Mineral Commodity Summaries, BGS World
 * Mineral Production, and UN Comtrade periodically). The Southern African Development
 * Community is one of the most mineral-rich blocs in the world: ZA dominates the
 * platinum-group metals, gold, chrome and manganese chains; the DRC supplies the bulk of
 * global cobalt and a major share of copper, alongside coltan / tantalum / 3T metals; ZM is
 * a copper-cobalt heavyweight; ZW exports platinum, lithium (Bikita / Arcadia) and gold;
 * BW exports diamonds (Carbon as the elemental proxy) plus nickel-copper from Selebi-Phikwe
 * legacy; NA exports uranium (Rössing, Husab) and diamonds; MZ exports aluminum (Mozal),
 * titanium / zirconium sands (Moma) and tantalum; TZ exports gold and helium prospects;
 * AO exports crude-derived C / H; smaller economies (KM, LS, MW, MU, SC, SZ, MG) carry mixed
 * generic crustal / minor-metal profiles.
 */
export const SADC_MAIN_EXPORTED_ELEMENTS: Record<SadcMemberIsoCode, MainExportedElements> = {
  AO: e(
    'Carbon (C)',
    'Hydrogen (H)',
    'Iron (Fe)',
    'Manganese (Mn)',
    'Copper (Cu)',
    'Gold (Au)',
    'Calcium (Ca)',
  ),
  BW: e(
    'Carbon (C)',
    'Copper (Cu)',
    'Nickel (Ni)',
    'Sodium (Na)',
    'Calcium (Ca)',
    'Iron (Fe)',
    'Silver (Ag)',
  ),
  KM: e(
    'Calcium (Ca)',
    'Iron (Fe)',
    'Silicon (Si)',
    'Carbon (C)',
    'Aluminum (Al)',
    'Sodium (Na)',
    'Magnesium (Mg)',
  ),
  CD: e(
    'Cobalt (Co)',
    'Copper (Cu)',
    'Carbon (C)',
    'Tantalum (Ta)',
    'Tin (Sn)',
    'Tungsten (W)',
    'Gold (Au)',
  ),
  SZ: e(
    'Iron (Fe)',
    'Carbon (C)',
    'Calcium (Ca)',
    'Silicon (Si)',
    'Aluminum (Al)',
    'Sodium (Na)',
    'Magnesium (Mg)',
  ),
  LS: e(
    'Carbon (C)',
    'Calcium (Ca)',
    'Iron (Fe)',
    'Silicon (Si)',
    'Aluminum (Al)',
    'Sodium (Na)',
    'Magnesium (Mg)',
  ),
  MG: e(
    'Nickel (Ni)',
    'Cobalt (Co)',
    'Titanium (Ti)',
    'Chromium (Cr)',
    'Carbon (C)',
    'Iron (Fe)',
    'Aluminum (Al)',
  ),
  MW: e(
    'Carbon (C)',
    'Calcium (Ca)',
    'Iron (Fe)',
    'Silicon (Si)',
    'Aluminum (Al)',
    'Sulfur (S)',
    'Uranium (U)',
  ),
  MU: e(
    'Calcium (Ca)',
    'Carbon (C)',
    'Iron (Fe)',
    'Silicon (Si)',
    'Aluminum (Al)',
    'Sodium (Na)',
    'Magnesium (Mg)',
  ),
  MZ: e(
    'Aluminum (Al)',
    'Carbon (C)',
    'Hydrogen (H)',
    'Titanium (Ti)',
    'Zirconium (Zr)',
    'Tantalum (Ta)',
    'Iron (Fe)',
  ),
  NA: e(
    'Uranium (U)',
    'Carbon (C)',
    'Copper (Cu)',
    'Zinc (Zn)',
    'Lead (Pb)',
    'Gold (Au)',
    'Lithium (Li)',
  ),
  SC: e(
    'Calcium (Ca)',
    'Silicon (Si)',
    'Sodium (Na)',
    'Carbon (C)',
    'Iron (Fe)',
    'Aluminum (Al)',
    'Magnesium (Mg)',
  ),
  ZA: e(
    'Platinum (Pt)',
    'Palladium (Pd)',
    'Gold (Au)',
    'Iron (Fe)',
    'Chromium (Cr)',
    'Manganese (Mn)',
    'Carbon (C)',
  ),
  TZ: e(
    'Gold (Au)',
    'Carbon (C)',
    'Nickel (Ni)',
    'Copper (Cu)',
    'Iron (Fe)',
    'Tin (Sn)',
    'Helium (He)',
  ),
  ZM: e(
    'Copper (Cu)',
    'Cobalt (Co)',
    'Manganese (Mn)',
    'Gold (Au)',
    'Iron (Fe)',
    'Lead (Pb)',
    'Zinc (Zn)',
  ),
  ZW: e(
    'Platinum (Pt)',
    'Palladium (Pd)',
    'Gold (Au)',
    'Lithium (Li)',
    'Chromium (Cr)',
    'Nickel (Ni)',
    'Carbon (C)',
  ),
}
