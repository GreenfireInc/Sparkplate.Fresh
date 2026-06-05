import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { AU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { AU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export const centralAfricanRepublic: AfricanUnionCountry = {
  name: 'Central African Republic',
  iso3166Alpha2: 'CF',
  africanUnionStatus: 'member',
  capital: 'Bangui',
  coordinates: { latitude: 4.3947, longitude: 18.5582 },
  independence: '1960-08-13',
  topMajorCities: ['Bangui', 'Bimbo', 'Berbérati', 'Carnot', 'Bambari'],
  population: 5800000,
  mainLanguages: ['Sango', 'French', 'Arabic (regional)'],
  currency: 'Central African CFA franc (XAF); Bitcoin legal tender experiment (contextual)',
  timezone: 'Africa/Bangui',
  foundingLeader: 'David Dacko',
  currentLeader: 'Faustin-Archange Touadéra (President)',
  cryptocurrencyExchanges: ['Sango Coin ecosystem (national project)', 'Binance (P2P)', 'OTC'],
  stablecoin: 'USDT / USDC P2P; experimental sovereign crypto references',
  domesticCourierServices: AU_DOMESTIC_COURIERS['CF'],
  newsOutlets: AU_NEWS_OUTLETS['CF'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['CF'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['CF'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['CF'],
  rareEarths: AU_RARE_EARTHS['CF'],
  stockExchange: 'Bangui Stock Exchange (very limited)',
  bondMarkets: AU_BOND_MARKETS['CF'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['CF'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['CF'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['CF'],
}
