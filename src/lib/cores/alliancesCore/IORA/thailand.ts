import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const thailand: IoraCountry = {
  name: 'Thailand',
  iso3166Alpha2: 'TH',
  capital: 'Bangkok',
  coordinates: { latitude: 13.7563, longitude: 100.5018 },
  independence:
    'Constitutional monarchy continuity; Andaman Sea / eastern Indian Ocean shipping lane stake; ASEAN economy; IORA member — informational',
  topMajorCities: ['Bangkok', 'Chiang Mai', 'Pattaya', 'Hat Yai', 'Nakhon Ratchasima'],
  population: 69800000,
  mainLanguages: ['Thai', 'Isan / Lao varieties', 'English (tourism / business)'],
  currency: 'Thai baht (THB)',
  timezone: 'Asia/Bangkok',
  foundingLeader: 'Bhumibol-era modernization reference — informational',
  currentLeader: 'King Rama X; Prime Minister — verify parliamentary churn',
  cryptocurrencyExchanges: ['SEC Thai digital-asset licences evolution — informational'],
  stablecoin: 'BOT sandbox CBDC pilots — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['TH'],
  newsOutlets: IORA_NEWS_OUTLETS['TH'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['TH'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['TH'],
  stockExchange: 'Stock Exchange of Thailand (SET)',
}
