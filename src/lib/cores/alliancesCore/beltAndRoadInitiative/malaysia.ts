import type { BeltAndRoadInitiativeCountry } from './types'

export const malaysia: BeltAndRoadInitiativeCountry = {
  name: 'Malaysia',
  iso3166Alpha2: 'MY',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kuala Lumpur',
  coordinates: { latitude: 2.5, longitude: 112.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Kuala Lumpur', 'Malaysia — city 2 (verify)', 'Malaysia — city 3 (verify)', 'Malaysia — city 4 (verify)', 'Malaysia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 34231700,
  mainLanguages: [ 'English', 'Malay', 'Regional languages' ],
  currency: 'Malaysian ringgit (MYR)',
  timezone: 'UTC+08:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
