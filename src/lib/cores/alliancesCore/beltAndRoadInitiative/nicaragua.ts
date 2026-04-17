import type { BeltAndRoadInitiativeCountry } from './types'

export const nicaragua: BeltAndRoadInitiativeCountry = {
  name: 'Nicaragua',
  iso3166Alpha2: 'NI',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Managua',
  coordinates: { latitude: 13, longitude: -85 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Managua', 'Nicaragua — city 2 (verify)', 'Nicaragua — city 3 (verify)', 'Nicaragua — city 4 (verify)', 'Nicaragua — city 5 (verify)' ] as [string, string, string, string, string],
  population: 6803886,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Nicaraguan córdoba (NIO)',
  timezone: 'UTC-06:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
