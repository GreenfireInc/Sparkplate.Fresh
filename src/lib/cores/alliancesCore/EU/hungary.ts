import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const hungary: EuCountry = {
  name: 'Hungary',
  iso3166Alpha2: 'HU',
  capital: 'Budapest',
  coordinates: { latitude: 47.4979, longitude: 19.0402 },
  independence: '1989 democratic transition lineage; EU since 2004-05-01 — informational',
  topMajorCities: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs'],
  population: 9600000,
  mainLanguages: ['Hungarian', 'German (minority)', 'Romani'],
  currency: 'Hungarian forint (HUF)',
  timezone: 'Europe/Budapest',
  foundingLeader: 'Lajos Kossuth historical reference — informational',
  currentLeader: 'President Tamás Sulyok; Prime Minister Viktor Orbán — verify',
  cryptocurrencyExchanges: ['Regional EU onboarding; Hungarian central bank skeptic tone — informational'],
  stablecoin: 'HUF OTC; predominant EUR/USDT rails',
  domesticCourierServices: EU_DOMESTIC_COURIERS['HU'],
  newsOutlets: EU_NEWS_OUTLETS['HU'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['HU'],
  stockExchange: 'Budapest Stock Exchange',
}
