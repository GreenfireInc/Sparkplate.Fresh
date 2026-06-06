import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMESA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMESA_RARE_EARTHS } from './rareEarthsByIso'
import { COMESA_BOND_MARKETS } from './bondMarketsByIso'
import { COMESA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMESA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const burundi: ComesaCountry = {
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
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['BI'],
  newsOutlets: COMESA_NEWS_OUTLETS['BI'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['BI'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['BI'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['BI'],
  rareEarths: COMESA_RARE_EARTHS['BI'],
  stockExchange: 'Burundi Stock Exchange — thin liquidity',
  bondMarkets: COMESA_BOND_MARKETS['BI'],
  intellectualPropertyDepartments: COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS['BI'],
  securitiesExchangeCommission: COMESA_SECURITIES_EXCHANGE_COMMISSIONS['BI'],
  mainInternationalAirport: COMESA_MAIN_INTERNATIONAL_AIRPORTS['BI'],
}
