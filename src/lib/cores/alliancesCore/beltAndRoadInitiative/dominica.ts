import type { BeltAndRoadInitiativeCountry } from './types'

export const dominica: BeltAndRoadInitiativeCountry = {
  name: 'Dominica',
  iso3166Alpha2: 'DM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Roseau',
  coordinates: { latitude: 15.41666666, longitude: -61.33333333 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Roseau', 'Dominica — city 2 (verify)', 'Dominica — city 3 (verify)', 'Dominica — city 4 (verify)', 'Dominica — city 5 (verify)' ] as [string, string, string, string, string],
  population: 67408,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Eastern Caribbean dollar (XCD)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
