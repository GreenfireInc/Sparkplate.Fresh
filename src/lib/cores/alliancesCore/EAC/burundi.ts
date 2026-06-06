import type { EacCountry } from './types'
import { EAC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EAC_NEWS_OUTLETS } from './newsOutletsByIso'
import { EAC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EAC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EAC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EAC_RARE_EARTHS } from './rareEarthsByIso'
import { EAC_BOND_MARKETS } from './bondMarketsByIso'
import { EAC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { EAC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { EAC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const burundi: EacCountry = {
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
  domesticCourierServices: EAC_DOMESTIC_COURIERS['BI'],
  newsOutlets: EAC_NEWS_OUTLETS['BI'],
  notableUniversities: EAC_NOTABLE_UNIVERSITIES['BI'],
  mainExportCommodities: EAC_MAIN_EXPORT_COMMODITIES['BI'],
  mainExportedElements: EAC_MAIN_EXPORTED_ELEMENTS['BI'],
  rareEarths: EAC_RARE_EARTHS['BI'],
  stockExchange: 'Burundi Stock Exchange — thin liquidity',
  bondMarkets: EAC_BOND_MARKETS['BI'],
  intellectualPropertyDepartments: EAC_INTELLECTUAL_PROPERTY_DEPARTMENTS['BI'],

  securitiesExchangeCommission: EAC_SECURITIES_EXCHANGE_COMMISSIONS['BI'],
  mainInternationalAirport: EAC_MAIN_INTERNATIONAL_AIRPORTS['BI'],
}
