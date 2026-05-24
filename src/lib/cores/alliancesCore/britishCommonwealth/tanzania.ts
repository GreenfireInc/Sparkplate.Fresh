import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const tanzania: CommonwealthCountry = {
  name: 'Tanzania',
  iso3166Alpha2: 'TZ',
  commonwealthStatus: 'member',
  capital: 'Dodoma (official); Dar es Salaam (largest)',
  coordinates: { latitude: -6.7924, longitude: 39.2083 },
  independence: '1961-12-09 (Tanganyika); 1964-04-26 (union)',
  topMajorCities: ['Dar es Salaam', 'Mwanza', 'Dodoma', 'Arusha', 'Mbeya'],
  population: 67000000,
  mainLanguages: ['Swahili', 'English', 'Arabic (coastal)'],
  currency: 'Tanzanian shilling (TZS)',
  timezone: 'Africa/Dar_es_Salaam',
  foundingLeader: 'Julius Nyerere (first President)',
  currentLeader: 'Samia Suluhu Hassan (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['TZ'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['TZ'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['TZ'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['TZ'],
  stockExchange: 'Dar es Salaam Stock Exchange',
}
