import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const chile: OecdCountry = {
  name: 'Chile',
  iso3166Alpha2: 'CL',
  capital: 'Santiago',
  coordinates: { latitude: -33.4489, longitude: -70.6693 },
  independence:
    '1818 independence from Spain consolidated; OECD member since May 2010 — informational',
  topMajorCities: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta'],
  population: 19500000,
  mainLanguages: ['Spanish', 'Mapudungun (Mapuche)', 'English (business / education)'],
  currency: 'Chilean peso (CLP)',
  timezone: 'America/Santiago',
  foundingLeader: 'Bernardo O\'Higgins independence-era liberation reference — informational',
  currentLeader: 'President — verify (Congressional-presidential electoral cycle)',
  cryptocurrencyExchanges: ['Buda.com', 'CMF-registered onboarding evolution — informational'],
  stablecoin: 'CLP digital pilots; predominant USD OTC rails — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['CL'],
  newsOutlets: OECD_NEWS_OUTLETS['CL'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['CL'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['CL'],
  stockExchange: 'Bolsa de Santiago (Bolsa Electrónica de Chile contextual listings — informational)',
}
