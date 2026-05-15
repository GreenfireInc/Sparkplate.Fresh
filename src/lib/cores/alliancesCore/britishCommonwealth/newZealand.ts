import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const newZealand: CommonwealthCountry = {
  name: 'New Zealand',
  iso3166Alpha2: 'NZ',
  commonwealthStatus: 'member',
  capital: 'Wellington',
  coordinates: { latitude: -41.2865, longitude: 174.7762 },
  independence: '1907-09-26 (Dominion); full sovereignty evolution',
  topMajorCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'],
  population: 5200000,
  mainLanguages: ['English', 'Māori', 'New Zealand Sign Language'],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'Pacific/Auckland',
  foundingLeader: 'Richard Seddon (notable Premier era)',
  currentLeader: 'Christopher Luxon (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Easy Crypto', 'Independent Reserve NZ', 'Binance (P2P)'],
  stablecoin: 'NZD stablecoins limited; USDC/USDT',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['NZ'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['NZ'],
  stockExchange: 'NZX (New Zealand Exchange)',
}
