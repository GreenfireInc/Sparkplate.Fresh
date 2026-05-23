import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const indonesia: IoraCountry = {
  name: 'Indonesia',
  iso3166Alpha2: 'ID',
  capital: 'Jakarta (capital transition to Nusantara roadmap — informational)',
  coordinates: { latitude: -6.2088, longitude: 106.8456 },
  independence:
    'Archipelagic sovereignty 1949 recognition; ASEAN economy; eastern Indian Ocean rim; IORA Member Mar 1997 — informational',
  topMajorCities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'],
  population: 279000000,
  mainLanguages: ['Indonesian (Bahasa Indonesia)', 'Javanese', 'Sundanese regional'],
  currency: 'Indonesian rupiah (IDR)',
  timezone: 'Asia/Jakarta',
  foundingLeader: 'Sukarno maritime-national archipelago reference — informational',
  currentLeader: 'President Prabowo Subianto — verify',
  cryptocurrencyExchanges: ['OJK digital-asset licensing evolution — informational'],
  stablecoin: 'IDR payment stacks; OTC USDT — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['ID'],
  newsOutlets: IORA_NEWS_OUTLETS['ID'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['ID'],
  stockExchange: 'Indonesia Stock Exchange (IDX)',
}
