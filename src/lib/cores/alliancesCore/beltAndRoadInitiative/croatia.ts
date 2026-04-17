import type { BeltAndRoadInitiativeCountry } from './types'

export const croatia: BeltAndRoadInitiativeCountry = {
  name: 'Croatia',
  iso3166Alpha2: 'HR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Zagreb',
  coordinates: { latitude: 45.16666666, longitude: 15.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Zagreb', 'Croatia — city 2 (verify)', 'Croatia — city 3 (verify)', 'Croatia — city 4 (verify)', 'Croatia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 3866233,
  mainLanguages: [ 'Croatian', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
