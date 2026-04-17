import type { BeltAndRoadInitiativeCountry } from './types'

export const cyprus: BeltAndRoadInitiativeCountry = {
  name: 'Cyprus',
  iso3166Alpha2: 'CY',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Nicosia',
  coordinates: { latitude: 35, longitude: 33 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Nicosia', 'Cyprus — city 2 (verify)', 'Cyprus — city 3 (verify)', 'Cyprus — city 4 (verify)', 'Cyprus — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1442614,
  mainLanguages: [ 'Greek', 'Turkish', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
