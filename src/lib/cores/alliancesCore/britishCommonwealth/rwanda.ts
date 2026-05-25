import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'

export const rwanda: CommonwealthCountry = {
  name: 'Rwanda',
  iso3166Alpha2: 'RW',
  commonwealthStatus: 'member',
  capital: 'Kigali',
  coordinates: { latitude: -1.9441, longitude: 29.8739 },
  independence: '1962-07-01',
  topMajorCities: ['Kigali', 'Butare', 'Gitarama', 'Musanze', 'Gisenyi'],
  population: 14000000,
  mainLanguages: ['Kinyarwanda', 'English', 'French'],
  currency: 'Rwandan franc (RWF)',
  timezone: 'Africa/Kigali',
  foundingLeader: 'Grégoire Kayibanda (first President)',
  currentLeader: 'Paul Kagame (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['RW'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['RW'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['RW'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['RW'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['RW'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['RW'],
  stockExchange: 'Rwanda Stock Exchange',
}
