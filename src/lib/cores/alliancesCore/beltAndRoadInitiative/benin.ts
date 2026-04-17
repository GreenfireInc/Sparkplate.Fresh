import type { BeltAndRoadInitiativeCountry } from './types'

export const benin: BeltAndRoadInitiativeCountry = {
  name: 'Benin',
  iso3166Alpha2: 'BJ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Porto-Novo',
  coordinates: { latitude: 6.4969, longitude: 2.6283 },
  independence: '1960-08-01',
  topMajorCities: ['Cotonou', 'Porto-Novo', 'Parakou', 'Djougou', 'Bohicon'] as [string, string, string, string, string],
  population: 13224860,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'West African CFA franc (XOF)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Hubert Maga',
  currentLeader: 'Patrice Talon (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local brokers'],
  stablecoin: 'USDT common in informal trade; XOF pegged to euro via CFA',
  stockExchange: 'Regional Securities Exchange (BRVM) — Abidjan (Benin listed)',
}
