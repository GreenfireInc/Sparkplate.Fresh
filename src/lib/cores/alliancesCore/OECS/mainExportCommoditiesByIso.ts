import type { OecsMemberIsoCode } from './oecsMemberIsoCodes'
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
export const OECS_MAIN_EXPORT_COMMODITIES: Record<OecsMemberIsoCode, MainExportCommodities> = {
  AG: m(
    'Refined petroleum',
    'Ships',
    'Iron and steel',
    'Telecommunications equipment',
    'Pearls',
    'Aircraft parts',
    'Tourism services',
  ),
  DM: m(
    'Bananas',
    'Soaps',
    'Vegetables',
    'Coconuts',
    'Citrus',
    'Tropical fruit',
    'Tourism services',
  ),
  GD: m(
    'Nutmeg',
    'Cocoa',
    'Fish',
    'Mace',
    'Bananas',
    'Wheat flour',
    'Tourism services',
  ),
  MS: m(
    'Sand and gravel',
    'Electronics',
    'Plants',
    'Live animals',
    'Apparel',
    'Cattle',
    'Tourism services',
  ),
  KN: m(
    'Electronics',
    'Machinery',
    'Beverages',
    'Food',
    'Robotic equipment',
    'Tobacco',
    'Tourism services',
  ),
  LC: m(
    'Refined petroleum',
    'Bananas',
    'Beer',
    'Coconut oil',
    'Beverages',
    'Bakery products',
    'Tourism services',
  ),
  VC: m(
    'Eddoes and dasheen',
    'Arrowroot starch',
    'Tennis racquets',
    'Bananas',
    'Boats',
    'Flour',
    'Tourism services',
  ),
  AI: m(
    'Lobster',
    'Fish',
    'Salt',
    'Concrete',
    'Livestock',
    'Tobacco',
    'Tourism services',
  ),
}
