import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const benin: CensadCountry = {
  name: 'Benin',
  iso3166Alpha2: 'BJ',
  capital: 'Porto-Novo',
  coordinates: { latitude: 6.4969, longitude: 2.6036 },
  independence: '1960-08-01 (Republic of Dahomey; present name from 1975)',
  topMajorCities: ['Cotonou', 'Porto-Novo', 'Parakou', 'Djougou', 'Bohicon'],
  population: 13600000,
  mainLanguages: ['French', 'Fon', 'Yoruba'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Porto-Novo',
  foundingLeader: 'Hubert Maga (first Prime Minister post-independence)',
  currentLeader: 'President Patrice Talon — verify',
  cryptocurrencyExchanges: ['Binance (P2P informal)', 'Local OTC'],
  stablecoin: 'USDT/USDC informal; CFA pegged to EUR',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['BJ'],
  newsOutlets: CENSAD_NEWS_OUTLETS['BJ'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['BJ'],
  stockExchange: 'Regional Bourse Régionale des Valeurs Mobilières (BRVM Abidjan, WAEMU listing)',
}
