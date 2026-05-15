import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const japan: OecdCountry = {
  name: 'Japan',
  iso3166Alpha2: 'JP',
  capital: 'Tokyo',
  coordinates: { latitude: 35.6762, longitude: 139.6503 },
  independence:
    'Meiji-state continuity; constitution 1947; OECD Asian anchor member since Apr 1964 — informational',
  topMajorCities: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo'],
  population: 124500000,
  mainLanguages: ['Japanese', 'Korean (community)', 'English (education / business)'],
  currency: 'Japanese yen (JPY)',
  timezone: 'Asia/Tokyo',
  foundingLeader:
    'Yoshida Shigeru post-war economic diplomacy reference — informational',
  currentLeader:
    'Emperor Naruhito; Prime Minister — verify (LDP/coalition cabinet cycles)',
  cryptocurrencyExchanges: ['bitFlyer', 'Coincheck / PSAP-registered narratives — informational'],
  stablecoin: 'JPY-linked experiments; Bank of Japan CBDC pilots — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['JP'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['JP'],
  stockExchange: 'Tokyo Stock Exchange (Japan Exchange Group)',
}
