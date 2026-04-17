import type { CommonwealthCountry } from './types'

export const bangladesh: CommonwealthCountry = {
  name: 'Bangladesh',
  iso3166Alpha2: 'BD',
  commonwealthStatus: 'member',
  capital: 'Dhaka',
  coordinates: { latitude: 23.8103, longitude: 90.4125 },
  independence: '1971-03-26',
  topMajorCities: ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet'],
  population: 172000000,
  mainLanguages: ['Bengali', 'English', 'Chittagonian'],
  currency: 'Bangladeshi taka (BDT)',
  timezone: 'Asia/Dhaka',
  foundingLeader: 'Sheikh Mujibur Rahman',
  currentLeader: 'Sheikh Hasina (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional brokers'],
  stablecoin: 'USDT common in informal markets; no official BDT stablecoin',
  stockExchange: 'Dhaka Stock Exchange (DSE); Chittagong Stock Exchange',
}
