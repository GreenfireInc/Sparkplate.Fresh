import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const australia: ApecCountry = {
  name: 'Australia',
  iso3166Alpha2: 'AU',
  capital: 'Canberra',
  coordinates: { latitude: -35.2809, longitude: 149.13 },
  independence:
    '1901 Commonwealth federation; APEC inaugural host economy Nov 1989 ministerial lineage — informational',
  topMajorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  population: 26700000,
  mainLanguages: ['English', 'Mandarin (community)', 'Arabic (community)'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Australia/Sydney',
  foundingLeader:
    'Bob Hawke-era Asia-Pacific openness reference — informational',
  currentLeader: 'Prime Minister Anthony Albanese — verify',
  cryptocurrencyExchanges: ['Independent Reserve', 'BTC Markets', 'ASIC onboarding — informational'],
  stablecoin: 'AUD stablecoins supervisory evolution — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['AU'],
  newsOutlets: APEC_NEWS_OUTLETS['AU'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['AU'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['AU'],
  stockExchange: 'Australian Securities Exchange (ASX)',
}
