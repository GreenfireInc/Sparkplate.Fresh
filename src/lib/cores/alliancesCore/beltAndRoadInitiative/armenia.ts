import type { BeltAndRoadInitiativeCountry } from './types'

export const armenia: BeltAndRoadInitiativeCountry = {
  name: 'Armenia',
  iso3166Alpha2: 'AM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Yerevan',
  coordinates: { latitude: 40, longitude: 45 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Yerevan', 'Armenia — city 2 (verify)', 'Armenia — city 3 (verify)', 'Armenia — city 4 (verify)', 'Armenia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 3076200,
  mainLanguages: [ 'Armenian', 'English', 'Regional languages' ],
  currency: 'Armenian dram (AMD)',
  timezone: 'UTC+04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
