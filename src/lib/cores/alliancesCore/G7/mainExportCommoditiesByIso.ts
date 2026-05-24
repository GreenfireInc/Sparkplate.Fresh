import type { G7MemberIsoCode } from './g7MemberIsoCodes'
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
export const G7_MAIN_EXPORT_COMMODITIES: Record<G7MemberIsoCode, MainExportCommodities> = {
  CA: m(
    'Crude petroleum',
    'Automobiles',
    'Gold',
    'Wheat',
    'Lumber',
    'Aluminium',
    'Natural gas',
  ),
  FR: m(
    'Aircraft',
    'Packaged medicaments',
    'Wine',
    'Refined petroleum',
    'Automobiles',
    'Wheat',
    'Pharmaceuticals',
  ),
  DE: m(
    'Automobiles',
    'Packaged medicaments',
    'Machinery',
    'Refined petroleum',
    'Electrical machinery',
    'Plastics',
    'Iron and steel',
  ),
  IT: m(
    'Machinery',
    'Packaged medicaments',
    'Automobiles',
    'Refined petroleum',
    'Wine',
    'Clothing',
    'Furniture',
  ),
  JP: m(
    'Automobiles',
    'Semiconductor machinery',
    'Integrated circuits',
    'Iron and steel products',
    'Ships',
    'Pharmaceuticals',
    'Optical instruments',
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
