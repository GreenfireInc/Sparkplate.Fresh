import type { AfricanUnionCountry } from './types'

export const egypt: AfricanUnionCountry = {
  name: 'Egypt',
  iso3166Alpha2: 'EG',
  africanUnionStatus: 'member',
  capital: 'Cairo',
  coordinates: { latitude: 30.0444, longitude: 31.2357 },
  independence: '1922-02-28',
  topMajorCities: ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said'],
  population: 114000000,
  mainLanguages: ['Arabic (Egyptian)', 'English', 'French (tourism & business)'],
  currency: 'Egyptian pound (EGP)',
  timezone: 'Africa/Cairo',
  foundingLeader: 'King Fuad I (Sultanate/Kingdom era)',
  currentLeader: 'Abdel Fattah el-Sisi (President)',
  cryptocurrencyExchanges: ['Rain (regional)', 'No official local spot exchange; P2P & OTC'],
  stablecoin: 'USDT / USDC P2P common; central bank exploring CBDC',
  stockExchange: 'Egyptian Exchange (EGX)',
}
