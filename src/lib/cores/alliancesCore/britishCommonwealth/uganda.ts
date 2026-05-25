import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'

export const uganda: CommonwealthCountry = {
  name: 'Uganda',
  iso3166Alpha2: 'UG',
  commonwealthStatus: 'member',
  capital: 'Kampala',
  coordinates: { latitude: 0.3476, longitude: 32.5825 },
  independence: '1962-10-09',
  topMajorCities: ['Kampala', 'Nansana', 'Kira', 'Mbarara', 'Mukono'],
  population: 48000000,
  mainLanguages: ['English', 'Swahili', 'Luganda'],
  currency: 'Ugandan shilling (UGX)',
  timezone: 'Africa/Kampala',
  foundingLeader: 'Milton Obote (first Prime Minister)',
  currentLeader: 'Yoweri Museveni (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Binance'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['UG'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['UG'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['UG'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['UG'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['UG'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['UG'],
  stockExchange: 'Uganda Securities Exchange',
}
