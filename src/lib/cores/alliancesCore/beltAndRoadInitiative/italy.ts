import type { BeltAndRoadInitiativeCountry } from './types'

export const italy: BeltAndRoadInitiativeCountry = {
  name: 'Italy',
  iso3166Alpha2: 'IT',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Rome',
  coordinates: { latitude: 42.83333333, longitude: 12.83333333 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Rome', 'Italy — city 2 (verify)', 'Italy — city 3 (verify)', 'Italy — city 4 (verify)', 'Italy — city 5 (verify)' ] as [string, string, string, string, string],
  population: 58927633,
  mainLanguages: [ 'Italian', 'Catalan', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
