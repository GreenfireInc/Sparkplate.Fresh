import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G20_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { G20_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { G20_RARE_EARTHS } from './rareEarthsByIso'
import { G20_BOND_MARKETS } from './bondMarketsByIso'
import { G20_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const china: G20Country = {
  name: 'China',
  iso3166Alpha2: 'CN',
  capital: 'Beijing',
  coordinates: { latitude: 39.9042, longitude: 116.4074 },
  independence:
    '1949-10-01 People\'s Republic of China founded; civilisational continuity; BRICS / G20 founding member (finance track 1999; 2016 Hangzhou leaders summit host) — informational',
  topMajorCities: ['Shanghai', 'Beijing', 'Chongqing', 'Guangzhou', 'Shenzhen'],
  population: 1410000000,
  mainLanguages: ['Standard Chinese (Mandarin / Putonghua)', 'Cantonese / Wu / regional Sinitic', 'English (business)'],
  currency: 'Renminbi (CNY; offshore CNH)',
  timezone: 'Asia/Shanghai',
  foundingLeader:
    'Mao Zedong (PRC founder); Deng Xiaoping (Reform & Opening-Up architect — informational)',
  currentLeader:
    'President Xi Jinping; Premier Li Qiang — verify',
  cryptocurrencyExchanges: ['Mainland exchange trading restricted post-2021; HKVASP regime onshore-adjacent — informational'],
  stablecoin: 'e-CNY (Digital Yuan) PBoC retail CBDC pilots; offshore CNH stablecoin narratives — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['CN'],
  newsOutlets: G20_NEWS_OUTLETS['CN'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['CN'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['CN'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['CN'],
  rareEarths: G20_RARE_EARTHS['CN'],
  stockExchange: 'Shanghai Stock Exchange (SSE) / Shenzhen Stock Exchange (SZSE)',
  bondMarkets: G20_BOND_MARKETS['CN'],
  mainInternationalAirport: G20_MAIN_INTERNATIONAL_AIRPORTS['CN'],
}
