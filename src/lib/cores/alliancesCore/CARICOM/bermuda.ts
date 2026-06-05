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

export const bermuda: CaricomCountry = {
  name: 'Bermuda',
  iso3166Alpha2: 'BM',
  caricomStatus: 'associate_member',
  capital: 'Hamilton',
  coordinates: { latitude: 32.2949, longitude: -64.7834 },
  independence: 'British Overseas Territory (UK); associate CARICOM member',
  topMajorCities: ['Hamilton', 'St. George\'s', 'Somerset', 'Paget', 'Warwick'],
  population: 64000,
  mainLanguages: ['English', 'Portuguese (community)', 'Portuguese Creole'],
  currency: 'Bermudian dollar (BMD); USD pegged at par',
  timezone: 'Atlantic/Bermuda',
  foundingLeader: 'Henry Tucker (premier era — historical)',
  currentLeader: 'Premier — verify; Governor (UK) — verify',
  cryptocurrencyExchanges: ['Bermuda Monetary Authority licensed venues', 'Regional OTC'],
  stablecoin: 'BMD/USD peg; USDT offshore',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['BM'],
  newsOutlets: CARICOM_NEWS_OUTLETS['BM'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['BM'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['BM'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['BM'],
  rareEarths: CARICOM_RARE_EARTHS['BM'],
  stockExchange: 'Bermuda Stock Exchange',
  bondMarkets: CARICOM_BOND_MARKETS['BM'],
  intellectualPropertyDepartments: CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS['BM'],
  securitiesExchangeCommission: CARICOM_SECURITIES_EXCHANGE_COMMISSIONS['BM'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['BM'],
}
