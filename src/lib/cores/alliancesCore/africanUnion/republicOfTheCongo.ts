import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const republicOfTheCongo: AfricanUnionCountry = {
  name: 'Republic of the Congo',
  iso3166Alpha2: 'CG',
  africanUnionStatus: 'member',
  capital: 'Brazzaville',
  coordinates: { latitude: -4.2634, longitude: 15.2429 },
  independence: '1960-08-15',
  topMajorCities: ['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Nkayi', 'Owando'],
  population: 6100000,
  mainLanguages: ['French', 'Lingala', 'Kituba'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Brazzaville',
  foundingLeader: 'Fulbert Youlou',
  currentLeader: 'Denis Sassou Nguesso (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC'],
  stablecoin: 'USDT P2P; XAF peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['CG'],
  newsOutlets: AU_NEWS_OUTLETS['CG'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['CG'],
  stockExchange: 'Bourse des Valeurs du Congo (BVC)',
}
