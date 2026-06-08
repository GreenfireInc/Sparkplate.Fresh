import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { CENSAD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { CENSAD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'
import { CENSAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CENSAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { CENSAD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const comoros: CensadCountry = {
  name: 'Comoros',
  iso3166Alpha2: 'KM',
  capital: 'Moroni',
  coordinates: { latitude: -11.6945, longitude: 43.2551 },
  independence: '1975-07-06 (from France)',
  topMajorCities: ['Moroni', 'Mutsamudu', 'Fomboni', 'Domoni', 'Ouani'],
  population: 867000,
  mainLanguages: ['Comorian (Shikomori)', 'Arabic', 'French'],
  currency: 'Comorian franc (KMF)',
  timezone: 'Indian/Comoro',
  foundingLeader: 'Ahmed Abdallah (first president post-independence)',
  currentLeader: 'President Azali Assoumani — verify',
  cryptocurrencyExchanges: ['Informal P2P'],
  stablecoin: 'Euro peg via KMF',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['KM'],
  domesticPostService: CENSAD_DOMESTIC_POST_SERVICES['KM'],
  nationalBankingInstitutions: CENSAD_NATIONAL_BANKING_INSTITUTIONS['KM'],
  corporationFormationOffice: CENSAD_CORPORATION_FORMATION_OFFICES['KM'],
  newsOutlets: CENSAD_NEWS_OUTLETS['KM'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['KM'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['KM'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['KM'],
  rareEarths: CENSAD_RARE_EARTHS['KM'],
  stockExchange: 'No national stock exchange',
  bondMarkets: CENSAD_BOND_MARKETS['KM'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['KM'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['KM'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['KM'],
  mainInternationalSeaport: CENSAD_MAIN_INTERNATIONAL_SEAPORTS['KM'],
}
