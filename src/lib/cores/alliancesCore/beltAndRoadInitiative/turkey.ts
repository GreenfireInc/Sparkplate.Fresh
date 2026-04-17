import type { BeltAndRoadInitiativeCountry } from './types'

export const turkey: BeltAndRoadInitiativeCountry = {
  name: 'Turkey',
  iso3166Alpha2: 'TR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Ankara',
  coordinates: { latitude: 39, longitude: 35 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Ankara', 'Turkey — city 2 (verify)', 'Turkey — city 3 (verify)', 'Turkey — city 4 (verify)', 'Turkey — city 5 (verify)' ] as [string, string, string, string, string],
  population: 85664944,
  mainLanguages: [ 'Turkish', 'English', 'Regional languages' ],
  currency: 'Turkish lira (TRY)',
  timezone: 'UTC+03:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
