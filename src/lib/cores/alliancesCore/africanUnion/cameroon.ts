import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const cameroon: AfricanUnionCountry = {
  name: 'Cameroon',
  iso3166Alpha2: 'CM',
  africanUnionStatus: 'member',
  capital: 'Yaoundé',
  coordinates: { latitude: 3.848, longitude: 11.5021 },
  independence: '1960-01-01',
  topMajorCities: ['Douala', 'Yaoundé', 'Garoua', 'Bamenda', 'Bafoussam'],
  population: 28500000,
  mainLanguages: ['French', 'English', 'Fulfulde'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Douala',
  foundingLeader: 'Ahmadou Ahidjo',
  currentLeader: 'Paul Biya (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC P2P; XAF CFA peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['CM'],
  newsOutlets: AU_NEWS_OUTLETS['CM'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['CM'],
  stockExchange: 'Douala Stock Exchange (DSX)',
}
