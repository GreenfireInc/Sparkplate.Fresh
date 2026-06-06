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

export const cameroon: EccasCountry = {
  name: 'Cameroon',
  iso3166Alpha2: 'CM',
  capital: 'Yaoundé',
  coordinates: { latitude: 3.848, longitude: 11.5021 },
  independence:
    '1960-01-01 (Republic of Cameroon; federal union evolution 1961 — informational)',
  topMajorCities: ['Douala', 'Yaoundé', 'Garoua', 'Bamenda', 'Bafoussam'],
  population: 28500000,
  mainLanguages: ['French', 'English', 'Fulfulde'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Douala',
  foundingLeader: 'Ahmadou Ahidjo (early republic)',
  currentLeader: 'President Paul Biya — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC P2P; XAF euro peg via BEAC',
  domesticCourierServices: ECCAS_DOMESTIC_COURIERS['CM'],
  newsOutlets: ECCAS_NEWS_OUTLETS['CM'],
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['CM'],
  mainExportCommodities: ECCAS_MAIN_EXPORT_COMMODITIES['CM'],
  mainExportedElements: ECCAS_MAIN_EXPORTED_ELEMENTS['CM'],
  rareEarths: ECCAS_RARE_EARTHS['CM'],
  stockExchange: 'Douala Stock Exchange (DSX)',
  bondMarkets: ECCAS_BOND_MARKETS['CM'],
  intellectualPropertyDepartments: ECCAS_INTELLECTUAL_PROPERTY_DEPARTMENTS['CM'],

  securitiesExchangeCommission: ECCAS_SECURITIES_EXCHANGE_COMMISSIONS['CM'],
  mainInternationalAirport: ECCAS_MAIN_INTERNATIONAL_AIRPORTS['CM'],
}
