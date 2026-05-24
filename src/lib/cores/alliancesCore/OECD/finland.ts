import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const finland: OecdCountry = {
  name: 'Finland',
  iso3166Alpha2: 'FI',
  capital: 'Helsinki',
  coordinates: { latitude: 60.1699, longitude: 24.9384 },
  independence:
    '1917 independence from Russian Empire lineage; EU 1995; euro currency; OECD member since Jan 1969 — informational',
  topMajorCities: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Turku'],
  population: 5600000,
  mainLanguages: ['Finnish', 'Swedish', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Helsinki',
  foundingLeader: 'Carl Gustaf Emil Mannerheim-era consolidation — informational',
  currentLeader: 'President Alexander Stubb; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nordic-friendly EU brokers; Finnish FSA supervise — informational'],
  stablecoin: 'EUR stablecoins; MiCA passport — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['FI'],
  newsOutlets: OECD_NEWS_OUTLETS['FI'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['FI'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['FI'],
  stockExchange: 'Nasdaq Helsinki',
}
