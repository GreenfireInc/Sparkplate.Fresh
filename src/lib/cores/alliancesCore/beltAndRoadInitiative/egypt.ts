import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRI_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export const egypt: BeltAndRoadInitiativeCountry = {
  name: 'Egypt',
  iso3166Alpha2: 'EG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Cairo',
  coordinates: { latitude: 30.0444, longitude: 31.2357 },
  independence: '1922-02-28',
  topMajorCities: ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said'] as [string, string, string, string, string],
  population: 107271260,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Egyptian pound (EGP)',
  timezone: 'UTC+02:00',
  foundingLeader: 'King Fuad I (Sultanate/Kingdom era)',
  currentLeader: 'Abdel Fattah el-Sisi (President)',
  cryptocurrencyExchanges: ['Rain (regional)', 'No official local spot exchange; P2P & OTC'],
  stablecoin: 'USDT / USDC P2P common; central bank exploring CBDC',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['EG'],
  newsOutlets: BRI_NEWS_OUTLETS['EG'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['EG'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['EG'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['EG'],
  rareEarths: BRI_RARE_EARTHS['EG'],
  stockExchange: 'Egyptian Exchange (EGX)',
  bondMarkets: BRI_BOND_MARKETS['EG'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['EG'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['EG'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['EG'],
}
