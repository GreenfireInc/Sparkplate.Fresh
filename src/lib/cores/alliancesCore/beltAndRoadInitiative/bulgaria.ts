import type { BeltAndRoadInitiativeCountry } from './types'

export const bulgaria: BeltAndRoadInitiativeCountry = {
  name: 'Bulgaria',
  iso3166Alpha2: 'BG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Sofia',
  coordinates: { latitude: 43, longitude: 25 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Sofia', 'Bulgaria — city 2 (verify)', 'Bulgaria — city 3 (verify)', 'Bulgaria — city 4 (verify)', 'Bulgaria — city 5 (verify)' ] as [string, string, string, string, string],
  population: 6437360,
  mainLanguages: [ 'Bulgarian', 'English', 'Regional languages' ],
  currency: 'Bulgarian lev (BGN)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
