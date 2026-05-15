import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const trinidadAndTobago: CommonwealthCountry = {
  name: 'Trinidad and Tobago',
  iso3166Alpha2: 'TT',
  commonwealthStatus: 'member',
  capital: 'Port of Spain',
  coordinates: { latitude: 10.6918, longitude: -61.2225 },
  independence: '1962-08-31',
  topMajorCities: ['Chaguanas', 'San Fernando', 'Port of Spain', 'Arima', 'Point Fortin'],
  population: 1500000,
  mainLanguages: ['English', 'Trinidadian Creole', 'Hindi'],
  currency: 'Trinidad and Tobago dollar (TTD)',
  timezone: 'America/Port_of_Spain',
  foundingLeader: 'Eric Williams (first Prime Minister)',
  currentLeader: 'Kamla Persad-Bissessar (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['TT'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['TT'],
  stockExchange: 'Trinidad and Tobago Stock Exchange',
}
