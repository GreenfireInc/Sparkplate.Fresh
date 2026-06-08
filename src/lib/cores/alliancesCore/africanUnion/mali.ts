import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { AU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { AU_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { AU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { AU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { AU_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export const mali: AfricanUnionCountry = {
  name: 'Mali',
  iso3166Alpha2: 'ML',
  africanUnionStatus: 'suspended',
  capital: 'Bamako',
  coordinates: { latitude: 12.6392, longitude: -8.0029 },
  independence: '1960-09-22',
  topMajorCities: ['Bamako', 'Sikasso', 'Mopti', 'Koutiala', 'Kayes'],
  population: 23000000,
  mainLanguages: ['French', 'Bambara', 'Fula'],
  currency: 'West African CFA franc (XOF) — ECOWAS transition context',
  timezone: 'Africa/Bamako',
  foundingLeader: 'Modibo Keïta',
  currentLeader: 'Assimi Goïta (Colonel; transitional leadership)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'OTC'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['ML'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['ML'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['ML'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['ML'],
  newsOutlets: AU_NEWS_OUTLETS['ML'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['ML'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['ML'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['ML'],
  rareEarths: AU_RARE_EARTHS['ML'],
  stockExchange: 'Bourse des Valeurs du Mali (limited)',
  bondMarkets: AU_BOND_MARKETS['ML'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['ML'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['ML'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['ML'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['ML'],
}
