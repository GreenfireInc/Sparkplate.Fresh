import type { CptppMemberIsoCode } from './cptppMemberIsoCodes'
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
export const CPTPP_MAIN_EXPORT_COMMODITIES: Record<CptppMemberIsoCode, MainExportCommodities> = {
  AU: m(
    'Iron ore',
    'Coal',
    'Natural gas',
    'Gold',
    'Beef',
    'Wheat',
    'Aluminium',
  ),
  BN: m(
    'Crude petroleum',
    'Liquified natural gas',
    'Refined petroleum',
    'Chemicals',
    'Fish',
    'Garments',
    'Plastics',
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
  CL: m(
    'Copper',
    'Refined copper',
    'Fruits (cherries)',
    'Salmon',
    'Wine',
    'Wood pulp',
    'Lithium',
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
  MY: m(
    'Integrated circuits',
    'Palm oil',
    'Refined petroleum',
    'Liquified natural gas',
    'Rubber',
    'Natural gas',
    'Electrical machinery',
  ),
  MX: m(
    'Automobiles',
    'Computers',
    'Crude petroleum',
    'Telecommunications equipment',
    'Trucks',
    'Auto parts',
    'Gold',
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
  PE: m(
    'Copper',
    'Gold',
    'Zinc',
    'Fishmeal',
    'Grapes',
    'Asparagus',
    'Blueberries',
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
  GB: m(
    'Gold',
    'Cars',
    'Packaged medicaments',
    'Crude petroleum',
    'Gas turbines',
    'Scotch whisky',
    'Aircraft parts',
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
