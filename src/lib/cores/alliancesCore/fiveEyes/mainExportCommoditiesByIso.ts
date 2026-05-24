import type { FiveEyesMemberIsoCode } from './fiveEyesMemberIsoCodes'
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
export const FIVE_EYES_MAIN_EXPORT_COMMODITIES: Record<
  FiveEyesMemberIsoCode,
  MainExportCommodities
> = {
  AU: m(
    'Iron ore',
    'Coal',
    'Natural gas',
    'Gold',
    'Beef',
    'Wheat',
    'Aluminium',
  ),
  CA: m(
    'Crude petroleum',
    'Automobiles',
    'Gold',
    'Wheat',
    'Lumber',
    'Aluminium',
    'Natural gas',
  ),
  NZ: m(
    'Milk powder',
    'Meat',
    'Wood products',
    'Wine',
    'Honey',
    'Butter',
    'Fruit',
  ),
  GB: m(
    'Gold',
    'Cars',
    'Packaged medicaments',
    'Crude petroleum',
    'Gas turbines',
    'Scotch whisky',
    'Aircraft parts',
  ),
  US: m(
    'Refined petroleum',
    'Aircraft',
    'Natural gas',
    'Semiconductors',
    'Gold',
    'Soybeans',
    'Corn',
  ),
}
