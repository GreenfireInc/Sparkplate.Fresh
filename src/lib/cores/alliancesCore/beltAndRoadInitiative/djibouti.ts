import type { BeltAndRoadInitiativeCountry } from './types'

export const djibouti: BeltAndRoadInitiativeCountry = {
  name: 'Djibouti',
  iso3166Alpha2: 'DJ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Djibouti',
  coordinates: { latitude: 11.5886, longitude: 43.1456 },
  independence: '1977-06-27',
  topMajorCities: ['Djibouti City', 'Ali Sabieh', 'Tadjoura', 'Obock', 'Dikhil'] as [string, string, string, string, string],
  population: 1066809,
  mainLanguages: [ 'Arabic', 'French', 'Regional languages' ],
  currency: 'Djiboutian franc (DJF)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Hassan Gouled Aptidon',
  currentLeader: 'Ismail Omar Guelleh (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'International OTC', 'Regional remittance apps'],
  stablecoin: 'USDT / USDC; DJF pegged to USD (currency board)',
  stockExchange: 'Djibouti Stock Exchange (thin activity)',
}
