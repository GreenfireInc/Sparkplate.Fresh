import type { EccasMemberIsoCode } from './eccasMemberIsoCodes'
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
export const ECCAS_MAIN_EXPORT_COMMODITIES: Record<EccasMemberIsoCode, MainExportCommodities> = {
  AO: m(
    'Crude petroleum',
    'Diamonds',
    'Refined petroleum',
    'Liquified natural gas',
    'Ships',
    'Iron ore',
    'Copper ore',
  ),
  BI: m(
    'Coffee',
    'Gold',
    'Tea',
    'Niobium and tantalum ore',
    'Cobalt',
    'Hides and skins',
    'Wheat flour',
  ),
  CM: m(
    'Crude petroleum',
    'Timber',
    'Cocoa',
    'Cotton',
    'Aluminum',
    'Coffee',
    'Bananas',
  ),
  CF: m(
    'Gold',
    'Diamonds',
    'Timber',
    'Cotton',
    'Hides and skins',
    'Sesame seeds',
    'Coffee',
  ),
  TD: m(
    'Crude petroleum',
    'Cotton',
    'Livestock',
    'Gum arabic',
    'Sesame seeds',
    'Gold',
    'Hides and skins',
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
  GQ: m(
    'Crude petroleum',
    'Liquified natural gas',
    'Timber',
    'Cocoa',
    'Fish',
    'Methanol',
    'Timber products',
  ),
  GA: m(
    'Crude petroleum',
    'Manganese ore',
    'Timber',
    'Refined petroleum',
    'Uranium',
    'Gold',
    'Palm oil',
  ),
  CG: m(
    'Crude petroleum',
    'Timber',
    'Diamonds',
    'Refined petroleum',
    'Copper',
    'Gold',
    'Plywood',
  ),
  ST: m(
    'Cocoa',
    'Coffee',
    'Palm oil',
    'Copra',
    'Fish',
    'Pepper',
    'Cinnamon',
  ),
}
