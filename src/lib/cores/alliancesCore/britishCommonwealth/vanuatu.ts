import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'

export const vanuatu: CommonwealthCountry = {
  name: 'Vanuatu',
  iso3166Alpha2: 'VU',
  commonwealthStatus: 'member',
  capital: 'Port Vila',
  coordinates: { latitude: -17.7333, longitude: 168.3273 },
  independence: '1980-07-30',
  topMajorCities: ['Port Vila', 'Luganville', 'Norsup', 'Isangel', 'Sola'],
  population: 320000,
  mainLanguages: ['Bislama', 'English', 'French'],
  currency: 'Vanuatu vatu (VUV)',
  timezone: 'Pacific/Efate',
  foundingLeader: 'Walter Lini (first Prime Minister)',
  currentLeader: 'Charlot Salwai (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['VU'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['VU'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['VU'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['VU'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['VU'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['VU'],
  stockExchange: 'Vanuatu Securities Exchange',
}
