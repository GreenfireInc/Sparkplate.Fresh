import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_NEWS_OUTLETS } from './newsOutletsByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ASEAN_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const thailand: AseanCountry = {
  name: 'Thailand',
  iso3166Alpha2: 'TH',
  capital: 'Bangkok',
  coordinates: { latitude: 13.7563, longitude: 100.5018 },
  independence:
    '1932 constitutional monarchy continuity lineage; ASEAN founding Bangkok Declaration host Aug 1967 — informational',
  topMajorCities: ['Bangkok', 'Chiang Mai', 'Pattaya', 'Hat Yai', 'Nakhon Ratchasima'],
  population: 69800000,
  mainLanguages: ['Thai', 'Isan / Lao tonal varieties', 'English (tourism / business)'],
  currency: 'Thai baht (THB)',
  timezone: 'Asia/Bangkok',
  foundingLeader: 'Marshal Sarit Thanarat / modernization reference — informational',
  currentLeader: 'King Maha Vajiralongkorn; Prime Minister — verify parliamentary cycle',
  cryptocurrencyExchanges: ['SEC Thai digital-asset operator licences (evolving — informational)'],
  stablecoin: 'BOT CBDC sandbox; THB OTC pairs — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['TH'],
  newsOutlets: ASEAN_NEWS_OUTLETS['TH'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['TH'],
  mainExportCommodities: ASEAN_MAIN_EXPORT_COMMODITIES['TH'],
  stockExchange: 'Stock Exchange of Thailand SET Bangkok',
}
