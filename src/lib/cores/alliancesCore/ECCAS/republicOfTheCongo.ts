import type { EccasCountry } from './types'
import { ECCAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECCAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECCAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const republicOfTheCongo: EccasCountry = {
  name: 'Republic of the Congo',
  iso3166Alpha2: 'CG',
  capital: 'Brazzaville',
  coordinates: { latitude: -4.2634, longitude: 15.2429 },
  independence: '1960-08-15',
  topMajorCities: ['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Nkayi', 'Owando'],
  population: 6100000,
  mainLanguages: ['French', 'Lingala', 'Kituba'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Brazzaville',
  foundingLeader: 'Fulbert Youlou (first President)',
  currentLeader: 'President Denis Sassou Nguesso — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC'],
  stablecoin: 'USDT P2P; XAF peg via BEAC',
  domesticCourierServices: ECCAS_DOMESTIC_COURIERS['CG'],
  newsOutlets: ECCAS_NEWS_OUTLETS['CG'],
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['CG'],
  stockExchange: 'Bourse des Valeurs du Congo (BVC)',
}
