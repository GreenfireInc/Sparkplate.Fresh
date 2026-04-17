import type { BeltAndRoadInitiativeCountry } from './types'

export const egypt: BeltAndRoadInitiativeCountry = {
  name: 'Egypt',
  iso3166Alpha2: 'EG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Cairo',
  coordinates: { latitude: 30.0444, longitude: 31.2357 },
  independence: '1922-02-28',
  topMajorCities: ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said'] as [string, string, string, string, string],
  population: 107271260,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Egyptian pound (EGP)',
  timezone: 'UTC+02:00',
  foundingLeader: 'King Fuad I (Sultanate/Kingdom era)',
  currentLeader: 'Abdel Fattah el-Sisi (President)',
  cryptocurrencyExchanges: ['Rain (regional)', 'No official local spot exchange; P2P & OTC'],
  stablecoin: 'USDT / USDC P2P common; central bank exploring CBDC',
  stockExchange: 'Egyptian Exchange (EGX)',
}
