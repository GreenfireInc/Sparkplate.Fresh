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
export const burundi: BeltAndRoadInitiativeCountry = {
  name: 'Burundi',
  iso3166Alpha2: 'BI',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Gitega',
  coordinates: { latitude: -3.4264, longitude: 29.9306 },
  independence: '1962-07-01',
  topMajorCities: ['Bujumbura', 'Gitega', 'Ngozi', 'Ruyigi', 'Muyinga'] as [string, string, string, string, string],
  population: 12332788,
  mainLanguages: [ 'French', 'Kirundi', 'Regional languages' ],
  currency: 'Burundian franc (BIF)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Mwambutsa IV (King at independence)',
  currentLeader: 'Évariste Ndayishimiye (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Local P2P', 'Yellow Card (regional)'],
  stablecoin: 'USDT informal; no BIF stablecoin',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['BI'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['BI'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['BI'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['BI'],
  newsOutlets: BRI_NEWS_OUTLETS['BI'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['BI'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['BI'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['BI'],
  rareEarths: BRI_RARE_EARTHS['BI'],
  stockExchange: 'Burundi Stock Exchange (BSE) — thin liquidity',
  bondMarkets: BRI_BOND_MARKETS['BI'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['BI'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['BI'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['BI'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['BI'],
}
