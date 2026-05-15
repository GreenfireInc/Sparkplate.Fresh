import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECOWAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const benin: EcowasCountry = {
  name: 'Benin',
  iso3166Alpha2: 'BJ',
  capital: 'Porto-Novo',
  coordinates: { latitude: 6.4969, longitude: 2.6283 },
  independence: '1960-08-01',
  topMajorCities: ['Cotonou', 'Porto-Novo', 'Parakou', 'Djougou', 'Bohicon'],
  population: 14000000,
  mainLanguages: ['French', 'Fon', 'Yoruba'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Porto-Novo',
  foundingLeader: 'Hubert Maga (first Prime Minister transitional)',
  currentLeader: 'President Patrice Talon — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local brokers'],
  stablecoin: 'USDT common informal; XOF CFA euro peg via BCEAO',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['BJ'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['BJ'],
  stockExchange: 'Regional BRVM — Abidjan listings (WAEMU securities)',
}
