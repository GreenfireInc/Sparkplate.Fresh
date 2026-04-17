import type { BeltAndRoadInitiativeCountry } from './types'

export const panama: BeltAndRoadInitiativeCountry = {
  name: 'Panama',
  iso3166Alpha2: 'PA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Panama City',
  coordinates: { latitude: 9, longitude: -80 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Panama City', 'Panama — city 2 (verify)', 'Panama — city 3 (verify)', 'Panama — city 4 (verify)', 'Panama — city 5 (verify)' ] as [string, string, string, string, string],
  population: 4064780,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Panamanian balboa (PAB)',
  timezone: 'UTC-05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
