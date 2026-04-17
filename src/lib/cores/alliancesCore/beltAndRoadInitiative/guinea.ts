import type { BeltAndRoadInitiativeCountry } from './types'

export const guinea: BeltAndRoadInitiativeCountry = {
  name: 'Guinea',
  iso3166Alpha2: 'GN',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Conakry',
  coordinates: { latitude: 9.6412, longitude: -13.5784 },
  independence: '1958-10-02',
  topMajorCities: ['Conakry', 'Nzérékoré', 'Kankan', 'Kindia', 'Labé'] as [string, string, string, string, string],
  population: 14363931,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'Guinean franc (GNF)',
  timezone: 'UTC',
  foundingLeader: 'Ahmed Sékou Touré',
  currentLeader: 'Mamady Doumbouya (Colonel; transitional leadership)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card (regional)', 'OTC'],
  stablecoin: 'USDT informal; no GNF stablecoin',
  stockExchange: 'No major national exchange; informal OTC and regional brokers',
}
