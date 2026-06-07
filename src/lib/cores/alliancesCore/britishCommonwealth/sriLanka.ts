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

export const sriLanka: CommonwealthCountry = {
  name: 'Sri Lanka',
  iso3166Alpha2: 'LK',
  commonwealthStatus: 'member',
  capital: 'Sri Jayawardenepura Kotte (legislative); Colombo (commercial)',
  coordinates: { latitude: 6.9271, longitude: 79.8612 },
  independence: '1948-02-04',
  topMajorCities: ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo'],
  population: 22000000,
  mainLanguages: ['Sinhala', 'Tamil', 'English'],
  currency: 'Sri Lankan rupee (LKR)',
  timezone: 'Asia/Colombo',
  foundingLeader: 'D. S. Senanayake (first Prime Minister)',
  currentLeader: 'Anura Kumara Dissanayake (President) — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['LK'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['LK'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['LK'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['LK'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['LK'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['LK'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['LK'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['LK'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['LK'],
  stockExchange: 'Colombo Stock Exchange',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['LK'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['LK'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['LK'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['LK'],
}
