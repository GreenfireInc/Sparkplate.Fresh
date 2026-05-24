import type { AmuMemberIsoCode } from './amuMemberIsoCodes'
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
export const AMU_MAIN_EXPORT_COMMODITIES: Record<AmuMemberIsoCode, MainExportCommodities> = {
  DZ: m(
    'Crude petroleum',
    'Natural gas',
    'Refined petroleum',
    'Fertilizers',
    'Hydrocarbon derivatives',
    'Dates',
    'Wheat',
  ),
  LY: m(
    'Crude petroleum',
    'Natural gas',
    'Refined petroleum',
    'Fertilizers',
    'Hydrocarbon derivatives',
    'Dates',
    'Wheat',
  ),
  MR: m(
    'Iron ore',
    'Gold',
    'Fish',
    'Copper',
    'Gypsum',
    'Crude petroleum',
    'Livestock',
  ),
  MA: m(
    'Automobiles',
    'Fertilizers',
    'Phosphates',
    'Electrical components',
    'Textiles',
    'Citrus fruit',
    'Fish',
  ),
  TN: m(
    'Electrical components',
    'Olive oil',
    'Textiles',
    'Phosphates',
    'Dates',
    'Fish',
    'Hydrocarbons',
  ),
}
