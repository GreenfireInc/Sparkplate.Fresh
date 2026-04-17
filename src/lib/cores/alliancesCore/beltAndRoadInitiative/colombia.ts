import type { BeltAndRoadInitiativeCountry } from './types'

export const colombia: BeltAndRoadInitiativeCountry = {
  name: 'Colombia',
  iso3166Alpha2: 'CO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bogotá',
  coordinates: { latitude: 4, longitude: -72 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Bogotá', 'Colombia — city 2 (verify)', 'Colombia — city 3 (verify)', 'Colombia — city 4 (verify)', 'Colombia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 53057212,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Colombian peso (COP)',
  timezone: 'UTC-05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
