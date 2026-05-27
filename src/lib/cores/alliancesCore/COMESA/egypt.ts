import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMESA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMESA_RARE_EARTHS } from './rareEarthsByIso'
import { COMESA_BOND_MARKETS } from './bondMarketsByIso'
import { COMESA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const egypt: ComesaCountry = {
  name: 'Egypt',
  iso3166Alpha2: 'EG',
  capital: 'Cairo',
  coordinates: { latitude: 30.0444, longitude: 31.2357 },
  independence: '1922-02-28 (sovereignty steps; republic evolution — informational)',
  topMajorCities: ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said'],
  population: 114000000,
  mainLanguages: ['Arabic (Egyptian)', 'English', 'French (tourism & business)'],
  currency: 'Egyptian pound (EGP)',
  timezone: 'Africa/Cairo',
  foundingLeader: 'King Fuad I (Sultanate/Kingdom era reference)',
  currentLeader: 'President Abdel Fattah el-Sisi — verify',
  cryptocurrencyExchanges: ['Rain (regional)', 'No official local spot exchange; P2P & OTC'],
  stablecoin: 'USDT / USDC P2P common; central bank exploring CBDC',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['EG'],
  newsOutlets: COMESA_NEWS_OUTLETS['EG'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['EG'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['EG'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['EG'],
  rareEarths: COMESA_RARE_EARTHS['EG'],
  stockExchange: 'Egyptian Exchange (EGX)',
  bondMarkets: COMESA_BOND_MARKETS['EG'],
  mainInternationalAirport: COMESA_MAIN_INTERNATIONAL_AIRPORTS['EG'],
}
