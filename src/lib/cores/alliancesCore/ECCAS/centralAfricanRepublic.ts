import type { EccasCountry } from './types'
import { ECCAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECCAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECCAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECCAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECCAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECCAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECCAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECCAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ECCAS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ECCAS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const centralAfricanRepublic: EccasCountry = {
  name: 'Central African Republic',
  iso3166Alpha2: 'CF',
  capital: 'Bangui',
  coordinates: { latitude: 4.3947, longitude: 18.5582 },
  independence: '1960-08-13',
  topMajorCities: ['Bangui', 'Bimbo', 'Berbérati', 'Carnot', 'Bambari'],
  population: 5800000,
  mainLanguages: ['Sango', 'French', 'Arabic (regional)'],
  currency:
    'Central African CFA franc (XAF); Bitcoin legal-tender-era policies — contextual — verify',
  timezone: 'Africa/Bangui',
  foundingLeader: 'David Dacko (first President)',
  currentLeader: 'President Faustin-Archange Touadéra — verify',
  cryptocurrencyExchanges: ['National crypto project narratives', 'Binance (P2P)', 'OTC'],
  stablecoin: 'USDT / USDC P2P alongside policy experiments',
  domesticCourierServices: ECCAS_DOMESTIC_COURIERS['CF'],
  newsOutlets: ECCAS_NEWS_OUTLETS['CF'],
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['CF'],
  mainExportCommodities: ECCAS_MAIN_EXPORT_COMMODITIES['CF'],
  mainExportedElements: ECCAS_MAIN_EXPORTED_ELEMENTS['CF'],
  rareEarths: ECCAS_RARE_EARTHS['CF'],
  stockExchange: 'Bangui Stock Exchange (very limited)',
  bondMarkets: ECCAS_BOND_MARKETS['CF'],
  intellectualPropertyDepartments: ECCAS_INTELLECTUAL_PROPERTY_DEPARTMENTS['CF'],

  securitiesExchangeCommission: ECCAS_SECURITIES_EXCHANGE_COMMISSIONS['CF'],
  mainInternationalAirport: ECCAS_MAIN_INTERNATIONAL_AIRPORTS['CF'],
}
