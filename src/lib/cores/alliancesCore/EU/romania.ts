import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const romania: EuCountry = {
  name: 'Romania',
  iso3166Alpha2: 'RO',
  capital: 'Bucharest',
  coordinates: { latitude: 44.4268, longitude: 26.1025 },
  independence: '1989 revolution lineage; EU 2007-01-01; euro aspirant — informational',
  topMajorCities: ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța'],
  population: 19000000,
  mainLanguages: ['Romanian', 'Hungarian (minority)', 'Romani'],
  currency: 'Romanian leu (RON)',
  timezone: 'Europe/Bucharest',
  foundingLeader: 'Ion Iliescu (post-Ceaușescu reference)',
  currentLeader: 'President Klaus Johannis — verify successor cycle; Prime Minister — verify',
  cryptocurrencyExchanges: ['EU gateways; OTC alongside banking conservatism — informational'],
  stablecoin: 'RON FX; predominant EUR-stable rails',
  domesticCourierServices: EU_DOMESTIC_COURIERS['RO'],
  newsOutlets: EU_NEWS_OUTLETS['RO'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['RO'],
  stockExchange: 'Bucharest Stock Exchange',
}
