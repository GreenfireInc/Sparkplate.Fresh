import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const czechRepublic: OecdCountry = {
  name: 'Czech Republic',
  iso3166Alpha2: 'CZ',
  capital: 'Prague',
  coordinates: { latitude: 50.0755, longitude: 14.4378 },
  independence:
    '1993 Velvet Divorce Czechia lineage; EU since 2004-05-01; OECD member since Dec 1995 — informational',
  topMajorCities: ['Prague', 'Brno', 'Ostrava', 'Plzeň', 'Liberec'],
  population: 10900000,
  mainLanguages: ['Czech', 'Slovak (minority)', 'Romani'],
  currency: 'Czech koruna (CZK)',
  timezone: 'Europe/Prague',
  foundingLeader: 'Václav Havel (first president ČR)',
  currentLeader: 'President Petr Pavel; Prime Minister — verify',
  cryptocurrencyExchanges: ['European brokers; cautious Czech National Bank messaging — informational'],
  stablecoin: 'CZK OTC; EUR-stable pairs dominant — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['CZ'],
  newsOutlets: OECD_NEWS_OUTLETS['CZ'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['CZ'],
  stockExchange: 'Prague Stock Exchange (PX)',
}
