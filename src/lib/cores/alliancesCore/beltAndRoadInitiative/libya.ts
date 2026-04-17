import type { BeltAndRoadInitiativeCountry } from './types'

export const libya: BeltAndRoadInitiativeCountry = {
  name: 'Libya',
  iso3166Alpha2: 'LY',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Tripoli',
  coordinates: { latitude: 32.8872, longitude: 13.1913 },
  independence: '1951-12-24',
  topMajorCities: ['Tripoli', 'Benghazi', 'Misrata', 'Bayda', 'Zawiya'] as [string, string, string, string, string],
  population: 7459000,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Libyan dinar (LYD)',
  timezone: 'UTC+01:00',
  foundingLeader: 'King Idris I',
  currentLeader: 'Mohamed al-Menfi (Chair, Presidential Council — GNU Tripoli)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC; fragmented regulatory environment'],
  stablecoin: 'USDT informal; banking fragmentation',
  stockExchange: 'Libyan Stock Market (limited operations)',
}
