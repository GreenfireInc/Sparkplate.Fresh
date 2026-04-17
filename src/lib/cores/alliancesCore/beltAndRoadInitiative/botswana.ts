import type { BeltAndRoadInitiativeCountry } from './types'

export const botswana: BeltAndRoadInitiativeCountry = {
  name: 'Botswana',
  iso3166Alpha2: 'BW',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Gaborone',
  coordinates: { latitude: -24.6282, longitude: 25.9231 },
  independence: '1966-09-30',
  topMajorCities: ['Gaborone', 'Francistown', 'Molepolole', 'Maun', 'Serowe'] as [string, string, string, string, string],
  population: 2359609,
  mainLanguages: [ 'English', 'Tswana', 'Regional languages' ],
  currency: 'Botswana pula (BWP)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Seretse Khama',
  currentLeader: 'Duma Boko (President)',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)'],
  stablecoin: 'USDT / USDC on international platforms; no BWP stablecoin',
  stockExchange: 'Botswana Stock Exchange (BSE)',
}
