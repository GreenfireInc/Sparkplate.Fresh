import type { IgadCountry } from './types'
import { IGAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IGAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { IGAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const djibouti: IgadCountry = {
  name: 'Djibouti',
  iso3166Alpha2: 'DJ',
  capital: 'Djibouti',
  coordinates: { latitude: 11.8251, longitude: 42.5903 },
  independence:
    '1977 independence from France; IGADD founding state Jan 1986; IGAD treaty host / Secretariat geography — informational',
  topMajorCities: ['Djibouti', 'Ali Sabieh', 'Dikhil', 'Tadjoura', 'Obock'],
  population: 1100000,
  mainLanguages: ['French', 'Arabic', 'Somali / Afar'],
  currency: 'Djiboutian franc (DJF; USD-pegged de facto Bretton Woods-type anchor)',
  timezone: 'Africa/Djibouti',
  foundingLeader: 'President Hassan Gouled Aptidon (Djibouti-era IGADD convening continuity — informational)',
  currentLeader: 'President Ismail Omar Guelleh — verify',
  cryptocurrencyExchanges: ['Regional remittance OTC; DFS regulation evolution — informational'],
  stablecoin: 'USD-stable informal settlement (port/finance-city economy — informational)',
  domesticCourierServices: IGAD_DOMESTIC_COURIERS['DJ'],
  newsOutlets: IGAD_NEWS_OUTLETS['DJ'],
  notableUniversities: IGAD_NOTABLE_UNIVERSITIES['DJ'],
  stockExchange: 'Djibouti Stock Exchange (thin liquidity; sovereign development narrative — informational)',
}
