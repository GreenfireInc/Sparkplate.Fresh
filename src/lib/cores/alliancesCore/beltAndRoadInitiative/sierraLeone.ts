import type { BeltAndRoadInitiativeCountry } from './types'

export const sierraLeone: BeltAndRoadInitiativeCountry = {
  name: 'Sierra Leone',
  iso3166Alpha2: 'SL',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Freetown',
  coordinates: { latitude: 8.484, longitude: -13.2299 },
  independence: '1961-04-27',
  topMajorCities: ['Freetown', 'Bo', 'Kenema', 'Makeni', 'Koidu'] as [string, string, string, string, string],
  population: 9077691,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Leone (SLE)',
  timezone: 'UTC',
  foundingLeader: 'Milton Margai',
  currentLeader: 'Julius Maada Bio (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Afriex'],
  stablecoin: 'USDT / USDC P2P',
  stockExchange: 'Sierra Leone Stock Exchange',
}
