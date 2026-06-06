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

export const montserrat: CaricomCountry = {
  name: 'Montserrat',
  iso3166Alpha2: 'MS',
  caricomStatus: 'full_member',
  capital: 'Brades (de facto; Plymouth abandoned)',
  coordinates: { latitude: 16.7425, longitude: -62.1874 },
  independence: 'British Overseas Territory; internal self-government (no full UN sovereignty)',
  topMajorCities: ['Brades', 'Little Bay', 'St. Peters', 'Salem', 'Woodlands'],
  population: 4400,
  mainLanguages: ['English', 'Montserrat Creole', 'Irish heritage (cultural)'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/Montserrat',
  foundingLeader: 'William Henry Bramble (first Chief Minister era)',
  currentLeader: 'Premier — verify; Governor (UK) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD peg; USDT informal',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['MS'],
  newsOutlets: CARICOM_NEWS_OUTLETS['MS'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['MS'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['MS'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['MS'],
  rareEarths: CARICOM_RARE_EARTHS['MS'],
  stockExchange: 'Eastern Caribbean Securities Exchange (access context) — informational',
  bondMarkets: CARICOM_BOND_MARKETS['MS'],
  intellectualPropertyDepartments: CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS['MS'],
  securitiesExchangeCommission: CARICOM_SECURITIES_EXCHANGE_COMMISSIONS['MS'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['MS'],
}
