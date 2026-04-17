import type { BeltAndRoadInitiativeCountry } from './types'

export const czechRepublic: BeltAndRoadInitiativeCountry = {
  name: 'Czech Republic',
  iso3166Alpha2: 'CZ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Prague',
  coordinates: { latitude: 49.75, longitude: 15.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Prague', 'Czech Republic — city 2 (verify)', 'Czech Republic — city 3 (verify)', 'Czech Republic — city 4 (verify)', 'Czech Republic — city 5 (verify)' ] as [string, string, string, string, string],
  population: 10882341,
  mainLanguages: [ 'Czech', 'Slovak', 'Regional languages' ],
  currency: 'Czech koruna (CZK)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
