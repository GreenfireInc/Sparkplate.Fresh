import type { BeltAndRoadInitiativeCountry } from './types'

export const senegal: BeltAndRoadInitiativeCountry = {
  name: 'Senegal',
  iso3166Alpha2: 'SN',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Dakar',
  coordinates: { latitude: 14.7167, longitude: -17.4677 },
  independence: '1960-04-04',
  topMajorCities: ['Dakar', 'Touba', 'Thiès', 'Rufisque', 'Kaolack'] as [string, string, string, string, string],
  population: 18593258,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'West African CFA franc (XOF)',
  timezone: 'UTC',
  foundingLeader: 'Léopold Sédar Senghor',
  currentLeader: 'Bassirou Diomaye Faye (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Wave-linked fintech'],
  stablecoin: 'USDT / USDC; XOF peg via CFA',
  stockExchange: 'BRVM (regional; Dakar listings)',
}
