import type { MiktaMemberIsoCode } from './miktaMemberIsoCodes'
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
export const MIKTA_MAIN_EXPORT_COMMODITIES: Record<MiktaMemberIsoCode, MainExportCommodities> = {
  MX: m(
    'Automobiles',
    'Computers',
    'Crude petroleum',
    'Telecommunications equipment',
    'Trucks',
    'Auto parts',
    'Gold',
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
  KR: m(
    'Semiconductors',
    'Automobiles',
    'Petroleum products',
    'Ships',
    'Petroleum',
    'Iron and steel',
    'Plastics',
  ),
  TR: m(
    'Automobiles',
    'Refined petroleum',
    'Iron and steel',
    'Textiles',
    'Machinery',
    'Gold',
    'Jewellery',
  ),
  AU: m(
    'Iron ore',
    'Coal',
    'Natural gas',
    'Gold',
    'Beef',
    'Wheat',
    'Aluminium',
  ),
}
