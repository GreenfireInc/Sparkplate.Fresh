import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const australia: CptppCountry = {
  name: 'Australia',
  iso3166Alpha2: 'AU',
  capital: 'Canberra',
  coordinates: { latitude: -35.2809, longitude: 149.13 },
  independence: '1901-01-01 (Commonwealth of Australia / federation — informational)',
  topMajorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  population: 27000000,
  mainLanguages: ['English', 'Mandarin Chinese', 'Arabic'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Australia/Canberra',
  foundingLeader: 'Edmund Barton (first Prime Minister)',
  currentLeader: 'Prime Minister Anthony Albanese — verify',
  cryptocurrencyExchanges: ['Independent Reserve', 'CoinSpot', 'Kraken (global)', 'Binance (offshore context)'],
  stablecoin: 'AUD-pegged tokens limited; USDT / USDC widely traded',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['AU'],
  stockExchange: 'Australian Securities Exchange (ASX)',
}
