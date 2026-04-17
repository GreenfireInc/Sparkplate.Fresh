import type { BeltAndRoadInitiativeCountry } from './types'

export const southSudan: BeltAndRoadInitiativeCountry = {
  name: 'South Sudan',
  iso3166Alpha2: 'SS',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Juba',
  coordinates: { latitude: 4.8594, longitude: 31.5713 },
  independence: '2011-07-09',
  topMajorCities: ['Juba', 'Wau', 'Malakal', 'Yei', 'Aweil'] as [string, string, string, string, string],
  population: 15786898,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'South Sudanese pound (SSP)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Salva Kiir Mayardit',
  currentLeader: 'Salva Kiir Mayardit (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Informal P2P', 'Diaspora OTC'],
  stablecoin: 'USDT informal; humanitarian USD economy',
  stockExchange: 'Juba Stock Exchange (nascent / limited)',
}
