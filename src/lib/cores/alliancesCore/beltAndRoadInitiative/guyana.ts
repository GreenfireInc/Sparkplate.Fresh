import type { BeltAndRoadInitiativeCountry } from './types'

export const guyana: BeltAndRoadInitiativeCountry = {
  name: 'Guyana',
  iso3166Alpha2: 'GY',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Georgetown',
  coordinates: { latitude: 5, longitude: -59 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Georgetown', 'Guyana — city 2 (verify)', 'Guyana — city 3 (verify)', 'Guyana — city 4 (verify)', 'Guyana — city 5 (verify)' ] as [string, string, string, string, string],
  population: 772975,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Guyanese dollar (GYD)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
