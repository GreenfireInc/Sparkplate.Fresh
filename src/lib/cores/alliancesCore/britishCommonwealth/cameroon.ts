import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { COMMONWEALTH_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const cameroon: CommonwealthCountry = {
  name: 'Cameroon',
  iso3166Alpha2: 'CM',
  commonwealthStatus: 'member',
  capital: 'Yaoundé',
  coordinates: { latitude: 3.848, longitude: 11.5021 },
  independence: '1960-01-01 (French); 1961-10-01 (union)',
  topMajorCities: ['Douala', 'Yaoundé', 'Garoua', 'Bafoussam', 'Bamenda'],
  population: 28500000,
  mainLanguages: ['French', 'English', 'Fulfulde'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Douala',
  foundingLeader: 'Ahmadou Ahidjo (first President)',
  currentLeader: 'Paul Biya (President) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XAF peg to EUR; USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['CM'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['CM'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['CM'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['CM'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['CM'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['CM'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['CM'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['CM'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['CM'],
  stockExchange: 'Douala Stock Exchange',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['CM'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['CM'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['CM'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['CM'],
}
