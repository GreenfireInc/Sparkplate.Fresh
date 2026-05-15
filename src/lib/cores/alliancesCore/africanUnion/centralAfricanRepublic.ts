import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const centralAfricanRepublic: AfricanUnionCountry = {
  name: 'Central African Republic',
  iso3166Alpha2: 'CF',
  africanUnionStatus: 'member',
  capital: 'Bangui',
  coordinates: { latitude: 4.3947, longitude: 18.5582 },
  independence: '1960-08-13',
  topMajorCities: ['Bangui', 'Bimbo', 'Berbérati', 'Carnot', 'Bambari'],
  population: 5800000,
  mainLanguages: ['Sango', 'French', 'Arabic (regional)'],
  currency: 'Central African CFA franc (XAF); Bitcoin legal tender experiment (contextual)',
  timezone: 'Africa/Bangui',
  foundingLeader: 'David Dacko',
  currentLeader: 'Faustin-Archange Touadéra (President)',
  cryptocurrencyExchanges: ['Sango Coin ecosystem (national project)', 'Binance (P2P)', 'OTC'],
  stablecoin: 'USDT / USDC P2P; experimental sovereign crypto references',
  domesticCourierServices: AU_DOMESTIC_COURIERS['CF'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['CF'],
  stockExchange: 'Bangui Stock Exchange (very limited)',
}
