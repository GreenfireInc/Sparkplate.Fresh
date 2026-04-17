import type { BeltAndRoadInitiativeCountry } from './types'

export const tanzania: BeltAndRoadInitiativeCountry = {
  name: 'Tanzania',
  iso3166Alpha2: 'TZ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Dodoma',
  coordinates: { latitude: -6.163, longitude: 35.7516 },
  independence: '1961-12-09 (Tanganyika); Zanzibar merged 1964',
  topMajorCities: ['Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya'] as [string, string, string, string, string],
  population: 68153004,
  mainLanguages: [ 'English', 'Swahili', 'Regional languages' ],
  currency: 'Tanzanian shilling (TZS)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Julius Nyerere',
  currentLeader: 'Samia Suluhu Hassan (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local fintech'],
  stablecoin: 'USDT / USDC P2P',
  stockExchange: 'Dar es Salaam Stock Exchange (DSE)',
}
