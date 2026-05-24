import type { GccMemberIsoCode } from './gccMemberIsoCodes'
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
export const GCC_MAIN_EXPORT_COMMODITIES: Record<GccMemberIsoCode, MainExportCommodities> = {
  BH: m(
    'Refined petroleum',
    'Aluminium',
    'Petrochemicals',
    'Fertilizers',
    'Iron ore',
    'Plastics',
    'Financial services exports',
  ),
  KW: m(
    'Crude petroleum',
    'Refined petroleum',
    'Liquified natural gas',
    'Petrochemicals',
    'Fertilizers',
    'Aluminium',
    'Chemicals',
  ),
  OM: m(
    'Crude petroleum',
    'Refined petroleum',
    'Liquified natural gas',
    'Fertilizers',
    'Metals',
    'Fish',
    'Plastics',
  ),
  QA: m(
    'Liquified natural gas',
    'Crude petroleum',
    'Refined petroleum',
    'Aluminium',
    'Fertilizers',
    'Petrochemicals',
    'Steel',
  ),
  SA: m(
    'Crude petroleum',
    'Refined petroleum',
    'Petrochemicals',
    'Plastics',
    'Ammonia',
    'Aluminium',
    'Gold',
  ),
  AE: m(
    'Crude petroleum',
    'Refined petroleum',
    'Gold',
    'Diamonds',
    'Aluminium',
    'Telecommunications equipment',
    'Dates',
  ),
}
