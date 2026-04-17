import type { BeltAndRoadInitiativeCountry } from './types'

export const moldova: BeltAndRoadInitiativeCountry = {
  name: 'Moldova',
  iso3166Alpha2: 'MD',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Chișinău',
  coordinates: { latitude: 47, longitude: 29 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Chișinău', 'Moldova — city 2 (verify)', 'Moldova — city 3 (verify)', 'Moldova — city 4 (verify)', 'Moldova — city 5 (verify)' ] as [string, string, string, string, string],
  population: 2749076,
  mainLanguages: [ 'Romanian', 'English', 'Regional languages' ],
  currency: 'Moldovan leu (MDL)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
