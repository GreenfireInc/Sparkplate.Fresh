import type { BeltAndRoadInitiativeCountry } from './types'

export const cuba: BeltAndRoadInitiativeCountry = {
  name: 'Cuba',
  iso3166Alpha2: 'CU',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Havana',
  coordinates: { latitude: 21.5, longitude: -80 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Havana', 'Cuba — city 2 (verify)', 'Cuba — city 3 (verify)', 'Cuba — city 4 (verify)', 'Cuba — city 5 (verify)' ] as [string, string, string, string, string],
  population: 9748007,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Cuban convertible peso (CUC)',
  timezone: 'UTC-05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
