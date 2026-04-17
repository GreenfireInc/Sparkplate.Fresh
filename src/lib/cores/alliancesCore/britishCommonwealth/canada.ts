import type { CommonwealthCountry } from './types'

export const canada: CommonwealthCountry = {
  name: 'Canada',
  iso3166Alpha2: 'CA',
  commonwealthStatus: 'member',
  capital: 'Ottawa',
  coordinates: { latitude: 45.4215, longitude: -75.6972 },
  independence: '1867-07-01 (Confederation); patriation 1982',
  topMajorCities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa'],
  population: 40000000,
  mainLanguages: ['English', 'French', 'Indigenous languages'],
  currency: 'Canadian dollar (CAD)',
  timezone: 'America/Toronto',
  foundingLeader: 'John A. Macdonald (first Prime Minister)',
  currentLeader: 'Justin Trudeau (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Newton', 'Shakepay', 'Coinbase (eligible provinces)'],
  stablecoin: 'CAD stablecoins limited; USDC/USDT common',
  stockExchange: 'Toronto Stock Exchange (TSX)',
}
