import type { AmuCountry } from './types'
import { AMU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AMU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AMU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AMU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const morocco: AmuCountry = {
  name: 'Morocco',
  iso3166Alpha2: 'MA',
  amuStatus: 'founding_member',
  capital: 'Rabat',
  coordinates: { latitude: 34.0209, longitude: -6.8416 },
  independence: '1956-03-02',
  topMajorCities: ['Casablanca', 'Rabat', 'Fes', 'Marrakesh', 'Tangier'],
  population: 38000000,
  mainLanguages: ['Arabic (Darija)', 'Tamazight', 'French'],
  currency: 'Moroccan dirham (MAD)',
  timezone: 'Africa/Casablanca',
  foundingLeader: 'Mohammed V (King)',
  currentLeader: 'Mohammed VI (King); Aziz Akhannouch (Prime Minister)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Rain (regional)', 'Peer OTC'],
  stablecoin: 'USDT informal; Bank Al-Maghrib exploring CBDC',
  domesticCourierServices: AMU_DOMESTIC_COURIERS['MA'],
  newsOutlets: AMU_NEWS_OUTLETS['MA'],
  notableUniversities: AMU_NOTABLE_UNIVERSITIES['MA'],
  mainExportCommodities: AMU_MAIN_EXPORT_COMMODITIES['MA'],
  stockExchange: 'Casablanca Stock Exchange',
}
