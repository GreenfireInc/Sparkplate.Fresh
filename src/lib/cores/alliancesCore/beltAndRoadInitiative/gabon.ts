import type { BeltAndRoadInitiativeCountry } from './types'

export const gabon: BeltAndRoadInitiativeCountry = {
  name: 'Gabon',
  iso3166Alpha2: 'GA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Libreville',
  coordinates: { latitude: 0.4162, longitude: 9.4673 },
  independence: '1960-08-17',
  topMajorCities: ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda'] as [string, string, string, string, string],
  population: 2469296,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: 'Brice Clotaire Oligui Nguema (Transitional President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'CFA-region OTC'],
  stablecoin: 'USDT P2P; XAF peg',
  stockExchange: 'Bourse Régionale des Valeurs Mobilières (BRVM) — regional',
}
