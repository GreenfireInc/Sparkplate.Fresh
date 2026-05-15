import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const libya: CensadCountry = {
  name: 'Libya',
  iso3166Alpha2: 'LY',
  capital: 'Tripoli',
  coordinates: { latitude: 32.8872, longitude: 13.1913 },
  independence: '1951-12-24 (United Kingdom of Libya)',
  topMajorCities: ['Tripoli', 'Benghazi', 'Misrata', 'Al Bayda', 'Sabha'],
  population: 6940000,
  mainLanguages: ['Arabic', 'Berber languages (Tamazight)', 'Italian (small community)'],
  currency: 'Libyan dinar (LYD)',
  timezone: 'Africa/Tripoli',
  foundingLeader: 'King Idris I (monarchy era)',
  currentLeader: 'Government of National Unity / divided authorities — verify seat',
  cryptocurrencyExchanges: ['Informal OTC under sanctions context'],
  stablecoin: 'Informal USD/USDT',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['LY'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['LY'],
  stockExchange: 'Libyan Stock Exchange (limited operations — verify)',
}
