import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const australia: IoraCountry = {
  name: 'Australia',
  iso3166Alpha2: 'AU',
  capital: 'Canberra',
  coordinates: { latitude: -35.2809, longitude: 149.13 },
  independence:
    '1901 Commonwealth federation; Indian Ocean strategic rim economy; IORA member since formative Mar 1997 Charter era — informational',
  topMajorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  population: 26700000,
  mainLanguages: ['English', 'Mandarin (community)', 'Arabic (community)'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Australia/Sydney',
  foundingLeader: 'Regional Indian Ocean Dialogue host reference Perth-era — informational',
  currentLeader: 'Prime Minister Anthony Albanese — verify',
  cryptocurrencyExchanges: ['Independent Reserve', 'BTC Markets', 'ASIC-regulated onboarding — informational'],
  stablecoin: 'AUD stablecoins; Treasury supervisory evolution — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['AU'],
  newsOutlets: IORA_NEWS_OUTLETS['AU'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['AU'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['AU'],
  stockExchange: 'Australian Securities Exchange (ASX)',
}
