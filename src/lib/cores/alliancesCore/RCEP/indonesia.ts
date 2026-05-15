import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const indonesia: RcepCountry = {
  name: 'Indonesia',
  iso3166Alpha2: 'ID',
  capital: 'Jakarta (capital transition to Nusantara roadmap — informational)',
  coordinates: { latitude: -6.2088, longitude: 106.8456 },
  independence:
    '1945 independence proclaimed; ASEAN anchor; RCEP Party (2022-01-01 ratification wave — informational)',
  topMajorCities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'],
  population: 279000000,
  mainLanguages: ['Indonesian (Bahasa Indonesia)', 'Javanese', 'Sundanese regional'],
  currency: 'Indonesian rupiah (IDR)',
  timezone: 'Asia/Jakarta',
  foundingLeader: 'Sukarno proclamation reference — informational',
  currentLeader: 'President Prabowo Subianto — verify',
  cryptocurrencyExchanges: ['OJK supervised digital-asset routes (licensing evolution — informational)'],
  stablecoin: 'IDR payment pilots; OTC USDT — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['ID'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['ID'],
  stockExchange: 'Indonesia Stock Exchange (IDX)',
}
