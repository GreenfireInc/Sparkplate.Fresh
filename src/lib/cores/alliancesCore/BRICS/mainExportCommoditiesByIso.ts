import type { BricsMemberIsoCode } from './bricsMemberIsoCodes'
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
export const BRICS_MAIN_EXPORT_COMMODITIES: Record<BricsMemberIsoCode, MainExportCommodities> = {
  BR: m(
    'Soybeans',
    'Crude petroleum',
    'Iron ore',
    'Sugar',
    'Poultry meat',
    'Corn',
    'Coffee',
  ),
  RU: m(
    'Crude petroleum',
    'Natural gas',
    'Refined petroleum',
    'Wheat',
    'Coal',
    'Gold',
    'Iron and steel',
  ),
  IN: m(
    'Refined petroleum',
    'Diamonds',
    'Pharmaceuticals',
    'Rice',
    'Machinery',
    'Iron and steel',
    'Cotton yarn',
  ),
  CN: m(
    'Electrical machinery',
    'Computers',
    'Telecommunications equipment',
    'Furniture',
    'Plastics',
    'Apparel',
    'Steel',
  ),
  ZA: m(
    'Platinum',
    'Gold',
    'Coal',
    'Iron ore',
    'Manganese ore',
    'Automobiles',
    'Citrus fruit',
  ),
}
