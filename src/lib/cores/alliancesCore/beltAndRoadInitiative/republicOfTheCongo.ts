import type { BeltAndRoadInitiativeCountry } from './types'

export const republicOfTheCongo: BeltAndRoadInitiativeCountry = {
  name: 'Republic of the Congo',
  iso3166Alpha2: 'CG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Brazzaville',
  coordinates: { latitude: -4.2634, longitude: 15.2429 },
  independence: '1960-08-15',
  topMajorCities: ['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Nkayi', 'Owando'] as [string, string, string, string, string],
  population: 6142180,
  mainLanguages: [ 'French', 'Kikongo', 'Lingala' ],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Fulbert Youlou',
  currentLeader: 'Denis Sassou Nguesso (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC'],
  stablecoin: 'USDT P2P; XAF peg',
  stockExchange: 'Bourse des Valeurs du Congo (BVC)',
}
