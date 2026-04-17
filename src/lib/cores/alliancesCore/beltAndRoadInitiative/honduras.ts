import type { BeltAndRoadInitiativeCountry } from './types'

export const honduras: BeltAndRoadInitiativeCountry = {
  name: 'Honduras',
  iso3166Alpha2: 'HN',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Tegucigalpa',
  coordinates: { latitude: 15, longitude: -86.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Tegucigalpa', 'Honduras — city 2 (verify)', 'Honduras — city 3 (verify)', 'Honduras — city 4 (verify)', 'Honduras — city 5 (verify)' ] as [string, string, string, string, string],
  population: 9892632,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Honduran lempira (HNL)',
  timezone: 'UTC-06:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
