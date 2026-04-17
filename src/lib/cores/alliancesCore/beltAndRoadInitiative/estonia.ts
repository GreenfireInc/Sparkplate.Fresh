import type { BeltAndRoadInitiativeCountry } from './types'

export const estonia: BeltAndRoadInitiativeCountry = {
  name: 'Estonia',
  iso3166Alpha2: 'EE',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Tallinn',
  coordinates: { latitude: 59, longitude: 26 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Tallinn', 'Estonia — city 2 (verify)', 'Estonia — city 3 (verify)', 'Estonia — city 4 (verify)', 'Estonia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1369995,
  mainLanguages: [ 'Estonian', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
