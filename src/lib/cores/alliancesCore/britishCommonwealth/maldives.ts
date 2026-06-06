import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

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
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['MV'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['MV'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['MV'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['MV'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['MV'],
  stockExchange: 'Maldives Stock Exchange',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['MV'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['MV'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['MV'],
}
