import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECOWAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const guineaBissau: EcowasCountry = {
  name: 'Guinea-Bissau',
  iso3166Alpha2: 'GW',
  capital: 'Bissau',
  coordinates: { latitude: 11.8636, longitude: -15.5977 },
  independence: '1973-09-24 (Portuguese recognition 1974)',
  topMajorCities: ['Bissau', 'Bafatá', 'Gabú', 'Cacheu', 'Bolama'],
  population: 2100000,
  mainLanguages: ['Portuguese', 'Guinea-Bissau Creole', 'Fula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Bissau',
  foundingLeader: 'Luís Cabral (post-recognition presidency)',
  currentLeader: 'President Umaro Sissoco Embaló — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional P2P'],
  stablecoin: 'USDT P2P; XOF CFA peg',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['GW'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['GW'],
  stockExchange: 'BRVM regional access; no deep domestic bourse',
}
