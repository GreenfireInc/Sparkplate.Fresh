import type { BeltAndRoadInitiativeCountry } from './types'

export const dominicanRepublic: BeltAndRoadInitiativeCountry = {
  name: 'Dominican Republic',
  iso3166Alpha2: 'DO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Santo Domingo',
  coordinates: { latitude: 19, longitude: -70.66666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Santo Domingo', 'Dominican Republic — city 2 (verify)', 'Dominican Republic — city 3 (verify)', 'Dominican Republic — city 4 (verify)', 'Dominican Republic — city 5 (verify)' ] as [string, string, string, string, string],
  population: 10771504,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Dominican peso (DOP)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
