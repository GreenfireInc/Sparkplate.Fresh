import type { EacMemberIsoCode } from './eacMemberIsoCodes'
import type { MainExportCommodities } from './types'

function m(
  a: string,
  b: string,
  c: string,
  d: string,
  e: string,
  f: string,
  g: string,
): MainExportCommodities {
  return [a, b, c, d, e, f, g]
}

/**
 * Principal export commodities by ISO 3166-1 alpha-2 (informational; verify against
 * UN Comtrade / national statistics periodically).
 */
export const EAC_MAIN_EXPORT_COMMODITIES: Record<EacMemberIsoCode, MainExportCommodities> = {
  BI: m(
    'Coffee',
    'Gold',
    'Tea',
    'Niobium and tantalum ore',
    'Cobalt',
    'Hides and skins',
    'Wheat flour',
  ),
  CD: m(
    'Copper',
    'Cobalt',
    'Gold',
    'Crude petroleum',
    'Diamonds',
    'Copper ore',
    'Refined copper',
  ),
  KE: m(
    'Tea',
    'Cut flowers',
    'Coffee',
    'Refined petroleum',
    'Titanium ore',
    'Avocados',
    'Vegetables',
  ),
  RW: m(
    'Gold',
    'Coffee',
    'Tea',
    'Tin',
    'Tantalum',
    'Tungsten',
    'Niobium',
  ),
  SO: m(
    'Livestock',
    'Charcoal',
    'Fish',
    'Gold',
    'Sesame seeds',
    'Bananas',
    'Hides and skins',
  ),
  SS: m(
    'Crude petroleum',
    'Gold',
    'Timber',
    'Gum arabic',
    'Sesame seeds',
    'Hides and skins',
    'Honey',
  ),
  TZ: m(
    'Gold',
    'Cashew nuts',
    'Coffee',
    'Refined petroleum',
    'Cotton',
    'Tobacco',
    'Tea',
  ),
  UG: m(
    'Coffee',
    'Gold',
    'Fish',
    'Tea',
    'Cotton',
    'Maize',
    'Cut flowers',
  ),
}
