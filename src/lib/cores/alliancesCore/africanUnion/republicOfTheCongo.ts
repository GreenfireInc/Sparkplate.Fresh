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
export const republicOfTheCongo: AfricanUnionCountry = {
  name: 'Republic of the Congo',
  iso3166Alpha2: 'CG',
  africanUnionStatus: 'member',
  capital: 'Brazzaville',
  coordinates: { latitude: -4.2634, longitude: 15.2429 },
  independence: '1960-08-15',
  topMajorCities: ['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Nkayi', 'Owando'],
  population: 6100000,
  mainLanguages: ['French', 'Lingala', 'Kituba'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Brazzaville',
  foundingLeader: 'Fulbert Youlou',
  currentLeader: 'Denis Sassou Nguesso (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC'],
  stablecoin: 'USDT P2P; XAF peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['CG'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['CG'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['CG'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['CG'],
  newsOutlets: AU_NEWS_OUTLETS['CG'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['CG'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['CG'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['CG'],
  rareEarths: AU_RARE_EARTHS['CG'],
  stockExchange: 'Bourse des Valeurs du Congo (BVC)',
  bondMarkets: AU_BOND_MARKETS['CG'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['CG'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['CG'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['CG'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['CG'],
}
