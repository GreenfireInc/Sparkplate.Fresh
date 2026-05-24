import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_NEWS_OUTLETS } from './newsOutletsByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { RCEP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const australia: RcepCountry = {
  name: 'Australia',
  iso3166Alpha2: 'AU',
  capital: 'Canberra',
  coordinates: { latitude: -35.2809, longitude: 149.13 },
  independence:
    '1901 Commonwealth federation; RCEP Party (signed Nov 2020; entry into force tranche from 2022-01-02 AU ratification context — informational)',
  topMajorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  population: 26700000,
  mainLanguages: ['English', 'Mandarin (community)', 'Arabic (community)'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Australia/Sydney',
  foundingLeader: 'Federation founders; post-war multilateral trade openness reference — informational',
  currentLeader: 'Prime Minister Anthony Albanese — verify',
  cryptocurrencyExchanges: ['Independent Reserve', 'BTC Markets', 'CoinSpot ASIC context — informational'],
  stablecoin: 'AUD stablecoins; Treasury/ASIC evolution — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['AU'],
  newsOutlets: RCEP_NEWS_OUTLETS['AU'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['AU'],
  mainExportCommodities: RCEP_MAIN_EXPORT_COMMODITIES['AU'],
  stockExchange: 'Australian Securities Exchange (ASX)',
}
