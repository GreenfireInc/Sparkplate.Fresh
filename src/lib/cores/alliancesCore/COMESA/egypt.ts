import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

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
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['EG'],
  stockExchange: 'Egyptian Exchange (EGX)',
}
