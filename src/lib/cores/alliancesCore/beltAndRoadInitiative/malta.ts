import type { BeltAndRoadInitiativeCountry } from './types'

export const malta: BeltAndRoadInitiativeCountry = {
  name: 'Malta',
  iso3166Alpha2: 'MT',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Valletta',
  coordinates: { latitude: 35.9375, longitude: 14.3754 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Valletta', 'Malta — city 2 (verify)', 'Malta — city 3 (verify)', 'Malta — city 4 (verify)', 'Malta — city 5 (verify)' ] as [string, string, string, string, string],
  population: 574250,
  mainLanguages: [ 'English', 'Maltese', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
