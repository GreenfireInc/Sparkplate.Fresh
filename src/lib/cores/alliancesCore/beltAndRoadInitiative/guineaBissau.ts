import type { BeltAndRoadInitiativeCountry } from './types'

export const guineaBissau: BeltAndRoadInitiativeCountry = {
  name: 'Guinea-Bissau',
  iso3166Alpha2: 'GW',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bissau',
  coordinates: { latitude: 11.8636, longitude: -15.5977 },
  independence: '1973-09-24',
  topMajorCities: ['Bissau', 'Bafatá', 'Gabú', 'Cacheu', 'Bolama'] as [string, string, string, string, string],
  population: 1781308,
  mainLanguages: [ 'Portuguese', 'Upper Guinea Creole', 'Regional languages' ],
  currency: 'West African CFA franc (XOF)',
  timezone: 'UTC',
  foundingLeader: 'Luís Cabral',
  currentLeader: 'Umaro Sissoco Embaló (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional P2P'],
  stablecoin: 'USDT P2P; XOF peg',
  stockExchange: 'No significant national exchange; BRVM regional access',
}
