import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OPEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { OPEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OPEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const algeria: OpecCountry = {
  name: 'Algeria',
  iso3166Alpha2: 'DZ',
  capital: 'Algiers',
  coordinates: { latitude: 36.7538, longitude: 3.0588 },
  independence:
    '1962 independence from France; SONATRACH-era hydrocarbon sovereignty; OPEC member since 1969 — informational',
  topMajorCities: ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida'],
  population: 45800000,
  mainLanguages: ['Arabic', 'Tamazight / Berber co-official varieties', 'French'],
  currency: 'Algerian dinar (DZD)',
  timezone: 'Africa/Algiers',
  foundingLeader: 'Ahmed Ben Bella / Houari Boumédiène reference (state-building hydrocarbon era — informational)',
  currentLeader: 'President Abdelmadjid Tebboune — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['Official stance historically restrictive; regional OTC narratives — informational'],
  stablecoin: 'DZD informal USD pricing; sanctioned-screening overlays — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['DZ'],
  newsOutlets: OPEC_NEWS_OUTLETS['DZ'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['DZ'],
  mainExportCommodities: OPEC_MAIN_EXPORT_COMMODITIES['DZ'],
  stockExchange: 'Algerian equities segment (regulated bourse liquidity limited — informational)',
}
