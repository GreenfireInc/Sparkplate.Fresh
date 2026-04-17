import type { BeltAndRoadInitiativeCountry } from './types'

export const mozambique: BeltAndRoadInitiativeCountry = {
  name: 'Mozambique',
  iso3166Alpha2: 'MZ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Maputo',
  coordinates: { latitude: -25.9692, longitude: 32.5732 },
  independence: '1975-06-25',
  topMajorCities: ['Maputo', 'Matola', 'Nampula', 'Beira', 'Chimoio'] as [string, string, string, string, string],
  population: 34090466,
  mainLanguages: [ 'Portuguese', 'English', 'Regional languages' ],
  currency: 'Mozambican metical (MZN)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Samora Machel',
  currentLeader: 'Daniel Chapo (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC informal',
  stockExchange: 'Bolsa de Valores de Moçambique (BVM)',
}
