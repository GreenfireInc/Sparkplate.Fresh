import type { BeltAndRoadInitiativeCountry } from './types'

export const tunisia: BeltAndRoadInitiativeCountry = {
  name: 'Tunisia',
  iso3166Alpha2: 'TN',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Tunis',
  coordinates: { latitude: 36.8065, longitude: 10.1815 },
  independence: '1956-03-20',
  topMajorCities: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte'] as [string, string, string, string, string],
  population: 11972169,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Tunisian dinar (TND)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Habib Bourguiba',
  currentLeader: 'Kais Saied (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional brokers', 'OTC'],
  stablecoin: 'USDT informal; e-dinar discussions',
  stockExchange: 'Bourse de Tunis',
}
