import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const china: ApecCountry = {
  name: 'China',
  iso3166Alpha2: 'CN',
  capital: 'Beijing',
  coordinates: { latitude: 39.9042, longitude: 116.4074 },
  independence:
    '1949 PRC continuity; world-factory transpacific linkage; heavyweight APEC economy — informational',
  topMajorCities: ['Shanghai', 'Beijing', 'Shenzhen', 'Guangzhou', 'Chengdu'],
  population: 1410000000,
  mainLanguages: ['Standard Chinese (Mandarin)', 'Cantonese / regional', 'English (education / business)'],
  currency: 'Renminbi yuan (CNY onshore; CNH offshore — informational)',
  timezone: 'Asia/Shanghai',
  foundingLeader:
    'Deng Xiaoping opening reference — informational',
  currentLeader:
    'President Xi Jinping; Premier — verify NPC cycles',
  cryptocurrencyExchanges: ['Onshore retail crypto prohibited; Hong Kong SAR-adjacent — informational'],
  stablecoin: 'e-CNY pilot — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['CN'],
  newsOutlets: APEC_NEWS_OUTLETS['CN'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['CN'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['CN'],
  stockExchange:
    'Shanghai Shenzhen Beijing stock exchanges aggregated context — informational',
}
