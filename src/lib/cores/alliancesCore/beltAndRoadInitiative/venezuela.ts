import type { BeltAndRoadInitiativeCountry } from './types'

export const venezuela: BeltAndRoadInitiativeCountry = {
  name: 'Venezuela',
  iso3166Alpha2: 'VE',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Caracas',
  coordinates: { latitude: 8, longitude: -66 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Caracas', 'Venezuela — city 2 (verify)', 'Venezuela — city 3 (verify)', 'Venezuela — city 4 (verify)', 'Venezuela — city 5 (verify)' ] as [string, string, string, string, string],
  population: 28517000,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Venezuelan bolívar soberano (VES)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
