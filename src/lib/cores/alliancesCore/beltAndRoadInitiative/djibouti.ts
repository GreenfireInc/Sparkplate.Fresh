import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { BRI_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { BRI_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRI_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { BRI_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export const djibouti: BeltAndRoadInitiativeCountry = {
  name: 'Djibouti',
  iso3166Alpha2: 'DJ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Djibouti',
  coordinates: { latitude: 11.5886, longitude: 43.1456 },
  independence: '1977-06-27',
  topMajorCities: ['Djibouti City', 'Ali Sabieh', 'Tadjoura', 'Obock', 'Dikhil'] as [string, string, string, string, string],
  population: 1066809,
  mainLanguages: [ 'Arabic', 'French', 'Regional languages' ],
  currency: 'Djiboutian franc (DJF)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Hassan Gouled Aptidon',
  currentLeader: 'Ismail Omar Guelleh (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'International OTC', 'Regional remittance apps'],
  stablecoin: 'USDT / USDC; DJF pegged to USD (currency board)',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['DJ'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['DJ'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['DJ'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['DJ'],
  newsOutlets: BRI_NEWS_OUTLETS['DJ'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['DJ'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['DJ'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['DJ'],
  rareEarths: BRI_RARE_EARTHS['DJ'],
  stockExchange: 'Djibouti Stock Exchange (thin activity)',
  bondMarkets: BRI_BOND_MARKETS['DJ'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['DJ'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['DJ'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['DJ'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['DJ'],
}
