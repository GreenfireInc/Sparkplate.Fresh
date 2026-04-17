import type { BeltAndRoadInitiativeCountry } from './types'

export const syria: BeltAndRoadInitiativeCountry = {
  name: 'Syria',
  iso3166Alpha2: 'SY',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Damascus',
  coordinates: { latitude: 33.5138, longitude: 36.2765 },
  independence: '1946-04-17',
  topMajorCities: ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Hama'] as [string, string, string, string, string],
  population: 25620000,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Syrian pound (SYP)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Shukri al-Quwatli (Republic era)',
  currentLeader: 'Ahmed al-Sharaa (President; transitional context — verify)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Sanctions-affected rails'],
  stablecoin: 'USDT informal; heavily depreciated SYP',
  stockExchange: 'Damascus Securities Exchange (limited)',
}
