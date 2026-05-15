import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const japan: ApecCountry = {
  name: 'Japan',
  iso3166Alpha2: 'JP',
  capital: 'Tokyo',
  coordinates: { latitude: 35.6762, longitude: 139.6503 },
  independence:
    'Post-war constitution 1947; techno-industrial transpacific heavyweight founding APEC host narratives — informational',
  topMajorCities: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo'],
  population: 124500000,
  mainLanguages: ['Japanese', 'Korean community', 'English education / business'],
  currency: 'Japanese yen (JPY)',
  timezone: 'Asia/Tokyo',
  foundingLeader: 'Yoshida Shigeru post-war diplomacy reference — informational',
  currentLeader:
    'Emperor Naruhito; Prime Minister — verify cabinet rotations',
  cryptocurrencyExchanges: ['bitFlyer', 'Coincheck PSAP context — informational'],
  stablecoin: 'JPY digital pilots Bank of Japan — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['JP'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['JP'],
  stockExchange: 'Tokyo Stock Exchange (Japan Exchange Group)',
}
