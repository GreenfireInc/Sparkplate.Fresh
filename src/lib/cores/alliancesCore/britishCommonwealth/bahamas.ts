import type { CommonwealthCountry } from './types'

export const bahamas: CommonwealthCountry = {
  name: 'Bahamas',
  iso3166Alpha2: 'BS',
  commonwealthStatus: 'member',
  capital: 'Nassau',
  coordinates: { latitude: 25.0343, longitude: -77.3963 },
  independence: '1973-07-10',
  topMajorCities: ['Nassau', 'Freeport', 'West End', 'Coopers Town', 'Marsh Harbour'],
  population: 400000,
  mainLanguages: ['English', 'Bahamian Creole', 'Haitian Creole (community)'],
  currency: 'Bahamian dollar (BSD); USD widely used',
  timezone: 'America/Nassau',
  foundingLeader: 'Lynden Pindling (first Prime Minister)',
  currentLeader: 'Philip Davis (Prime Minister)',
  cryptocurrencyExchanges: ['FTX legacy context; regional OTC', 'Binance (P2P)'],
  stablecoin: 'Sand dollar (CBDC pilot context); USDT/USDC',
  stockExchange: 'Bahamas International Securities Exchange (BISX)',
}
