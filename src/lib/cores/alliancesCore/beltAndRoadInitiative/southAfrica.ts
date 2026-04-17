import type { BeltAndRoadInitiativeCountry } from './types'

export const southAfrica: BeltAndRoadInitiativeCountry = {
  name: 'South Africa',
  iso3166Alpha2: 'ZA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Pretoria',
  coordinates: { latitude: -25.7479, longitude: 28.2293 },
  independence: '1910-05-31 (Union); 1994-04-27 (first democratic election reference)',
  topMajorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth (Gqeberha)'] as [string, string, string, string, string],
  population: 63100945,
  mainLanguages: [ 'Afrikaans', 'English', 'Southern Ndebele' ],
  currency: 'South African rand (ZAR)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Louis Botha (first Prime Minister, Union of South Africa)',
  currentLeader: 'Cyril Ramaphosa (President)',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)', 'ICE3 (historical)'],
  stablecoin: 'USDT / USDC; ZARP (rand-referenced stable token, private)',
  stockExchange: 'Johannesburg Stock Exchange (JSE)',
}
