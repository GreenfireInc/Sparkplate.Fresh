import type { BeltAndRoadInitiativeCountry } from './types'

export const lebanon: BeltAndRoadInitiativeCountry = {
  name: 'Lebanon',
  iso3166Alpha2: 'LB',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Beirut',
  coordinates: { latitude: 33.8938, longitude: 35.5018 },
  independence: '1943-11-22',
  topMajorCities: ['Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Byblos'] as [string, string, string, string, string],
  population: 5490000,
  mainLanguages: [ 'Arabic', 'French', 'Regional languages' ],
  currency: 'Lebanese pound (LBP)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Bechara El Khoury (President)',
  currentLeader: 'Joseph Aoun (President); Nawaf Salam (Prime Minister)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Diaspora remittance rails'],
  stablecoin: 'USDT / USDC; USD parallel economy amid crisis',
  stockExchange: 'Beirut Stock Exchange',
}
