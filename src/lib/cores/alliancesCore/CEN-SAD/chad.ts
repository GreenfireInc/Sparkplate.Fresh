import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const chad: CensadCountry = {
  name: 'Chad',
  iso3166Alpha2: 'TD',
  capital: "N'Djamena",
  coordinates: { latitude: 12.1348, longitude: 15.0557 },
  independence:
    '1960-08-11 (multi-phase transitional governance recent military eras — verify)',
  topMajorCities: ["N'Djamena", 'Moundou', 'Sarh', 'Abéché', 'Doba'],
  population: 18600000,
  mainLanguages: ['French', 'Arabic', 'Sara languages'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Ndjamena',
  foundingLeader: 'François Tombalbaye (first president)',
  currentLeader: 'Mahamat Déby Itno (Transitional Military Council era) — verify',
  cryptocurrencyExchanges: ['Regional OTC'],
  stablecoin: 'USDT/USDC informal where present',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['TD'],
  newsOutlets: CENSAD_NEWS_OUTLETS['TD'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['TD'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['TD'],
  stockExchange: 'No dedicated national equity market',
}
