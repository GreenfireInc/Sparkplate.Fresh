import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const libya: AfricanUnionCountry = {
  name: 'Libya',
  iso3166Alpha2: 'LY',
  africanUnionStatus: 'member',
  capital: 'Tripoli',
  coordinates: { latitude: 32.8872, longitude: 13.1913 },
  independence: '1951-12-24',
  topMajorCities: ['Tripoli', 'Benghazi', 'Misrata', 'Bayda', 'Zawiya'],
  population: 7000000,
  mainLanguages: ['Arabic (Libyan)', 'Berber (Tamazight)', 'Italian (legacy)'],
  currency: 'Libyan dinar (LYD)',
  timezone: 'Africa/Tripoli',
  foundingLeader: 'King Idris I',
  currentLeader: 'Mohamed al-Menfi (Chair, Presidential Council — GNU Tripoli)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC; fragmented regulatory environment'],
  stablecoin: 'USDT informal; banking fragmentation',
  domesticCourierServices: AU_DOMESTIC_COURIERS['LY'],
  newsOutlets: AU_NEWS_OUTLETS['LY'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['LY'],
  stockExchange: 'Libyan Stock Market (limited operations)',
}
