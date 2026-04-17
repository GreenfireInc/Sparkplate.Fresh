import type { BeltAndRoadInitiativeCountry } from './types'

export const albania: BeltAndRoadInitiativeCountry = {
  name: 'Albania',
  iso3166Alpha2: 'AL',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Tirana',
  coordinates: { latitude: 41, longitude: 20 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Tirana', 'Albania — city 2 (verify)', 'Albania — city 3 (verify)', 'Albania — city 4 (verify)', 'Albania — city 5 (verify)' ] as [string, string, string, string, string],
  population: 2363314,
  mainLanguages: [ 'Albanian', 'English', 'Regional languages' ],
  currency: 'Albanian lek (ALL)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
