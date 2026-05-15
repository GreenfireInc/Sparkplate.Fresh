import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const burkinaFaso: AfricanUnionCountry = {
  name: 'Burkina Faso',
  iso3166Alpha2: 'BF',
  africanUnionStatus: 'suspended',
  capital: 'Ouagadougou',
  coordinates: { latitude: 12.3714, longitude: -1.5197 },
  independence: '1960-08-05',
  topMajorCities: ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Ouahigouya', 'Banfora'],
  population: 23000000,
  mainLanguages: ['French', 'Mooré', 'Dioula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Ouagadougou',
  foundingLeader: 'Maurice Yaméogo',
  currentLeader: 'Ibrahim Traoré (Transitional President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Informal P2P'],
  stablecoin: 'USDT via P2P; XOF CFA peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['BF'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['BF'],
  stockExchange: 'Burkina Faso — BRVM listings (limited local activity)',
}
