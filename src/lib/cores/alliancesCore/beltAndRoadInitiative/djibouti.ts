import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const djibouti: BeltAndRoadInitiativeCountry = {
  name: 'Djibouti',
  iso3166Alpha2: 'DJ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Djibouti',
  coordinates: { latitude: 11.5886, longitude: 43.1456 },
  independence: '1977-06-27',
  topMajorCities: ['Djibouti City', 'Ali Sabieh', 'Tadjoura', 'Obock', 'Dikhil'] as [string, string, string, string, string],
  population: 1066809,
  mainLanguages: [ 'Arabic', 'French', 'Regional languages' ],
  currency: 'Djiboutian franc (DJF)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Hassan Gouled Aptidon',
  currentLeader: 'Ismail Omar Guelleh (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'International OTC', 'Regional remittance apps'],
  stablecoin: 'USDT / USDC; DJF pegged to USD (currency board)',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['DJ'],
  newsOutlets: BRI_NEWS_OUTLETS['DJ'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['DJ'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['DJ'],
  stockExchange: 'Djibouti Stock Exchange (thin activity)',
}
