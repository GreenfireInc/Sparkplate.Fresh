import type { BeltAndRoadInitiativeCountry } from './types'

export const morocco: BeltAndRoadInitiativeCountry = {
  name: 'Morocco',
  iso3166Alpha2: 'MA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Rabat',
  coordinates: { latitude: 34.0209, longitude: -6.8416 },
  independence: '1956-03-02',
  topMajorCities: ['Casablanca', 'Rabat', 'Fes', 'Marrakesh', 'Tangier'] as [string, string, string, string, string],
  population: 36828330,
  mainLanguages: [ 'Arabic', 'Berber', 'Regional languages' ],
  currency: 'Moroccan dirham (MAD)',
  timezone: 'UTC',
  foundingLeader: 'Mohammed V (King)',
  currentLeader: 'Mohammed VI (King); Aziz Akhannouch (Prime Minister)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Rain (regional)', 'Peer OTC'],
  stablecoin: 'USDT informal; Bank Al-Maghrib exploring CBDC',
  stockExchange: 'Casablanca Stock Exchange',
}
