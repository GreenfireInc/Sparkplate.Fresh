import type { BeltAndRoadInitiativeCountry } from './types'

export const portugal: BeltAndRoadInitiativeCountry = {
  name: 'Portugal',
  iso3166Alpha2: 'PT',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Lisbon',
  coordinates: { latitude: 39.5, longitude: -8 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Lisbon', 'Portugal — city 2 (verify)', 'Portugal — city 3 (verify)', 'Portugal — city 4 (verify)', 'Portugal — city 5 (verify)' ] as [string, string, string, string, string],
  population: 10749635,
  mainLanguages: [ 'Portuguese', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC-01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
