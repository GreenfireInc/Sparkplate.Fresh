import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const maldives: CommonwealthCountry = {
  name: 'Maldives',
  iso3166Alpha2: 'MV',
  commonwealthStatus: 'member',
  capital: 'Malé',
  coordinates: { latitude: 4.1755, longitude: 73.5093 },
  independence: '1965-07-26',
  topMajorCities: ['Malé', 'Addu City', 'Fuvahmulah', 'Thinadhoo', 'Naifaru'],
  population: 520000,
  mainLanguages: ['Dhivehi', 'English', 'Arabic (religious)'],
  currency: 'Maldivian rufiyaa (MVR)',
  timezone: 'Indian/Maldives',
  foundingLeader: 'Ibrahim Nasir (first President)',
  currentLeader: 'Mohamed Muizzu (President) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['MV'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['MV'],
  stockExchange: 'Maldives Stock Exchange',
}
