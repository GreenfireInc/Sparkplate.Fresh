import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const guineaBissau: AfricanUnionCountry = {
  name: 'Guinea-Bissau',
  iso3166Alpha2: 'GW',
  africanUnionStatus: 'suspended',
  capital: 'Bissau',
  coordinates: { latitude: 11.8636, longitude: -15.5977 },
  independence: '1973-09-24',
  topMajorCities: ['Bissau', 'Bafatá', 'Gabú', 'Cacheu', 'Bolama'],
  population: 2100000,
  mainLanguages: ['Portuguese', 'Guinea-Bissau Creole', 'Fula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Bissau',
  foundingLeader: 'Luís Cabral',
  currentLeader: 'Umaro Sissoco Embaló (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional P2P'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['GW'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['GW'],
  stockExchange: 'No significant national exchange; BRVM regional access',
}
