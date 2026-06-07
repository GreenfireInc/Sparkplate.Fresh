import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { CENSAD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { CENSAD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'
import { CENSAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CENSAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { CENSAD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const djibouti: CensadCountry = {
  name: 'Djibouti',
  iso3166Alpha2: 'DJ',
  capital: 'Djibouti City',
  coordinates: { latitude: 11.5886, longitude: 43.1459 },
  independence: '1977-06-27 (from France)',
  topMajorCities: ['Djibouti City', 'Ali Sabieh', 'Tadjoura', 'Obock', 'Dikhil'],
  population: 1140000,
  mainLanguages: ['French', 'Arabic', 'Somali'],
  currency: 'Djiboutian franc (DJF), pegged to USD',
  timezone: 'Africa/Djibouti',
  foundingLeader: 'Hassan Gouled Aptidon (first president)',
  currentLeader: 'President Ismail Omar Guelleh — verify',
  cryptocurrencyExchanges: ['Limited formal; regional OTC'],
  stablecoin: 'DJF peg; USDT/USDC informal',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['DJ'],
  domesticPostService: CENSAD_DOMESTIC_POST_SERVICES['DJ'],
  nationalBankingInstitutions: CENSAD_NATIONAL_BANKING_INSTITUTIONS['DJ'],
  corporationFormationOffice: CENSAD_CORPORATION_FORMATION_OFFICES['DJ'],
  newsOutlets: CENSAD_NEWS_OUTLETS['DJ'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['DJ'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['DJ'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['DJ'],
  rareEarths: CENSAD_RARE_EARTHS['DJ'],
  stockExchange: 'No major national stock exchange',
  bondMarkets: CENSAD_BOND_MARKETS['DJ'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['DJ'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['DJ'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['DJ'],
  mainInternationalSeaport: CENSAD_MAIN_INTERNATIONAL_SEAPORTS['DJ'],
}
