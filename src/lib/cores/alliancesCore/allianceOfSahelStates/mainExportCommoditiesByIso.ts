import type { AesMemberIsoCode } from './aesMemberIsoCodes'
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
export const AES_MAIN_EXPORT_COMMODITIES: Record<AesMemberIsoCode, MainExportCommodities> = {
  BF: m(
    'Gold',
    'Cotton',
    'Oil seeds',
    'Zinc ore',
    'Sesame seeds',
    'Fruits and nuts',
    'Livestock',
  ),
  ML: m(
    'Gold',
    'Cotton',
    'Livestock',
    'Salt',
    'Sesame seeds',
    'Fruits',
    'Shea nuts',
  ),
  NE: m(
    'Uranium',
    'Gold',
    'Livestock',
    'Onions',
    'Cowpeas',
    'Sesame seeds',
    'Crude petroleum',
  ),
}
