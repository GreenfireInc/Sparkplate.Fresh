import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_NEWS_OUTLETS } from './newsOutletsByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { RCEP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const brunei: RcepCountry = {
  name: 'Brunei',
  iso3166Alpha2: 'BN',
  capital: 'Bandar Seri Begawan',
  coordinates: { latitude: 4.9031, longitude: 114.9398 },
  independence:
    '1984 UN member independence; ASEAN continuity; RCEP Party (2020 signature; in-force first wave 2022 — informational)',
  topMajorCities: ['Bandar Seri Begawan', 'Kuala Belait', 'Seria', 'Tutong', 'Bangar'],
  population: 460000,
  mainLanguages: ['Malay', 'English', 'Chinese dialects (community)'],
  currency: 'Brunei dollar (BND); Singapore dollar parallel circulation band — informational',
  timezone: 'Asia/Brunei',
  foundingLeader: 'Sultan Hassanal Bolkiah modernisation reference — informational',
  currentLeader:
    'Sultan Hassanal Bolkiah; Crown Prince Prince Al-Muhtadee Billah — verify',
  cryptocurrencyExchanges: ['Autoriti Monetari Brunei cautious; regional OTC — informational'],
  stablecoin: 'BND monetary board; informal USD-stable — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['BN'],
  newsOutlets: RCEP_NEWS_OUTLETS['BN'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['BN'],
  mainExportCommodities: RCEP_MAIN_EXPORT_COMMODITIES['BN'],
  stockExchange: 'No dedicated national exchange consolidated; regional ECM context — informational',
}
