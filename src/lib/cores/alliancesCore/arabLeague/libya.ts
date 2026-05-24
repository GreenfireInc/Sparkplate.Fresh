import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const libya: ArabLeagueCountry = {
  name: 'Libya',
  iso3166Alpha2: 'LY',
  arabLeagueStatus: 'member',
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
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['LY'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['LY'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['LY'],
  stockExchange: 'Libyan Stock Market (limited operations)',
}
