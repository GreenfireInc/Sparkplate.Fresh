import type { BeltAndRoadInitiativeCountry } from './types'

export const kiribati: BeltAndRoadInitiativeCountry = {
  name: 'Kiribati',
  iso3166Alpha2: 'KI',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'South Tarawa',
  coordinates: { latitude: 1.41666666, longitude: 173 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'South Tarawa', 'Kiribati — city 2 (verify)', 'Kiribati — city 3 (verify)', 'Kiribati — city 4 (verify)', 'Kiribati — city 5 (verify)' ] as [string, string, string, string, string],
  population: 120740,
  mainLanguages: [ 'English', 'Gilbertese', 'Regional languages' ],
  currency: 'Australian dollar (AUD)',
  timezone: 'UTC+12:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
