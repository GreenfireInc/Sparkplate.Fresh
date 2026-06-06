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

export const libya: ComesaCountry = {
  name: 'Libya',
  iso3166Alpha2: 'LY',
  capital: 'Tripoli',
  coordinates: { latitude: 32.8872, longitude: 13.1913 },
  independence: '1951-12-24',
  topMajorCities: ['Tripoli', 'Benghazi', 'Misrata', 'Bayda', 'Zawiya'],
  population: 7000000,
  mainLanguages: ['Arabic (Libyan)', 'Berber (Tamazight)', 'Italian (legacy)'],
  currency: 'Libyan dinar (LYD)',
  timezone: 'Africa/Tripoli',
  foundingLeader: 'King Idris I',
  currentLeader:
    'Fragmented administrations — GNU Presidential Council chairs (Mohamed al-Menfi GNU Tripoli baseline) — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC; fragmented regulatory environment'],
  stablecoin: 'USDT informal; banking fragmentation',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['LY'],
  newsOutlets: COMESA_NEWS_OUTLETS['LY'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['LY'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['LY'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['LY'],
  rareEarths: COMESA_RARE_EARTHS['LY'],
  stockExchange: 'Libyan Stock Market (limited operations)',
  bondMarkets: COMESA_BOND_MARKETS['LY'],
  intellectualPropertyDepartments: COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS['LY'],
  securitiesExchangeCommission: COMESA_SECURITIES_EXCHANGE_COMMISSIONS['LY'],
  mainInternationalAirport: COMESA_MAIN_INTERNATIONAL_AIRPORTS['LY'],
}
