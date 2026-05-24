import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_NEWS_OUTLETS } from './newsOutletsByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { RCEP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const china: RcepCountry = {
  name: 'China',
  iso3166Alpha2: 'CN',
  capital: 'Beijing',
  coordinates: { latitude: 39.9042, longitude: 116.4074 },
  independence:
    '1949 PRC continuity; reform-and-opening economy; RCEP Party (mega-FDI / rules-of-origin hub post-2022 — informational)',
  topMajorCities: ['Shanghai', 'Beijing', 'Shenzhen', 'Guangzhou', 'Chengdu'],
  population: 1410000000,
  mainLanguages: ['Standard Chinese (Mandarin)', 'Cantonese / regional Sinitic', 'English (business / education)'],
  currency: 'Renminbi yuan (CNY onshore; CNH offshore conventions — informational)',
  timezone: 'Asia/Shanghai',
  foundingLeader:
    'Mao Zedong state-formation reference; Deng Xiaoping reform reference — informational',
  currentLeader:
    'President Xi Jinping; Premier — verify (National People\'s Congress cycles)',
  cryptocurrencyExchanges: ['Onshore trading prohibited; Hong Kong SAR adjacent venues — informational'],
  stablecoin: 'e-CNY pilot; offshore USDT OTC narratives — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['CN'],
  newsOutlets: RCEP_NEWS_OUTLETS['CN'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['CN'],
  mainExportCommodities: RCEP_MAIN_EXPORT_COMMODITIES['CN'],
  stockExchange:
    'Shanghai Stock Exchange; Shenzhen Stock Exchange; Beijing Stock Exchange context — informational',
}
