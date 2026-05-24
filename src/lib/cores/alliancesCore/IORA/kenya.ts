import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const kenya: IoraCountry = {
  name: 'Kenya',
  iso3166Alpha2: 'KE',
  capital: 'Nairobi',
  coordinates: { latitude: -1.2921, longitude: 36.8219 },
  independence:
    '1963 independence from UK; western Indian Ocean / Mombasa port gateway economy; IORA member — informational',
  topMajorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  population: 56000000,
  mainLanguages: ['Swahili', 'English', 'Kikuyu / Luhya regional'],
  currency: 'Kenyan shilling (KES)',
  timezone: 'Africa/Nairobi',
  foundingLeader: 'Jomo Kenyatta independence reference — informational',
  currentLeader: 'President William Ruto — verify',
  cryptocurrencyExchanges: ['Yellow Card regional; CMA onboarding narratives — informational'],
  stablecoin: 'KES informal USDT overlays — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['KE'],
  newsOutlets: IORA_NEWS_OUTLETS['KE'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['KE'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['KE'],
  stockExchange: 'Nairobi Securities Exchange (NSE)',
}
