import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { COMMONWEALTH_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

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
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['TT'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['TT'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['TT'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['TT'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['TT'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['TT'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['TT'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['TT'],
  stockExchange: 'Trinidad and Tobago Stock Exchange',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['TT'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['TT'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['TT'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['TT'],
}
