import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { AU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { AU_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { AU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { AU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { AU_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export const egypt: AfricanUnionCountry = {
  name: 'Egypt',
  iso3166Alpha2: 'EG',
  africanUnionStatus: 'member',
  capital: 'Cairo',
  coordinates: { latitude: 30.0444, longitude: 31.2357 },
  independence: '1922-02-28',
  topMajorCities: ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said'],
  population: 114000000,
  mainLanguages: ['Arabic (Egyptian)', 'English', 'French (tourism & business)'],
  currency: 'Egyptian pound (EGP)',
  timezone: 'Africa/Cairo',
  foundingLeader: 'King Fuad I (Sultanate/Kingdom era)',
  currentLeader: 'Abdel Fattah el-Sisi (President)',
  cryptocurrencyExchanges: ['Rain (regional)', 'No official local spot exchange; P2P & OTC'],
  stablecoin: 'USDT / USDC P2P common; central bank exploring CBDC',
  domesticCourierServices: AU_DOMESTIC_COURIERS['EG'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['EG'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['EG'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['EG'],
  newsOutlets: AU_NEWS_OUTLETS['EG'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['EG'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['EG'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['EG'],
  rareEarths: AU_RARE_EARTHS['EG'],
  stockExchange: 'Egyptian Exchange (EGX)',
  bondMarkets: AU_BOND_MARKETS['EG'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['EG'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['EG'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['EG'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['EG'],
}
