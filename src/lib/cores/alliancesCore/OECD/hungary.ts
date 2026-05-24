import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const hungary: OecdCountry = {
  name: 'Hungary',
  iso3166Alpha2: 'HU',
  capital: 'Budapest',
  coordinates: { latitude: 47.4979, longitude: 19.0402 },
  independence:
    '1989 democratic transition lineage; EU since 2004-05-01; OECD member since May 1996 — informational',
  topMajorCities: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs'],
  population: 9600000,
  mainLanguages: ['Hungarian', 'German (minority)', 'Romani'],
  currency: 'Hungarian forint (HUF)',
  timezone: 'Europe/Budapest',
  foundingLeader: 'Lajos Kossuth nineteenth-century liberation reference — informational',
  currentLeader: 'President Tamás Sulyok; Prime Minister Viktor Orbán — verify',
  cryptocurrencyExchanges: ['Regional EU onboarding; Magyar Nemzeti Bank cautious narratives — informational'],
  stablecoin: 'HUF OTC; EUR/USDT rails common — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['HU'],
  newsOutlets: OECD_NEWS_OUTLETS['HU'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['HU'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['HU'],
  stockExchange: 'Budapest Stock Exchange',
}
