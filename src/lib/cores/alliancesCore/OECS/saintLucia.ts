import type { OecsCountry } from './types'
import { OECS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const saintLucia: OecsCountry = {
  name: 'Saint Lucia',
  iso3166Alpha2: 'LC',
  capital: 'Castries',
  coordinates: { latitude: 14.0101, longitude: -60.9877 },
  independence:
    '1979-02-22 independent state; OECS Treaty of Basseterre 1981 founding signatory; OECS Commission host — informational',
  topMajorCities: ['Castries', 'Vieux Fort', 'Micoud', 'Soufrière', 'Dennery'],
  population: 180000,
  mainLanguages: ['English', 'Saint Lucian Creole French', 'French (cultural)'],
  currency: 'East Caribbean dollar (XCD; ECCB currency union)',
  timezone: 'America/St_Lucia',
  foundingLeader: 'John Compton (first Prime Minister)',
  currentLeader: 'Prime Minister Philip J. Pierre — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'ECCB digital policy evolution — informational'],
  stablecoin: 'XCD peg; informal stable rails — informational',
  domesticCourierServices: OECS_DOMESTIC_COURIERS['LC'],
  notableUniversities: OECS_NOTABLE_UNIVERSITIES['LC'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
}
