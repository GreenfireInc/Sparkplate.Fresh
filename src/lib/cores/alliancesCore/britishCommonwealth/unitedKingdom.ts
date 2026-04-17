import type { CommonwealthCountry } from './types'

export const unitedKingdom: CommonwealthCountry = {
  name: 'United Kingdom',
  iso3166Alpha2: 'GB',
  commonwealthStatus: 'member',
  capital: 'London',
  coordinates: { latitude: 51.5074, longitude: -0.1278 },
  independence: 'N/A (sovereign state; devolution dates vary)',
  topMajorCities: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool'],
  population: 67000000,
  mainLanguages: ['English', 'Welsh', 'Scots Gaelic'],
  currency: 'Pound sterling (GBP)',
  timezone: 'Europe/London',
  foundingLeader: 'Robert Walpole (first PM, Westminster system context)',
  currentLeader: 'Keir Starmer (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Coinbase', 'Kraken', 'Revolut crypto'],
  stablecoin: 'GBP stablecoins limited; USDC/USDT on exchanges',
  stockExchange: 'London Stock Exchange (LSE)',
}
