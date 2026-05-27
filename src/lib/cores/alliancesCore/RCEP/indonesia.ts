import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_NEWS_OUTLETS } from './newsOutletsByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { RCEP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { RCEP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { RCEP_RARE_EARTHS } from './rareEarthsByIso'
import { RCEP_BOND_MARKETS } from './bondMarketsByIso'
import { RCEP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

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
  newsOutlets: RCEP_NEWS_OUTLETS['ID'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['ID'],
  mainExportCommodities: RCEP_MAIN_EXPORT_COMMODITIES['ID'],
  mainExportedElements: RCEP_MAIN_EXPORTED_ELEMENTS['ID'],
  rareEarths: RCEP_RARE_EARTHS['ID'],
  stockExchange: 'Indonesia Stock Exchange (IDX)',
  bondMarkets: RCEP_BOND_MARKETS['ID'],
  mainInternationalAirport: RCEP_MAIN_INTERNATIONAL_AIRPORTS['ID'],
}
