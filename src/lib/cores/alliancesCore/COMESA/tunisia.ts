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

export const tunisia: ComesaCountry = {
  name: 'Tunisia',
  iso3166Alpha2: 'TN',
  capital: 'Tunis',
  coordinates: { latitude: 36.8065, longitude: 10.1815 },
  independence: '1956-03-20',
  topMajorCities: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte'],
  population: 12000000,
  mainLanguages: ['Arabic (Tunisian)', 'French', 'Berber'],
  currency: 'Tunisian dinar (TND)',
  timezone: 'Africa/Tunis',
  foundingLeader: 'Habib Bourguiba (first President republic era)',
  currentLeader: 'President Kais Saied — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional brokers', 'OTC'],
  stablecoin: 'USDT informal; e-dinar discussions',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['TN'],
  newsOutlets: COMESA_NEWS_OUTLETS['TN'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['TN'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['TN'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['TN'],
  rareEarths: COMESA_RARE_EARTHS['TN'],
  stockExchange: 'Bourse de Tunis',
  bondMarkets: COMESA_BOND_MARKETS['TN'],
  intellectualPropertyDepartments: COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS['TN'],
  securitiesExchangeCommission: COMESA_SECURITIES_EXCHANGE_COMMISSIONS['TN'],
  mainInternationalAirport: COMESA_MAIN_INTERNATIONAL_AIRPORTS['TN'],
}
