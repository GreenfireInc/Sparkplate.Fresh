import type { OecsCountry } from './types'
import { OECS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECS_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const grenada: OecsCountry = {
  name: 'Grenada',
  iso3166Alpha2: 'GD',
  capital: 'St. George\'s',
  coordinates: { latitude: 12.0564, longitude: -61.7485 },
  independence:
    '1974-02-07 independent state; OECS Treaty of Basseterre 1981 founding signatory — informational',
  topMajorCities: ['St. George\'s', 'Gouyave', 'Grenville', 'Victoria', 'Sauteurs'],
  population: 126000,
  mainLanguages: ['English', 'Grenadian Creole French', 'French patois (historical)'],
  currency: 'East Caribbean dollar (XCD; ECCB currency union)',
  timezone: 'America/Grenada',
  foundingLeader: 'Eric Gairy (first Prime Minister)',
  currentLeader: 'Prime Minister Dickon Mitchell — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'mobile-money predominant — informational'],
  stablecoin: 'XCD peg; USDT overlays — informational',
  domesticCourierServices: OECS_DOMESTIC_COURIERS['GD'],
  newsOutlets: OECS_NEWS_OUTLETS['GD'],
  notableUniversities: OECS_NOTABLE_UNIVERSITIES['GD'],
  mainExportCommodities: OECS_MAIN_EXPORT_COMMODITIES['GD'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
}
