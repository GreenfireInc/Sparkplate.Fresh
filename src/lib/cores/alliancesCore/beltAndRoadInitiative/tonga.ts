import type { BeltAndRoadInitiativeCountry } from './types'

export const tonga: BeltAndRoadInitiativeCountry = {
  name: 'Tonga',
  iso3166Alpha2: 'TO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Nuku\'alofa',
  coordinates: { latitude: -20, longitude: -175 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Nuku\'alofa', 'Tonga — city 2 (verify)', 'Tonga — city 3 (verify)', 'Tonga — city 4 (verify)', 'Tonga — city 5 (verify)' ] as [string, string, string, string, string],
  population: 100179,
  mainLanguages: [ 'English', 'Tongan', 'Regional languages' ],
  currency: 'Tongan paʻanga (TOP)',
  timezone: 'UTC+13:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
