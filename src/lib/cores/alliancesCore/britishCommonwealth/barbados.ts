import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'

export const barbados: CommonwealthCountry = {
  name: 'Barbados',
  iso3166Alpha2: 'BB',
  commonwealthStatus: 'member',
  capital: 'Bridgetown',
  coordinates: { latitude: 13.1, longitude: -59.6167 },
  independence: '1966-11-30',
  topMajorCities: ['Bridgetown', 'Speightstown', 'Oistins', 'Bathsheba', 'Holetown'],
  population: 282000,
  mainLanguages: ['English', 'Bajan Creole', 'Portuguese (small community)'],
  currency: 'Barbadian dollar (BBD)',
  timezone: 'America/Barbados',
  foundingLeader: 'Errol Barrow (first Prime Minister)',
  currentLeader: 'Mia Mottley (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'BBD pegged to USD; USDT/USDC',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['BB'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['BB'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['BB'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['BB'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['BB'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['BB'],
  stockExchange: 'Barbados Stock Exchange',
}
