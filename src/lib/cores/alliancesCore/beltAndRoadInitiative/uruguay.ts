import type { BeltAndRoadInitiativeCountry } from './types'

export const uruguay: BeltAndRoadInitiativeCountry = {
  name: 'Uruguay',
  iso3166Alpha2: 'UY',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Montevideo',
  coordinates: { latitude: -33, longitude: -56 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Montevideo', 'Uruguay — city 2 (verify)', 'Uruguay — city 3 (verify)', 'Uruguay — city 4 (verify)', 'Uruguay — city 5 (verify)' ] as [string, string, string, string, string],
  population: 3499451,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Uruguayan peso (UYU)',
  timezone: 'UTC-03:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
