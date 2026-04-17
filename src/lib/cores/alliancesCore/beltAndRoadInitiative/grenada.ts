import type { BeltAndRoadInitiativeCountry } from './types'

export const grenada: BeltAndRoadInitiativeCountry = {
  name: 'Grenada',
  iso3166Alpha2: 'GD',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'St. George\'s',
  coordinates: { latitude: 12.11666666, longitude: -61.66666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'St. George\'s', 'Grenada — city 2 (verify)', 'Grenada — city 3 (verify)', 'Grenada — city 4 (verify)', 'Grenada — city 5 (verify)' ] as [string, string, string, string, string],
  population: 109021,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Eastern Caribbean dollar (XCD)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
