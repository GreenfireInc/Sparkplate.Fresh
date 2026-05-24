import type { EcowasMemberIsoCode } from './ecowasMemberIsoCodes'
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
export const ECOWAS_MAIN_EXPORT_COMMODITIES: Record<EcowasMemberIsoCode, MainExportCommodities> = {
  BJ: m(
    'Cotton',
    'Gold',
    'Cashew nuts',
    'Refined petroleum',
    'Palm oil',
    'Soybeans',
    'Maize',
  ),
  CV: m(
    'Fish',
    'Footwear',
    'Garments',
    'Petroleum products',
    'Electronics',
    'Plastic products',
    'Beverages',
  ),
  GM: m(
    'Groundnuts',
    'Fish',
    'Cotton',
    'Timber',
    'Palm kernels',
    'Petroleum products',
    'Re-exported goods',
  ),
  GH: m(
    'Gold',
    'Crude petroleum',
    'Cocoa',
    'Cashew nuts',
    'Manganese ore',
    'Oil seeds',
    'Refined petroleum',
  ),
  GN: m(
    'Gold',
    'Bauxite',
    'Aluminum',
    'Diamonds',
    'Palm oil',
    'Coffee',
    'Fruits',
  ),
  GW: m(
    'Cashew nuts',
    'Fish',
    'Gold',
    'Timber',
    'Palm oil',
    'Cotton',
    'Peanuts',
  ),
  CI: m(
    'Cocoa',
    'Gold',
    'Refined petroleum',
    'Rubber',
    'Cashew nuts',
    'Cotton',
    'Palm oil',
  ),
  LR: m(
    'Iron ore',
    'Gold',
    'Rubber',
    'Ships',
    'Diamonds',
    'Palm oil',
    'Timber',
  ),
  NG: m(
    'Crude petroleum',
    'Natural gas',
    'Refined petroleum',
    'Cocoa',
    'Fertilizers',
    'Sesame seeds',
    'Gold',
  ),
  SN: m(
    'Refined petroleum',
    'Gold',
    'Fish',
    'Phosphates',
    'Groundnuts',
    'Cement',
    'Titanium ore',
  ),
  SL: m(
    'Iron ore',
    'Diamonds',
    'Rutile',
    'Cocoa',
    'Coffee',
    'Fish',
    'Timber',
  ),
  TG: m(
    'Crude petroleum',
    'Re-exported goods',
    'Cocoa',
    'Phosphates',
    'Cotton',
    'Coffee',
    'Refined petroleum',
  ),
}
