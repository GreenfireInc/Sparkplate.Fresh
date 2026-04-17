import type { BeltAndRoadInitiativeCountry } from './types'

export const afghanistan: BeltAndRoadInitiativeCountry = {
  name: 'Afghanistan',
  iso3166Alpha2: 'AF',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kabul',
  coordinates: { latitude: 33, longitude: 65 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Kabul', 'Afghanistan — city 2 (verify)', 'Afghanistan — city 3 (verify)', 'Afghanistan — city 4 (verify)', 'Afghanistan — city 5 (verify)' ] as [string, string, string, string, string],
  population: 43844000,
  mainLanguages: [ 'Dari', 'Pashto', 'Turkmen' ],
  currency: 'Afghan afghani (AFN)',
  timezone: 'UTC+04:30',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
