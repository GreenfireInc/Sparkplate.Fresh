import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const croatia: EuCountry = {
  name: 'Croatia',
  iso3166Alpha2: 'HR',
  capital: 'Zagreb',
  coordinates: { latitude: 45.815, longitude: 15.9819 },
  independence: '1991 Yugoslav succession; EU member since 2013-07-01; Euro from 2023 — informational',
  topMajorCities: ['Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar'],
  population: 3900000,
  mainLanguages: ['Croatian', 'Italian (minority regions)', 'Serbian (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Zagreb',
  foundingLeader: 'Franjo Tuđman (first President reference)',
  currentLeader: 'President / Prime Minister — verify',
  cryptocurrencyExchanges: ['EU MiCA-regulated onboarding; Binance EUR'],
  stablecoin: 'EUR stablecoins; retail rules MiCA — verify',
  domesticCourierServices: EU_DOMESTIC_COURIERS['HR'],
  newsOutlets: EU_NEWS_OUTLETS['HR'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['HR'],
  stockExchange: 'Zagreb Stock Exchange',
}
