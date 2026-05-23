import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const poland: OecdCountry = {
  name: 'Poland',
  iso3166Alpha2: 'PL',
  capital: 'Warsaw',
  coordinates: { latitude: 52.2297, longitude: 21.0122 },
  independence:
    '1989 democratic transition lineage; EU since 2004-05-01; OECD member since Nov 1996 — informational',
  topMajorCities: ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Poznań'],
  population: 36600000,
  mainLanguages: ['Polish', 'German (minority)', 'Ukrainian (community)'],
  currency: 'Polish złoty (PLN)',
  timezone: 'Europe/Warsaw',
  foundingLeader: 'Lech Wałęsa (solidarity-era reference)',
  currentLeader: 'President — verify; Prime Minister — verify (2025 electoral cycle aftermath)',
  cryptocurrencyExchanges: ['Zonda (BitBay legacy)', 'European MiCA passporting'],
  stablecoin: 'PLN pairs; EUR-stable conversion customary — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['PL'],
  newsOutlets: OECD_NEWS_OUTLETS['PL'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['PL'],
  stockExchange: 'Warsaw Stock Exchange (GPW)',
}
