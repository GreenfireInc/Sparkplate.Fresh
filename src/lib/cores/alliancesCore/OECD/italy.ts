import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const italy: OecdCountry = {
  name: 'Italy',
  iso3166Alpha2: 'IT',
  capital: 'Rome',
  coordinates: { latitude: 41.9028, longitude: 12.4964 },
  independence:
    '1946 republic continuity; EU founding lineage; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo'],
  population: 58700000,
  mainLanguages: ['Italian', 'German (South Tyrol)', 'French (Valle d Aosta)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Rome',
  foundingLeader: 'Alcide De Gasperi (integration reference)',
  currentLeader: 'President / Prime Minister — verify',
  cryptocurrencyExchanges: ['Conio', 'Young Platform', 'MiCA-aligned CASPs'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['IT'],
  newsOutlets: OECD_NEWS_OUTLETS['IT'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['IT'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['IT'],
  stockExchange: 'Euronext Milan (Borsa Italiana legacy)',
}
