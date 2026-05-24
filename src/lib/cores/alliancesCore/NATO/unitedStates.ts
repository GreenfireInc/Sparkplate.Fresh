import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const unitedStates: NatoCountry = {
  name: 'United States',
  iso3166Alpha2: 'US',
  capital: 'Washington, D.C.',
  coordinates: { latitude: 38.9072, longitude: -77.0369 },
  independence:
    '1776 United States lineage; indispensable NATO Ally founding depositary Washington Treaty 1949-04-04 — informational',
  topMajorCities: ['New York City', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  population: 342000000,
  mainLanguages: ['English', 'Spanish', 'Chinese (community)'],
  currency: 'United States dollar (USD)',
  timezone: 'America/New_York',
  foundingLeader:
    'Dean Acheson / Truman-era Article 5 guarantor framing — informational',
  currentLeader: 'President / Vice-President — verify (inaugural cycle)',
  cryptocurrencyExchanges: ['Coinbase', 'Kraken', 'Gemini MSB patchwork — informational'],
  stablecoin: 'USDT/USDC USD issuance legislative evolution — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['US'],
  newsOutlets: NATO_NEWS_OUTLETS['US'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['US'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['US'],
  stockExchange: 'NYSE / Nasdaq consolidated US equities',
}
