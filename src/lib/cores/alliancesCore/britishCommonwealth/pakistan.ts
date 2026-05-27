import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const pakistan: CommonwealthCountry = {
  name: 'Pakistan',
  iso3166Alpha2: 'PK',
  commonwealthStatus: 'member',
  capital: 'Islamabad',
  coordinates: { latitude: 33.6844, longitude: 73.0479 },
  independence: '1947-08-14',
  topMajorCities: ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi'],
  population: 240000000,
  mainLanguages: ['Urdu', 'English', 'Punjabi'],
  currency: 'Pakistani rupee (PKR)',
  timezone: 'Asia/Karachi',
  foundingLeader: 'Muhammad Ali Jinnah (Governor-General)',
  currentLeader: 'Shehbaz Sharif (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC'],
  stablecoin: 'USDT informal; no major PKR stablecoin',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['PK'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['PK'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['PK'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['PK'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['PK'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['PK'],
  stockExchange: 'Pakistan Stock Exchange',
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['PK'],
}
