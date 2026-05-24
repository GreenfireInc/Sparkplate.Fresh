import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const canada: CommonwealthCountry = {
  name: 'Canada',
  iso3166Alpha2: 'CA',
  commonwealthStatus: 'member',
  capital: 'Ottawa',
  coordinates: { latitude: 45.4215, longitude: -75.6972 },
  independence: '1867-07-01 (Confederation); patriation 1982',
  topMajorCities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa'],
  population: 40000000,
  mainLanguages: ['English', 'French', 'Indigenous languages'],
  currency: 'Canadian dollar (CAD)',
  timezone: 'America/Toronto',
  foundingLeader: 'John A. Macdonald (first Prime Minister)',
  currentLeader: 'Justin Trudeau (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Newton', 'Shakepay', 'Coinbase (eligible provinces)'],
  stablecoin: 'CAD stablecoins limited; USDC/USDT common',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['CA'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['CA'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['CA'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['CA'],
  stockExchange: 'Toronto Stock Exchange (TSX)',
}
