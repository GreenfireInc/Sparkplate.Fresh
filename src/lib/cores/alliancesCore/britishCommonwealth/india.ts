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

export const india: CommonwealthCountry = {
  name: 'India',
  iso3166Alpha2: 'IN',
  commonwealthStatus: 'member',
  capital: 'New Delhi',
  coordinates: { latitude: 28.6139, longitude: 77.209 },
  independence: '1947-08-15',
  topMajorCities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
  population: 1420000000,
  mainLanguages: ['Hindi', 'English', 'Bengali'],
  currency: 'Indian rupee (INR)',
  timezone: 'Asia/Kolkata',
  foundingLeader: 'Jawaharlal Nehru (first Prime Minister)',
  currentLeader: 'Narendra Modi (Prime Minister)',
  cryptocurrencyExchanges: ['CoinDCX', 'WazirX', 'ZebPay'],
  stablecoin: 'No INR retail CBDC at scale; USDT on global platforms',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['IN'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['IN'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['IN'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['IN'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['IN'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['IN'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['IN'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['IN'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['IN'],
  stockExchange: 'National Stock Exchange (NSE); BSE',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['IN'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['IN'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['IN'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['IN'],
}
