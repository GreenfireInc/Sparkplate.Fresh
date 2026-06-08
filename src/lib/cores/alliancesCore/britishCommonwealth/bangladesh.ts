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

export const bangladesh: CommonwealthCountry = {
  name: 'Bangladesh',
  iso3166Alpha2: 'BD',
  commonwealthStatus: 'member',
  capital: 'Dhaka',
  coordinates: { latitude: 23.8103, longitude: 90.4125 },
  independence: '1971-03-26',
  topMajorCities: ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet'],
  population: 172000000,
  mainLanguages: ['Bengali', 'English', 'Chittagonian'],
  currency: 'Bangladeshi taka (BDT)',
  timezone: 'Asia/Dhaka',
  foundingLeader: 'Sheikh Mujibur Rahman',
  currentLeader: 'Sheikh Hasina (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional brokers'],
  stablecoin: 'USDT common in informal markets; no official BDT stablecoin',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['BD'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['BD'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['BD'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['BD'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['BD'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['BD'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['BD'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['BD'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['BD'],
  stockExchange: 'Dhaka Stock Exchange (DSE); Chittagong Stock Exchange',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['BD'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['BD'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['BD'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['BD'],
}
