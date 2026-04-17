import type { BeltAndRoadInitiativeCountry } from './types'

export const greece: BeltAndRoadInitiativeCountry = {
  name: 'Greece',
  iso3166Alpha2: 'GR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Athens',
  coordinates: { latitude: 39, longitude: 22 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Athens', 'Greece — city 2 (verify)', 'Greece — city 3 (verify)', 'Greece — city 4 (verify)', 'Greece — city 5 (verify)' ] as [string, string, string, string, string],
  population: 10400720,
  mainLanguages: [ 'Greek', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
