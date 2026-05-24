import type { MainExportCommodities } from '../africanUnion/types'
import { getMainExportCommodities } from './globalMainExportCommodities'

/** Build a typed commodities record; local entries override the global lookup. */
export function buildAllianceMainExportCommodities<T extends string>(
  codes: readonly T[],
  local: Partial<Record<T, MainExportCommodities>> = {},
): Record<T, MainExportCommodities> {
  return Object.fromEntries(
    codes.map((code) => [code, local[code] ?? getMainExportCommodities(code)]),
  ) as Record<T, MainExportCommodities>
}

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

export { m as commodityTuple }
