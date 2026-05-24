import type { IgadMemberIsoCode } from './igadMemberIsoCodes'
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
export const IGAD_MAIN_EXPORT_COMMODITIES: Record<IgadMemberIsoCode, MainExportCommodities> = {
  DJ: m(
    'Live animals',
    'Coffee',
    'Hides and skins',
    'Salt',
    'Scrap metal',
    'Re-exported goods',
    'Petroleum re-exports',
  ),
  ET: m(
    'Coffee',
    'Gold',
    'Oil seeds',
    'Cut flowers',
    'Livestock',
    'Garments',
    'Pulses',
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
  SD: m(
    'Gold',
    'Crude petroleum',
    'Livestock',
    'Sesame seeds',
    'Cotton',
    'Gum arabic',
    'Sheep',
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
