import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const djibouti: AfricanUnionCountry = {
  name: 'Djibouti',
  iso3166Alpha2: 'DJ',
  africanUnionStatus: 'member',
  capital: 'Djibouti City',
  coordinates: { latitude: 11.5886, longitude: 43.1456 },
  independence: '1977-06-27',
  topMajorCities: ['Djibouti City', 'Ali Sabieh', 'Tadjoura', 'Obock', 'Dikhil'],
  population: 1100000,
  mainLanguages: ['French', 'Arabic', 'Somali'],
  currency: 'Djiboutian franc (DJF)',
  timezone: 'Africa/Djibouti',
  foundingLeader: 'Hassan Gouled Aptidon',
  currentLeader: 'Ismail Omar Guelleh (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'International OTC', 'Regional remittance apps'],
  stablecoin: 'USDT / USDC; DJF pegged to USD (currency board)',
  domesticCourierServices: AU_DOMESTIC_COURIERS['DJ'],
  newsOutlets: AU_NEWS_OUTLETS['DJ'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['DJ'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['DJ'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['DJ'],
  rareEarths: AU_RARE_EARTHS['DJ'],
  stockExchange: 'Djibouti Stock Exchange (thin activity)',
  bondMarkets: AU_BOND_MARKETS['DJ'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['DJ'],
}
