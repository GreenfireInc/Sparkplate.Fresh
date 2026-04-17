import type { BeltAndRoadInitiativeCountry } from './types'

export const thailand: BeltAndRoadInitiativeCountry = {
  name: 'Thailand',
  iso3166Alpha2: 'TH',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bangkok',
  coordinates: { latitude: 15, longitude: 100 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Bangkok', 'Thailand — city 2 (verify)', 'Thailand — city 3 (verify)', 'Thailand — city 4 (verify)', 'Thailand — city 5 (verify)' ] as [string, string, string, string, string],
  population: 65859640,
  mainLanguages: [ 'Thai', 'English', 'Regional languages' ],
  currency: 'Thai baht (THB)',
  timezone: 'UTC+07:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
