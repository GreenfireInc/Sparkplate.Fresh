import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const albania: NatoCountry = {
  name: 'Albania',
  iso3166Alpha2: 'AL',
  capital: 'Tirana',
  coordinates: { latitude: 41.3275, longitude: 19.8187 },
  independence:
    'Modern republic continuity post-1991 transition; EU candidate trajectory; NATO Ally since Apr 2009 — informational',
  topMajorCities: ['Tirana', 'Durrës', 'Vlorë', 'Elbasan', 'Shkodër'],
  population: 2790000,
  mainLanguages: ['Albanian', 'Greek (minority regions)', 'Italian / English tourist-business'],
  currency: 'Albanian lek (ALL); euro informal pricing common — informational',
  timezone: 'Europe/Tirane',
  foundingLeader: 'Ismail Qemali independence reference; Enver Hoxha-era contrast — informational',
  currentLeader: 'President Bajram Begaj — verify; Prime Minister Edi Rama — verify',
  cryptocurrencyExchanges: ['Regional EU brokers onboarding; OTC informal — informational'],
  stablecoin: 'EUR-USD informal rails predominant — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['AL'],
  newsOutlets: NATO_NEWS_OUTLETS['AL'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['AL'],
  stockExchange: 'Tirana Stock Exchange (thin listings — informational)',
}
