import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const djibouti: CensadCountry = {
  name: 'Djibouti',
  iso3166Alpha2: 'DJ',
  capital: 'Djibouti City',
  coordinates: { latitude: 11.5886, longitude: 43.1459 },
  independence: '1977-06-27 (from France)',
  topMajorCities: ['Djibouti City', 'Ali Sabieh', 'Tadjoura', 'Obock', 'Dikhil'],
  population: 1140000,
  mainLanguages: ['French', 'Arabic', 'Somali'],
  currency: 'Djiboutian franc (DJF), pegged to USD',
  timezone: 'Africa/Djibouti',
  foundingLeader: 'Hassan Gouled Aptidon (first president)',
  currentLeader: 'President Ismail Omar Guelleh — verify',
  cryptocurrencyExchanges: ['Limited formal; regional OTC'],
  stablecoin: 'DJF peg; USDT/USDC informal',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['DJ'],
  newsOutlets: CENSAD_NEWS_OUTLETS['DJ'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['DJ'],
  stockExchange: 'No major national stock exchange',
}
