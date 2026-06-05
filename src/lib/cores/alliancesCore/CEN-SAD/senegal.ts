import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'
import { CENSAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CENSAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const senegal: CensadCountry = {
  name: 'Senegal',
  iso3166Alpha2: 'SN',
  capital: 'Dakar',
  coordinates: { latitude: 14.6928, longitude: -17.4467 },
  independence: '1960-08-20 (France; Mali Federation context brief — verify)',
  topMajorCities: ['Dakar', 'Thiès', 'Rufisque', 'Kaolack', 'Ziguinchor'],
  population: 18500000,
  mainLanguages: ['French', 'Wolof', 'Pulaar'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Dakar',
  foundingLeader: 'Léopold Sédar Senghor (first President cohort)',
  currentLeader: 'President Bassirou Diomaye Faye — verify',
  cryptocurrencyExchanges: ['Regional P2P', 'Partnership/licensing evolution'],
  stablecoin: 'USDT informal; CFA peg',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['SN'],
  newsOutlets: CENSAD_NEWS_OUTLETS['SN'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['SN'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['SN'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['SN'],
  rareEarths: CENSAD_RARE_EARTHS['SN'],
  stockExchange: 'BRVM (multiple Senegalese listings)',
  bondMarkets: CENSAD_BOND_MARKETS['SN'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['SN'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['SN'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['SN'],
}
