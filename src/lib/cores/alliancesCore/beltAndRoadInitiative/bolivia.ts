import type { BeltAndRoadInitiativeCountry } from './types'

export const bolivia: BeltAndRoadInitiativeCountry = {
  name: 'Bolivia',
  iso3166Alpha2: 'BO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Sucre',
  coordinates: { latitude: -17, longitude: -65 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Sucre', 'Bolivia — city 2 (verify)', 'Bolivia — city 3 (verify)', 'Bolivia — city 4 (verify)', 'Bolivia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 11365333,
  mainLanguages: [ 'Aymara', 'Guaraní', 'Quechua' ],
  currency: 'Bolivian boliviano (BOB)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
