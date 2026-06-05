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
export const burkinaFaso: AfricanUnionCountry = {
  name: 'Burkina Faso',
  iso3166Alpha2: 'BF',
  africanUnionStatus: 'suspended',
  capital: 'Ouagadougou',
  coordinates: { latitude: 12.3714, longitude: -1.5197 },
  independence: '1960-08-05',
  topMajorCities: ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Ouahigouya', 'Banfora'],
  population: 23000000,
  mainLanguages: ['French', 'Mooré', 'Dioula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Ouagadougou',
  foundingLeader: 'Maurice Yaméogo',
  currentLeader: 'Ibrahim Traoré (Transitional President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Informal P2P'],
  stablecoin: 'USDT via P2P; XOF CFA peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['BF'],
  newsOutlets: AU_NEWS_OUTLETS['BF'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['BF'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['BF'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['BF'],
  rareEarths: AU_RARE_EARTHS['BF'],
  stockExchange: 'Burkina Faso — BRVM listings (limited local activity)',
  bondMarkets: AU_BOND_MARKETS['BF'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['BF'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['BF'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['BF'],
}
