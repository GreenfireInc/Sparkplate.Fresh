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

export const saintKittsAndNevis: CaricomCountry = {
  name: 'Saint Kitts and Nevis',
  iso3166Alpha2: 'KN',
  caricomStatus: 'full_member',
  capital: 'Basseterre',
  coordinates: { latitude: 17.3026, longitude: -62.7177 },
  independence: '1983-09-19',
  topMajorCities: ['Basseterre', 'Charlestown', 'Sandy Point', 'Cayon', 'Dieppe Bay'],
  population: 48000,
  mainLanguages: ['English', 'Saint Kitts Creole', 'French patois (historical)'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/St_Kitts',
  foundingLeader: 'Kennedy Simmonds (first Prime Minister)',
  currentLeader: 'Terrance Drew (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD peg; USDT/USDC',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['KN'],
  newsOutlets: CARICOM_NEWS_OUTLETS['KN'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['KN'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['KN'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['KN'],
  rareEarths: CARICOM_RARE_EARTHS['KN'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
  bondMarkets: CARICOM_BOND_MARKETS['KN'],
  intellectualPropertyDepartments: CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS['KN'],
  securitiesExchangeCommission: CARICOM_SECURITIES_EXCHANGE_COMMISSIONS['KN'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['KN'],
}
