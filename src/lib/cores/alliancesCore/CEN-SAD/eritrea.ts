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

export const eritrea: CensadCountry = {
  name: 'Eritrea',
  iso3166Alpha2: 'ER',
  capital: 'Asmara',
  coordinates: { latitude: 15.3229, longitude: 38.9251 },
  independence: '1993-05-24 (referendum from Ethiopia)',
  topMajorCities: ['Asmara', 'Keren', 'Massawa', 'Assab', 'Mendefera'],
  population: 3740000,
  mainLanguages: ['Tigrinya', 'Arabic', 'English'],
  currency: 'Nakfa (ERN)',
  timezone: 'Africa/Asmara',
  foundingLeader: 'Isaias Afwerki (EPLF leadership to presidency)',
  currentLeader: 'President Isaias Afwerki — verify',
  cryptocurrencyExchanges: ['Very limited formal footprint; diaspora OTC'],
  stablecoin: 'Informal USD economy alongside ERN',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['ER'],
  domesticPostService: CENSAD_DOMESTIC_POST_SERVICES['ER'],
  nationalBankingInstitutions: CENSAD_NATIONAL_BANKING_INSTITUTIONS['ER'],
  corporationFormationOffice: CENSAD_CORPORATION_FORMATION_OFFICES['ER'],
  newsOutlets: CENSAD_NEWS_OUTLETS['ER'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['ER'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['ER'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['ER'],
  rareEarths: CENSAD_RARE_EARTHS['ER'],
  stockExchange: 'No national stock exchange',
  bondMarkets: CENSAD_BOND_MARKETS['ER'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['ER'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['ER'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['ER'],
  mainInternationalSeaport: CENSAD_MAIN_INTERNATIONAL_SEAPORTS['ER'],
}
