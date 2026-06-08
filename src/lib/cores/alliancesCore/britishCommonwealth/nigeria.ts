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

export const nigeria: CommonwealthCountry = {
  name: 'Nigeria',
  iso3166Alpha2: 'NG',
  commonwealthStatus: 'member',
  capital: 'Abuja',
  coordinates: { latitude: 9.0765, longitude: 7.3986 },
  independence: '1960-10-01',
  topMajorCities: ['Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt'],
  population: 223000000,
  mainLanguages: ['English', 'Hausa', 'Yoruba'],
  currency: 'Nigerian naira (NGN)',
  timezone: 'Africa/Lagos',
  foundingLeader: 'Nnamdi Azikiwe (first indigenous Governor-General era)',
  currentLeader: 'Bola Tinubu (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Luno', 'Yellow Card'],
  stablecoin: 'eNaira (CBDC); USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['NG'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['NG'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['NG'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['NG'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['NG'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['NG'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['NG'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['NG'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['NG'],
  stockExchange: 'Nigerian Exchange Group',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['NG'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['NG'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['NG'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['NG'],
}
