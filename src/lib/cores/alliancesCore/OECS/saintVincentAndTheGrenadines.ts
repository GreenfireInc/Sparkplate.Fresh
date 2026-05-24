import type { OecsCountry } from './types'
import { OECS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECS_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const saintVincentAndTheGrenadines: OecsCountry = {
  name: 'Saint Vincent and the Grenadines',
  iso3166Alpha2: 'VC',
  capital: 'Kingstown',
  coordinates: { latitude: 13.1587, longitude: -61.2248 },
  independence:
    '1979-10-27 independent state; OECS Treaty of Basseterre 1981 founding signatory — informational',
  topMajorCities: ['Kingstown', 'Georgetown', 'Barrouallie', 'Port Elizabeth', 'Layou'],
  population: 110000,
  mainLanguages: ['English', 'Vincentian Creole', 'French patois (historical)'],
  currency: 'East Caribbean dollar (XCD; ECCB currency union)',
  timezone: 'America/St_Vincent',
  foundingLeader: 'Milton Cato (first Prime Minister)',
  currentLeader: 'Prime Minister Ralph Gonsalves — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'CBDC pilot narratives (ECCB regional) — informational'],
  stablecoin: 'XCD peg; informal USDT — informational',
  domesticCourierServices: OECS_DOMESTIC_COURIERS['VC'],
  newsOutlets: OECS_NEWS_OUTLETS['VC'],
  notableUniversities: OECS_NOTABLE_UNIVERSITIES['VC'],
  mainExportCommodities: OECS_MAIN_EXPORT_COMMODITIES['VC'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
}
