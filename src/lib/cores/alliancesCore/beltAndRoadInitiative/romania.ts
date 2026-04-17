import type { BeltAndRoadInitiativeCountry } from './types'

export const romania: BeltAndRoadInitiativeCountry = {
  name: 'Romania',
  iso3166Alpha2: 'RO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bucharest',
  coordinates: { latitude: 46, longitude: 25 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Bucharest', 'Romania — city 2 (verify)', 'Romania — city 3 (verify)', 'Romania — city 4 (verify)', 'Romania — city 5 (verify)' ] as [string, string, string, string, string],
  population: 19036031,
  mainLanguages: [ 'Romanian', 'English', 'Regional languages' ],
  currency: 'Romanian leu (RON)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
