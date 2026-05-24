import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const costaRica: OecdCountry = {
  name: 'Costa Rica',
  iso3166Alpha2: 'CR',
  capital: 'San José',
  coordinates: { latitude: 9.9281, longitude: -84.0907 },
  independence:
    '1821 Central American independence lineage; neutrality abolished 1948-era narrative; OECD member since May 2021 — informational',
  topMajorCities: ['San José', 'Limón', 'San Francisco', 'Alajuela', 'Liberia'],
  population: 5200000,
  mainLanguages: ['Spanish', 'Mekatelyu Limón Coastal Creole (community)', 'English (Caribbean / tourism)'],
  currency: 'Costa Rican colón (CRC); United States dollar legal tender customary — informational',
  timezone: 'America/Costa_Rica',
  foundingLeader: 'Juan Mora Porras early republic continuity — informational',
  currentLeader: 'President Rodrigo Chaves Robles — verify',
  cryptocurrencyExchanges: ['Retail fiat ramps; banking-sector supervision overlays — informational'],
  stablecoin: 'USD-stable predominant; CB digital payment pilots — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['CR'],
  newsOutlets: OECD_NEWS_OUTLETS['CR'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['CR'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['CR'],
  stockExchange: 'Bolsa Nacional de Valores (BNV Costa Rica)',
}
