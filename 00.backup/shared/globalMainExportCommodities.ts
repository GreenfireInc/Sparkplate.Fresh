import type { MainExportCommodities } from '../africanUnion/types'
import { AU_MAIN_EXPORT_COMMODITIES } from '../africanUnion/mainExportCommoditiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from '../APEC/mainExportCommoditiesByIso'
import { ASEAN_MAIN_EXPORT_COMMODITIES } from '../ASEAN/mainExportCommoditiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from '../arabLeague/mainExportCommoditiesByIso'
import { MAIN_EXPORT_COMMODITIES_EXTRAS } from './mainExportCommoditiesExtras'

const GLOBAL_MAIN_EXPORT_COMMODITIES: Record<string, MainExportCommodities> = {
  ...AU_MAIN_EXPORT_COMMODITIES,
  ...APEC_MAIN_EXPORT_COMMODITIES,
  ...ASEAN_MAIN_EXPORT_COMMODITIES,
  ...ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES,
  ...MAIN_EXPORT_COMMODITIES_EXTRAS,
}

function fallbackCommodities(iso: string): MainExportCommodities {
  return [
    'Manufactured goods',
    'Agricultural products',
    'Minerals and metals',
    'Petroleum products',
    'Textiles',
    'Food products',
    'Services-linked exports (verify)',
  ]
}

/** Resolve seven principal export commodities for an ISO 3166-1 alpha-2 code. */
export function getMainExportCommodities(iso: string): MainExportCommodities {
  return GLOBAL_MAIN_EXPORT_COMMODITIES[iso] ?? fallbackCommodities(iso)
}

/** Build a typed ISO-keyed record for an alliance member code list. */
export function pickMainExportCommodities<T extends string>(
  codes: readonly T[],
): Record<T, MainExportCommodities> {
  return Object.fromEntries(
    codes.map((code) => [code, getMainExportCommodities(code)]),
  ) as Record<T, MainExportCommodities>
}
