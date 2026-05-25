import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { APEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { APEC_RARE_EARTHS } from './rareEarthsByIso'
import { APEC_BOND_MARKETS } from './bondMarketsByIso'

export const indonesia: ApecCountry = {
  name: 'Indonesia',
  iso3166Alpha2: 'ID',
  capital: 'Jakarta (capital transition Nusantara roadmap — informational)',
  coordinates: { latitude: -6.2088, longitude: 106.8456 },
  independence:
    '1949 recognition archipelagic sovereignty; ASEAN heavy-weight transpacific chokepoint stakeholder APEC economy — informational',
  topMajorCities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'],
  population: 279000000,
  mainLanguages: ['Indonesian (Bahasa Indonesia)', 'Javanese', 'Sundanese regional'],
  currency: 'Indonesian rupiah (IDR)',
  timezone: 'Asia/Jakarta',
  foundingLeader: 'Sukarno nationalist reference — informational',
  currentLeader: 'President Prabowo Subianto — verify',
  cryptocurrencyExchanges: ['OJK digital-asset routes licensing evolution — informational'],
  stablecoin: 'IDR payment rails; OTC USDT — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['ID'],
  newsOutlets: APEC_NEWS_OUTLETS['ID'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['ID'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['ID'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['ID'],
  rareEarths: APEC_RARE_EARTHS['ID'],
  stockExchange: 'Indonesia Stock Exchange (IDX)',
  bondMarkets: APEC_BOND_MARKETS['ID'],
}
