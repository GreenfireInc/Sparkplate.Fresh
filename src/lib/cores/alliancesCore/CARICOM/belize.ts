import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_NEWS_OUTLETS } from './newsOutletsByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CARICOM_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CARICOM_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CARICOM_RARE_EARTHS } from './rareEarthsByIso'
import { CARICOM_BOND_MARKETS } from './bondMarketsByIso'
import { CARICOM_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CARICOM_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const belize: CaricomCountry = {
  name: 'Belize',
  iso3166Alpha2: 'BZ',
  caricomStatus: 'full_member',
  capital: 'Belmopan',
  coordinates: { latitude: 17.251, longitude: -88.759 },
  independence: '1981-09-21',
  topMajorCities: ['Belize City', 'San Ignacio', 'Orange Walk', 'Dangriga', 'Corozal'],
  population: 410000,
  mainLanguages: ['English', 'Spanish', 'Kriol'],
  currency: 'Belize dollar (BZD)',
  timezone: 'America/Belize',
  foundingLeader: 'George Cadle Price (first Prime Minister)',
  currentLeader: 'John Briceño (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'BZD peg to USD; USDT/USDC',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['BZ'],
  newsOutlets: CARICOM_NEWS_OUTLETS['BZ'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['BZ'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['BZ'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['BZ'],
  rareEarths: CARICOM_RARE_EARTHS['BZ'],
  stockExchange: 'Belize Stock Exchange',
  bondMarkets: CARICOM_BOND_MARKETS['BZ'],
  intellectualPropertyDepartments: CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS['BZ'],
  securitiesExchangeCommission: CARICOM_SECURITIES_EXCHANGE_COMMISSIONS['BZ'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['BZ'],
}
