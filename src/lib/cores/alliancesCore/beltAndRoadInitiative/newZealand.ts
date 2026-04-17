import type { BeltAndRoadInitiativeCountry } from './types'

export const newZealand: BeltAndRoadInitiativeCountry = {
  name: 'New Zealand',
  iso3166Alpha2: 'NZ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Wellington',
  coordinates: { latitude: -41, longitude: 174 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Wellington', 'New Zealand — city 2 (verify)', 'New Zealand — city 3 (verify)', 'New Zealand — city 4 (verify)', 'New Zealand — city 5 (verify)' ] as [string, string, string, string, string],
  population: 5324700,
  mainLanguages: [ 'English', 'Māori', 'New Zealand Sign Language' ],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'UTC-11:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
