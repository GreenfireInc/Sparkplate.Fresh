import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const samoa: CommonwealthCountry = {
  name: 'Samoa',
  iso3166Alpha2: 'WS',
  commonwealthStatus: 'member',
  capital: 'Apia',
  coordinates: { latitude: -13.8333, longitude: -171.7667 },
  independence: '1962-01-01',
  topMajorCities: ['Apia', 'Asau', 'Mulifanua', 'Afega', 'Vailele'],
  population: 225000,
  mainLanguages: ['Samoan', 'English', 'Chinese (community)'],
  currency: 'Samoan tālā (WST)',
  timezone: 'Pacific/Apia',
  foundingLeader: 'Mata\'afa Faumuina Mulinuu II (first Prime Minister)',
  currentLeader: 'Fiamē Naomi Mataʻafa (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['WS'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['WS'],
  stockExchange: 'No major national exchange — informational',
}
