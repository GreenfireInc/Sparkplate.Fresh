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

export const tanzania: CommonwealthCountry = {
  name: 'Tanzania',
  iso3166Alpha2: 'TZ',
  commonwealthStatus: 'member',
  capital: 'Dodoma (official); Dar es Salaam (largest)',
  coordinates: { latitude: -6.7924, longitude: 39.2083 },
  independence: '1961-12-09 (Tanganyika); 1964-04-26 (union)',
  topMajorCities: ['Dar es Salaam', 'Mwanza', 'Dodoma', 'Arusha', 'Mbeya'],
  population: 67000000,
  mainLanguages: ['Swahili', 'English', 'Arabic (coastal)'],
  currency: 'Tanzanian shilling (TZS)',
  timezone: 'Africa/Dar_es_Salaam',
  foundingLeader: 'Julius Nyerere (first President)',
  currentLeader: 'Samia Suluhu Hassan (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['TZ'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['TZ'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['TZ'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['TZ'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['TZ'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['TZ'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['TZ'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['TZ'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['TZ'],
  stockExchange: 'Dar es Salaam Stock Exchange',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['TZ'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['TZ'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['TZ'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['TZ'],
}
