import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const cameroon: CommonwealthCountry = {
  name: 'Cameroon',
  iso3166Alpha2: 'CM',
  commonwealthStatus: 'member',
  capital: 'Yaoundé',
  coordinates: { latitude: 3.848, longitude: 11.5021 },
  independence: '1960-01-01 (French); 1961-10-01 (union)',
  topMajorCities: ['Douala', 'Yaoundé', 'Garoua', 'Bafoussam', 'Bamenda'],
  population: 28500000,
  mainLanguages: ['French', 'English', 'Fulfulde'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Douala',
  foundingLeader: 'Ahmadou Ahidjo (first President)',
  currentLeader: 'Paul Biya (President) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XAF peg to EUR; USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['CM'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['CM'],
  stockExchange: 'Douala Stock Exchange',
}
