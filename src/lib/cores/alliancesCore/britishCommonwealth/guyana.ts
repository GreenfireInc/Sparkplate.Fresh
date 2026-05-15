import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const guyana: CommonwealthCountry = {
  name: 'Guyana',
  iso3166Alpha2: 'GY',
  commonwealthStatus: 'member',
  capital: 'Georgetown',
  coordinates: { latitude: 6.8013, longitude: -58.1551 },
  independence: '1966-05-26',
  topMajorCities: ['Georgetown', 'Linden', 'New Amsterdam', 'Bartica', 'Skeldon'],
  population: 800000,
  mainLanguages: ['English', 'Guyanese Creole', 'Hindi'],
  currency: 'Guyanese dollar (GYD)',
  timezone: 'America/Guyana',
  foundingLeader: 'Forbes Burnham (first Executive President era)',
  currentLeader: 'Irfaan Ali (President)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['GY'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['GY'],
  stockExchange: 'Guyana Stock Exchange',
}
