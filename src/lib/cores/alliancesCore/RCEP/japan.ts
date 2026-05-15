import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const japan: RcepCountry = {
  name: 'Japan',
  iso3166Alpha2: 'JP',
  capital: 'Tokyo',
  coordinates: { latitude: 35.6762, longitude: 139.6503 },
  independence:
    'Meiji-state continuity; constitution 1947; RCEP Party (East Asia supply-chain integration 2022 tranche — informational)',
  topMajorCities: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo'],
  population: 124500000,
  mainLanguages: ['Japanese', 'Korean (community)', 'English (education / business)'],
  currency: 'Japanese yen (JPY)',
  timezone: 'Asia/Tokyo',
  foundingLeader: 'Yoshida Shigeru post-war trade-liberalisation reference — informational',
  currentLeader:
    'Emperor Naruhito; Prime Minister — verify (cabinet reshuffle cycles)',
  cryptocurrencyExchanges: ['bitFlyer', 'Coincheck PSAP-registered narratives — informational'],
  stablecoin: 'JPY-stable experiments; Bank of Japan pilots — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['JP'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['JP'],
  stockExchange: 'Tokyo Stock Exchange (Japan Exchange Group)',
}
