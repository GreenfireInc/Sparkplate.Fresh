import type { BeltAndRoadInitiativeCountry } from './types'

export const ukraine: BeltAndRoadInitiativeCountry = {
  name: 'Ukraine',
  iso3166Alpha2: 'UA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kyiv',
  coordinates: { latitude: 49, longitude: 32 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Kyiv', 'Ukraine — city 2 (verify)', 'Ukraine — city 3 (verify)', 'Ukraine — city 4 (verify)', 'Ukraine — city 5 (verify)' ] as [string, string, string, string, string],
  population: 32862000,
  mainLanguages: [ 'Ukrainian', 'English', 'Regional languages' ],
  currency: 'Ukrainian hryvnia (UAH)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
