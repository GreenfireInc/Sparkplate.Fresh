import type { BeltAndRoadInitiativeCountry } from './types'

export const luxembourg: BeltAndRoadInitiativeCountry = {
  name: 'Luxembourg',
  iso3166Alpha2: 'LU',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Luxembourg',
  coordinates: { latitude: 49.75, longitude: 6.16666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Luxembourg', 'Luxembourg — city 2 (verify)', 'Luxembourg — city 3 (verify)', 'Luxembourg — city 4 (verify)', 'Luxembourg — city 5 (verify)' ] as [string, string, string, string, string],
  population: 681973,
  mainLanguages: [ 'German', 'French', 'Luxembourgish' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
