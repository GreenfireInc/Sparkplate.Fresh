import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const canada: CptppCountry = {
  name: 'Canada',
  iso3166Alpha2: 'CA',
  capital: 'Ottawa',
  coordinates: { latitude: 45.4215, longitude: -75.6972 },
  independence: '1867-07-01 (Confederation); Constitution Act patriation 1982 — informational',
  topMajorCities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton'],
  population: 40500000,
  mainLanguages: ['English', 'French', 'Mandarin Chinese'],
  currency: 'Canadian dollar (CAD)',
  timezone: 'America/Toronto',
  foundingLeader: 'John A. Macdonald (first Prime Minister, Confederation)',
  currentLeader: 'Prime Minister Mark Carney — verify',
  cryptocurrencyExchanges: ['Bitbuy', 'Coinsquare', 'Wealthsimple Crypto', 'Global platforms (regulatory evolution)'],
  stablecoin: 'CAD stablecoins limited; USDC / USDT common',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['CA'],
  stockExchange: 'Toronto Stock Exchange (TSX) / TMX Group',
}
