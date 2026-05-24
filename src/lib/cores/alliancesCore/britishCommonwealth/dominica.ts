import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const dominica: CommonwealthCountry = {
  name: 'Dominica',
  iso3166Alpha2: 'DM',
  commonwealthStatus: 'member',
  capital: 'Roseau',
  coordinates: { latitude: 15.3092, longitude: -61.3794 },
  independence: '1978-11-03',
  topMajorCities: ['Roseau', 'Portsmouth', 'Marigot', 'Mahaut', 'Saint Joseph'],
  population: 72000,
  mainLanguages: ['English', 'Dominican French Creole', 'Kokoy'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/Dominica',
  foundingLeader: 'Patrick John (first Prime Minister)',
  currentLeader: 'Roosevelt Skerrit (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD regional peg; USDT/USDC',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['DM'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['DM'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['DM'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['DM'],
  stockExchange: 'Eastern Caribbean Securities Exchange (regional)',
}
