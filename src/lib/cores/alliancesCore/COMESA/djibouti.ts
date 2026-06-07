import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { COMESA_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { COMESA_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMESA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMESA_RARE_EARTHS } from './rareEarthsByIso'
import { COMESA_BOND_MARKETS } from './bondMarketsByIso'
import { COMESA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMESA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { COMESA_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const djibouti: ComesaCountry = {
  name: 'Djibouti',
  iso3166Alpha2: 'DJ',
  capital: 'Djibouti City',
  coordinates: { latitude: 11.5886, longitude: 43.1456 },
  independence: '1977-06-27 (from France)',
  topMajorCities: ['Djibouti City', 'Ali Sabieh', 'Tadjoura', 'Obock', 'Dikhil'],
  population: 1100000,
  mainLanguages: ['French', 'Arabic', 'Somali'],
  currency: 'Djiboutian franc (DJF)',
  timezone: 'Africa/Djibouti',
  foundingLeader: 'Hassan Gouled Aptidon (first President)',
  currentLeader: 'President Ismail Omar Guelleh — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'International OTC', 'Regional remittance apps'],
  stablecoin: 'USDT / USDC; DJF pegged to USD (currency board)',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['DJ'],
  domesticPostService: COMESA_DOMESTIC_POST_SERVICES['DJ'],
  nationalBankingInstitutions: COMESA_NATIONAL_BANKING_INSTITUTIONS['DJ'],
  corporationFormationOffice: COMESA_CORPORATION_FORMATION_OFFICES['DJ'],
  newsOutlets: COMESA_NEWS_OUTLETS['DJ'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['DJ'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['DJ'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['DJ'],
  rareEarths: COMESA_RARE_EARTHS['DJ'],
  stockExchange: 'Djibouti Stock Exchange (thin activity)',
  bondMarkets: COMESA_BOND_MARKETS['DJ'],
  intellectualPropertyDepartments: COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS['DJ'],
  securitiesExchangeCommission: COMESA_SECURITIES_EXCHANGE_COMMISSIONS['DJ'],
  mainInternationalAirport: COMESA_MAIN_INTERNATIONAL_AIRPORTS['DJ'],
  mainInternationalSeaport: COMESA_MAIN_INTERNATIONAL_SEAPORTS['DJ'],
}
