import type { EccasCountry } from './types'
import { ECCAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECCAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECCAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECCAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const chad: EccasCountry = {
  name: 'Chad',
  iso3166Alpha2: 'TD',
  capital: "N'Djamena",
  coordinates: { latitude: 12.1348, longitude: 15.0557 },
  independence: '1960-08-11',
  topMajorCities: ["N'Djamena", 'Moundou', 'Sarh', 'Abéché', 'Kélo'],
  population: 19500000,
  mainLanguages: ['French', 'Arabic', 'Sara languages'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Ndjamena',
  foundingLeader: 'François Tombalbaye (first President)',
  currentLeader: 'Mahamat Déby transitional presidency — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card (regional)', 'OTC'],
  stablecoin: 'USDT informal; XAF peg via BEAC',
  domesticCourierServices: ECCAS_DOMESTIC_COURIERS['TD'],
  newsOutlets: ECCAS_NEWS_OUTLETS['TD'],
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['TD'],
  mainExportCommodities: ECCAS_MAIN_EXPORT_COMMODITIES['TD'],
  stockExchange: 'CEMAC regional capital markets (thin Chad footprint)',
}
