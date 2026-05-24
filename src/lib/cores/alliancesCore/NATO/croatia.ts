import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const croatia: NatoCountry = {
  name: 'Croatia',
  iso3166Alpha2: 'HR',
  capital: 'Zagreb',
  coordinates: { latitude: 45.815, longitude: 15.9819 },
  independence:
    '1991 Yugoslav succession; EU since 2013; Euro from 2023; NATO Ally since Apr 2009 — informational',
  topMajorCities: ['Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar'],
  population: 3900000,
  mainLanguages: ['Croatian', 'Italian (minority regions)', 'Serbian (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Zagreb',
  foundingLeader: 'Franjo Tuđman reference — informational',
  currentLeader: 'President / Prime Minister — verify',
  cryptocurrencyExchanges: ['EU MiCA-regulated onboarding; Binance EUR context'],
  stablecoin: 'EUR stablecoins MiCA-aligned — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['HR'],
  newsOutlets: NATO_NEWS_OUTLETS['HR'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['HR'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['HR'],
  stockExchange: 'Zagreb Stock Exchange',
}
