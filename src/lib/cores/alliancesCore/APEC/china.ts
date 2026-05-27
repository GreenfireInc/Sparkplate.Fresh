import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { APEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { APEC_RARE_EARTHS } from './rareEarthsByIso'
import { APEC_BOND_MARKETS } from './bondMarketsByIso'
import { APEC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

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
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['CN'],
  rareEarths: APEC_RARE_EARTHS['CN'],
  stockExchange:
    'Shanghai Shenzhen Beijing stock exchanges aggregated context — informational',
  bondMarkets: APEC_BOND_MARKETS['CN'],
  mainInternationalAirport: APEC_MAIN_INTERNATIONAL_AIRPORTS['CN'],
}
