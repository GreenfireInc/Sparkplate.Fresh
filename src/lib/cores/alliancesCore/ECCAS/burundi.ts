import type { EccasCountry } from './types'
import { ECCAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECCAS_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { ECCAS_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { ECCAS_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { ECCAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECCAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECCAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECCAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECCAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECCAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECCAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ECCAS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ECCAS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { ECCAS_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const burundi: EccasCountry = {
  name: 'Burundi',
  iso3166Alpha2: 'BI',
  capital: 'Gitega',
  coordinates: { latitude: -3.4264, longitude: 29.9306 },
  independence: '1962-07-01',
  topMajorCities: ['Bujumbura', 'Gitega', 'Ngozi', 'Ruyigi', 'Muyinga'],
  population: 13200000,
  mainLanguages: ['Kirundi', 'French', 'English'],
  currency: 'Burundian franc (BIF)',
  timezone: 'Africa/Bujumbura',
  foundingLeader: 'Mwambutsa IV (King at independence)',
  currentLeader: 'President Évariste Ndayishimiye — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card (regional)', 'Local OTC'],
  stablecoin: 'USDT informal',
  domesticCourierServices: ECCAS_DOMESTIC_COURIERS['BI'],
  domesticPostService: ECCAS_DOMESTIC_POST_SERVICES['BI'],
  nationalBankingInstitutions: ECCAS_NATIONAL_BANKING_INSTITUTIONS['BI'],
  corporationFormationOffice: ECCAS_CORPORATION_FORMATION_OFFICES['BI'],
  newsOutlets: ECCAS_NEWS_OUTLETS['BI'],
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['BI'],
  mainExportCommodities: ECCAS_MAIN_EXPORT_COMMODITIES['BI'],
  mainExportedElements: ECCAS_MAIN_EXPORTED_ELEMENTS['BI'],
  rareEarths: ECCAS_RARE_EARTHS['BI'],
  stockExchange: 'Burundi Stock Exchange — thin liquidity',
  bondMarkets: ECCAS_BOND_MARKETS['BI'],
  intellectualPropertyDepartments: ECCAS_INTELLECTUAL_PROPERTY_DEPARTMENTS['BI'],

  securitiesExchangeCommission: ECCAS_SECURITIES_EXCHANGE_COMMISSIONS['BI'],
  mainInternationalAirport: ECCAS_MAIN_INTERNATIONAL_AIRPORTS['BI'],
  mainInternationalSeaport: ECCAS_MAIN_INTERNATIONAL_SEAPORTS['BI'],
}
