import type { AseanMemberIsoCode } from './aseanMemberIsoCodes'
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
export const ASEAN_MAIN_EXPORT_COMMODITIES: Record<AseanMemberIsoCode, MainExportCommodities> = {
  BN: m(
    'Crude petroleum',
    'Liquified natural gas',
    'Refined petroleum',
    'Chemicals',
    'Fish',
    'Garments',
    'Plastics',
  ),
  KH: m(
    'Garments',
    'Footwear',
    'Rice',
    'Rubber',
    'Timber',
    'Fish',
    'Cassava',
  ),
  ID: m(
    'Coal',
    'Palm oil',
    'Nickel',
    'Refined petroleum',
    'Rubber',
    'Copper',
    'Gold',
  ),
  LA: m(
    'Electricity (hydro)',
    'Copper ore',
    'Coffee',
    'Rubber',
    'Timber',
    'Maize',
    'Gold',
  ),
  MY: m(
    'Integrated circuits',
    'Palm oil',
    'Refined petroleum',
    'Liquified natural gas',
    'Rubber',
    'Natural gas',
    'Electrical machinery',
  ),
  MM: m(
    'Natural gas',
    'Garments',
    'Rice',
    'Copper',
    'Dried peas',
    'Fish',
    'Jade',
  ),
  PH: m(
    'Integrated circuits',
    'Semiconductors',
    'Refined copper',
    'Bananas',
    'Coconut oil',
    'Gold',
    'Electronics',
  ),
  SG: m(
    'Integrated circuits',
    'Refined petroleum',
    'Machinery',
    'Pharmaceuticals',
    'Optical media',
    'Gold',
    'Gas turbines',
  ),
  TH: m(
    'Computers',
    'Automobiles',
    'Rubber',
    'Rice',
    'Jewellery',
    'Sugar',
    'Chicken',
  ),
  TL: m(
    'Coffee',
    'Crude petroleum',
    'Natural gas',
    'Sandalwood',
    'Tuna',
    'Marble',
    'Cinnamon',
  ),
  VN: m(
    'Integrated circuits',
    'Footwear',
    'Electronics',
    'Textiles',
    'Coffee',
    'Rice',
    'Seafood',
  ),
}
