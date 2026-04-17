import type { BeltAndRoadInitiativeCountry } from './types'

export const democraticRepublicOfTheCongo: BeltAndRoadInitiativeCountry = {
  name: 'Democratic Republic of the Congo',
  iso3166Alpha2: 'CD',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kinshasa',
  coordinates: { latitude: -4.3276, longitude: 15.3136 },
  independence: '1960-06-30',
  topMajorCities: ['Kinshasa', 'Lubumbashi', 'Mbuji-Mayi', 'Kisangani', 'Kananga'] as [string, string, string, string, string],
  population: 112832000,
  mainLanguages: [ 'French', 'Kikongo', 'Lingala' ],
  currency: 'Congolese franc (CDF)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Joseph Kasa-Vubu (President); Patrice Lumumba (Prime Minister)',
  currentLeader: 'Félix Tshisekedi (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC widespread P2P; no official CDF stablecoin',
  stockExchange: 'No liquid national exchange; informal OTC and regional listings',
}
