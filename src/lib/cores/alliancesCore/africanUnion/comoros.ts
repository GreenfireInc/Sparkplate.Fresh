import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const comoros: AfricanUnionCountry = {
  name: 'Comoros',
  iso3166Alpha2: 'KM',
  africanUnionStatus: 'member',
  capital: 'Moroni',
  coordinates: { latitude: -11.7172, longitude: 43.2473 },
  independence: '1975-07-06',
  topMajorCities: ['Moroni', 'Mutsamudu', 'Fomboni', 'Domoni', 'Tsimbeo'],
  population: 900000,
  mainLanguages: ['Comorian (Shikomor)', 'Arabic', 'French'],
  currency: 'Comorian franc (KMF)',
  timezone: 'Indian/Comoro',
  foundingLeader: 'Ahmed Abdallah',
  currentLeader: 'Azali Assoumani (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional mobile money bridges'],
  stablecoin: 'USDT / USDC limited; KMF',
  domesticCourierServices: AU_DOMESTIC_COURIERS['KM'],
  newsOutlets: AU_NEWS_OUTLETS['KM'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['KM'],
  stockExchange: 'No major national stock exchange',
}
