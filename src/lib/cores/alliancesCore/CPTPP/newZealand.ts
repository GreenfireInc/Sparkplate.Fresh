import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const newZealand: CptppCountry = {
  name: 'New Zealand',
  iso3166Alpha2: 'NZ',
  capital: 'Wellington',
  coordinates: { latitude: -41.2865, longitude: 174.776 },
  independence: '1907-09-26 (Dominion status; full legislative independence phased — informational)',
  topMajorCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'],
  population: 5300000,
  mainLanguages: ['English', 'Māori', 'NZ Sign Language'],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'Pacific/Auckland',
  foundingLeader: 'Richard Seddon (long-serving colonial PM reference); Dominion transition — informational',
  currentLeader: 'Prime Minister Christopher Luxon — verify',
  cryptocurrencyExchanges: ['Easy Crypto', 'Independent Reserve AU/NZ corridor', 'Global brokers'],
  stablecoin: 'NZD-pegged limited; USDC adoption in fintech — verify',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['NZ'],
  stockExchange: 'NZX Limited',
}
