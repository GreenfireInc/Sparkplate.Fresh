import type { OecsCountry } from './types'
import { OECS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const dominica: OecsCountry = {
  name: 'Commonwealth of Dominica',
  iso3166Alpha2: 'DM',
  capital: 'Roseau',
  coordinates: { latitude: 15.3092, longitude: -61.3794 },
  independence:
    '1978-11-03 independent state; OECS Treaty of Basseterre 1981 founding signatory — informational',
  topMajorCities: ['Roseau', 'Portsmouth', 'Marigot', 'Mahaut', 'Saint Joseph'],
  population: 72000,
  mainLanguages: ['English', 'Dominican Creole', 'Kokoy'],
  currency: 'East Caribbean dollar (XCD; ECCB currency union)',
  timezone: 'America/Dominica',
  foundingLeader: 'Patrick John (first Prime Minister)',
  currentLeader: 'Prime Minister Roosevelt Skerrit — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance-style P2P informal — informational'],
  stablecoin: 'XCD USD peg; informal stable settlement — informational',
  domesticCourierServices: OECS_DOMESTIC_COURIERS['DM'],
  notableUniversities: OECS_NOTABLE_UNIVERSITIES['DM'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
}
