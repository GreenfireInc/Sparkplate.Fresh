import type { BeltAndRoadInitiativeCountry } from './types'

export const samoa: BeltAndRoadInitiativeCountry = {
  name: 'Samoa',
  iso3166Alpha2: 'WS',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Apia',
  coordinates: { latitude: -13.58333333, longitude: -172.33333333 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Apia', 'Samoa — city 2 (verify)', 'Samoa — city 3 (verify)', 'Samoa — city 4 (verify)', 'Samoa — city 5 (verify)' ] as [string, string, string, string, string],
  population: 205557,
  mainLanguages: [ 'English', 'Samoan', 'Regional languages' ],
  currency: 'Samoan tālā (WST)',
  timezone: 'UTC+13:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
