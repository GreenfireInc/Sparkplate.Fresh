import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const mozambique: CommonwealthCountry = {
  name: 'Mozambique',
  iso3166Alpha2: 'MZ',
  commonwealthStatus: 'member',
  capital: 'Maputo',
  coordinates: { latitude: -25.9692, longitude: 32.5732 },
  independence: '1975-06-25',
  topMajorCities: ['Maputo', 'Matola', 'Nampula', 'Beira', 'Chimoio'],
  population: 33000000,
  mainLanguages: ['Portuguese', 'Makhuwa', 'Tsonga'],
  currency: 'Mozambican metical (MZN)',
  timezone: 'Africa/Maputo',
  foundingLeader: 'Samora Machel (first President)',
  currentLeader: 'Daniel Chapo (President) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['MZ'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['MZ'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['MZ'],
  stockExchange: 'Bolsa de Valores de Moçambique',
}
