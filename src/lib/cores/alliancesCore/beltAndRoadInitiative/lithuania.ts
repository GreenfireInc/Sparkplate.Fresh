import type { BeltAndRoadInitiativeCountry } from './types'

export const lithuania: BeltAndRoadInitiativeCountry = {
  name: 'Lithuania',
  iso3166Alpha2: 'LT',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Vilnius',
  coordinates: { latitude: 56, longitude: 24 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Vilnius', 'Lithuania — city 2 (verify)', 'Lithuania — city 3 (verify)', 'Lithuania — city 4 (verify)', 'Lithuania — city 5 (verify)' ] as [string, string, string, string, string],
  population: 2894886,
  mainLanguages: [ 'Lithuanian', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
