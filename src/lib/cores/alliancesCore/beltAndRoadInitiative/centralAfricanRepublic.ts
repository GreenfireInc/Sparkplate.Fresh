import type { BeltAndRoadInitiativeCountry } from './types'

export const centralAfricanRepublic: BeltAndRoadInitiativeCountry = {
  name: 'Central African Republic',
  iso3166Alpha2: 'CF',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bangui',
  coordinates: { latitude: 4.3947, longitude: 18.5582 },
  independence: '1960-08-13',
  topMajorCities: ['Bangui', 'Bimbo', 'Berbérati', 'Carnot', 'Bambari'] as [string, string, string, string, string],
  population: 6470307,
  mainLanguages: [ 'French', 'Sango', 'Regional languages' ],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'UTC+01:00',
  foundingLeader: 'David Dacko',
  currentLeader: 'Faustin-Archange Touadéra (President)',
  cryptocurrencyExchanges: ['Sango Coin ecosystem (national project)', 'Binance (P2P)', 'OTC'],
  stablecoin: 'USDT / USDC P2P; experimental sovereign crypto references',
  stockExchange: 'Bangui Stock Exchange (very limited)',
}
