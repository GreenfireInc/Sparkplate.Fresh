import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_NEWS_OUTLETS } from './newsOutletsByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ASEAN_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const indonesia: AseanCountry = {
  name: 'Indonesia',
  iso3166Alpha2: 'ID',
  capital: 'Jakarta (ASEAN Secretariat host; Nusantara capital transition roadmap — informational)',
  coordinates: { latitude: -6.2088, longitude: 106.8456 },
  independence:
    '1945 proclaimed independence Sukarno–Hatta; recognised 1949; ASEAN founding member Aug 1967 — informational',
  topMajorCities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'],
  population: 279000000,
  mainLanguages: ['Indonesian (Bahasa Indonesia)', 'Javanese', 'Sundanese regional'],
  currency: 'Indonesian rupiah (IDR)',
  timezone: 'Asia/Jakarta',
  foundingLeader: 'Sukarno (Bandung Conference / non-aligned stature — informational)',
  currentLeader: 'President Prabowo Subianto — verify',
  cryptocurrencyExchanges: ['OJK-supervised digital-asset routes (CFX licensing evolution — informational)'],
  stablecoin: 'IDR digital payment pilots; USDT OTC informal — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['ID'],
  newsOutlets: ASEAN_NEWS_OUTLETS['ID'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['ID'],
  mainExportCommodities: ASEAN_MAIN_EXPORT_COMMODITIES['ID'],
  stockExchange: 'Indonesia Stock Exchange (IDX Jakarta)',
}
