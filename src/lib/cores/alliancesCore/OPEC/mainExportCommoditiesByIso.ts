import type { OpecMemberIsoCode } from './opecMemberIsoCodes'
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
export const OPEC_MAIN_EXPORT_COMMODITIES: Record<OpecMemberIsoCode, MainExportCommodities> = {
  DZ: m(
    'Crude petroleum',
    'Natural gas',
    'Refined petroleum',
    'Ammonia',
    'Phosphates',
    'Petroleum gas',
    'Fertilizers',
  ),
  CG: m(
    'Crude petroleum',
    'Refined petroleum',
    'Lumber',
    'Diamonds',
    'Copper',
    'Wood products',
    'Cocoa',
  ),
  GQ: m(
    'Crude petroleum',
    'Petroleum gas',
    'Methanol',
    'Refined petroleum',
    'Wood',
    'Iron ore',
    'Cocoa',
  ),
  GA: m(
    'Crude petroleum',
    'Manganese ore',
    'Lumber',
    'Refined petroleum',
    'Veneer sheets',
    'Plywood',
    'Wood',
  ),
  IR: m(
    'Crude petroleum',
    'Refined petroleum',
    'Petroleum gas',
    'Iron and steel',
    'Petrochemicals',
    'Pistachios',
    'Carpets',
  ),
  IQ: m(
    'Crude petroleum',
    'Refined petroleum',
    'Gold',
    'Dates',
    'Petrochemicals',
    'Cement',
    'Petroleum gas',
  ),
  KW: m(
    'Crude petroleum',
    'Refined petroleum',
    'Petroleum gas',
    'Petrochemicals',
    'Fertilizers',
    'Aluminium',
    'Ethylene',
  ),
  LY: m(
    'Crude petroleum',
    'Petroleum gas',
    'Refined petroleum',
    'Gold',
    'Petrochemicals',
    'Steel',
    'Iron ore',
  ),
  NG: m(
    'Crude petroleum',
    'Petroleum gas',
    'Refined petroleum',
    'Cocoa beans',
    'Sesame seeds',
    'Urea',
    'Fertilizers',
  ),
  SA: m(
    'Crude petroleum',
    'Refined petroleum',
    'Petrochemicals',
    'Petroleum gas',
    'Plastics',
    'Polyethylene',
    'Ammonia',
  ),
  AE: m(
    'Crude petroleum',
    'Refined petroleum',
    'Gold',
    'Diamonds',
    'Jewellery',
    'Aluminium',
    'Telephones',
  ),
  VE: m(
    'Crude petroleum',
    'Refined petroleum',
    'Gold',
    'Iron ore',
    'Aluminium',
    'Petrochemicals',
    'Coffee',
  ),
}
