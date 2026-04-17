import type { BeltAndRoadInitiativeCountry } from './types'

export const mali: BeltAndRoadInitiativeCountry = {
  name: 'Mali',
  iso3166Alpha2: 'ML',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bamako',
  coordinates: { latitude: 12.6392, longitude: -8.0029 },
  independence: '1960-09-22',
  topMajorCities: ['Bamako', 'Sikasso', 'Mopti', 'Koutiala', 'Kayes'] as [string, string, string, string, string],
  population: 22395489,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'West African CFA franc (XOF)',
  timezone: 'UTC',
  foundingLeader: 'Modibo Keïta',
  currentLeader: 'Assimi Goïta (Colonel; transitional leadership)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'OTC'],
  stablecoin: 'USDT P2P; XOF peg',
  stockExchange: 'Bourse des Valeurs du Mali (limited)',
}
