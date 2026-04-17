import type { CommonwealthCountry } from './types'

export const australia: CommonwealthCountry = {
  name: 'Australia',
  iso3166Alpha2: 'AU',
  commonwealthStatus: 'member',
  capital: 'Canberra',
  coordinates: { latitude: -35.2809, longitude: 149.13 },
  independence: '1901-01-01 (Federation); 1986 Australia Act',
  topMajorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  population: 26500000,
  mainLanguages: ['English', 'Auslan', 'Italian (community)'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Australia/Sydney',
  foundingLeader: 'Edmund Barton (first Prime Minister)',
  currentLeader: 'Anthony Albanese (Prime Minister)',
  cryptocurrencyExchanges: ['Independent Reserve', 'BTC Markets', 'Binance AU'],
  stablecoin: 'AUD stablecoins limited; USDC/USDT common',
  stockExchange: 'Australian Securities Exchange (ASX)',
}
