import type { BeltAndRoadInitiativeCountry } from './types'

export const sudan: BeltAndRoadInitiativeCountry = {
  name: 'Sudan',
  iso3166Alpha2: 'SD',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Khartoum',
  coordinates: { latitude: 15.5007, longitude: 32.5599 },
  independence: '1956-01-01',
  topMajorCities: ['Omdurman', 'Khartoum', 'Khartoum North', 'Port Sudan', 'Kassala'] as [string, string, string, string, string],
  population: 51662000,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Sudanese pound (SDG)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Ismail al-Azhari',
  currentLeader: 'Abdel Fattah al-Burhan (General; Chair, Sovereignty Council)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Informal P2P amid conflict'],
  stablecoin: 'USDT informal; banking disruption during conflict',
  stockExchange: 'Khartoum Stock Exchange (operations disrupted)',
}
