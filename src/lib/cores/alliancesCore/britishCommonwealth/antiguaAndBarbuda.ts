import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const antiguaAndBarbuda: CommonwealthCountry = {
  name: 'Antigua and Barbuda',
  iso3166Alpha2: 'AG',
  commonwealthStatus: 'member',
  capital: 'St. John\'s',
  coordinates: { latitude: 17.1274, longitude: -61.8468 },
  independence: '1981-11-01',
  topMajorCities: ['St. John\'s', 'All Saints', 'Liberta', 'Potters Village', 'Bolands'],
  population: 100000,
  mainLanguages: ['English', 'Antiguan and Barbudan Creole', 'Spanish (minor)'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/Antigua',
  foundingLeader: 'Vere Bird (first Prime Minister)',
  currentLeader: 'Gaston Browne (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT/USDC via offshore; XCD pegged to USD regionally',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['AG'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['AG'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['AG'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['AG'],
  stockExchange: 'Eastern Caribbean Securities Exchange (regional)',
}
