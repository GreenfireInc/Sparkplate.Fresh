import type { BeltAndRoadInitiativeCountry } from './types'

export const costaRica: BeltAndRoadInitiativeCountry = {
  name: 'Costa Rica',
  iso3166Alpha2: 'CR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'San José',
  coordinates: { latitude: 10, longitude: -84 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'San José', 'Costa Rica — city 2 (verify)', 'Costa Rica — city 3 (verify)', 'Costa Rica — city 4 (verify)', 'Costa Rica — city 5 (verify)' ] as [string, string, string, string, string],
  population: 5309625,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Costa Rican colón (CRC)',
  timezone: 'UTC-06:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
