import type { BeltAndRoadInitiativeCountry } from './types'

export const slovakia: BeltAndRoadInitiativeCountry = {
  name: 'Slovakia',
  iso3166Alpha2: 'SK',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bratislava',
  coordinates: { latitude: 48.66666666, longitude: 19.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Bratislava', 'Slovakia — city 2 (verify)', 'Slovakia — city 3 (verify)', 'Slovakia — city 4 (verify)', 'Slovakia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 5413813,
  mainLanguages: [ 'Slovak', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
