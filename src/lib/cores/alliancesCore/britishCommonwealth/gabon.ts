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

export const gabon: CommonwealthCountry = {
  name: 'Gabon',
  iso3166Alpha2: 'GA',
  commonwealthStatus: 'member',
  capital: 'Libreville',
  coordinates: { latitude: 0.4162, longitude: 9.4673 },
  independence: '1960-08-17',
  topMajorCities: ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda'],
  population: 2400000,
  mainLanguages: ['French', 'Fang', 'Myene'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Libreville',
  foundingLeader: 'Léon M\'ba (first President)',
  currentLeader: 'Brice Clotaire Oligui Nguema (Transitional) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XAF peg; USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['GA'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['GA'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['GA'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['GA'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['GA'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['GA'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['GA'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['GA'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['GA'],
  stockExchange: 'Bourse des Valeurs Mobilières de l\'Afrique Centrale (regional)',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['GA'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['GA'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['GA'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['GA'],
}
