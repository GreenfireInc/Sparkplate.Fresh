import type { BeltAndRoadInitiativeCountry } from './types'

export const singapore: BeltAndRoadInitiativeCountry = {
  name: 'Singapore',
  iso3166Alpha2: 'SG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Singapore',
  coordinates: { latitude: 1.36666666, longitude: 103.8 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Singapore', 'Singapore — city 2 (verify)', 'Singapore — city 3 (verify)', 'Singapore — city 4 (verify)', 'Singapore — city 5 (verify)' ] as [string, string, string, string, string],
  population: 6110200,
  mainLanguages: [ 'English', 'Chinese', 'Malay' ],
  currency: 'Singapore dollar (SGD)',
  timezone: 'UTC+08:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
