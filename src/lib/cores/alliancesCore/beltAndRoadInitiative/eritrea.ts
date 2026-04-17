import type { BeltAndRoadInitiativeCountry } from './types'

export const eritrea: BeltAndRoadInitiativeCountry = {
  name: 'Eritrea',
  iso3166Alpha2: 'ER',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Asmara',
  coordinates: { latitude: 15.3229, longitude: 38.9251 },
  independence: '1993-05-24',
  topMajorCities: ['Asmara', 'Keren', 'Massawa', 'Assab', 'Mendefera'] as [string, string, string, string, string],
  population: 3607000,
  mainLanguages: [ 'Arabic', 'English', 'Tigrinya' ],
  currency: 'Eritrean nakfa (ERN)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Isaias Afwerki',
  currentLeader: 'Isaias Afwerki (President)',
  cryptocurrencyExchanges: ['Limited formal venues; diaspora P2P', 'Binance (P2P, informal)'],
  stablecoin: 'USDT minimal formal access; cash economy strong',
  stockExchange: 'No public stock exchange',
}
