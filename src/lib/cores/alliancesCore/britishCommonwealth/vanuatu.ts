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

export const vanuatu: CommonwealthCountry = {
  name: 'Vanuatu',
  iso3166Alpha2: 'VU',
  commonwealthStatus: 'member',
  capital: 'Port Vila',
  coordinates: { latitude: -17.7333, longitude: 168.3273 },
  independence: '1980-07-30',
  topMajorCities: ['Port Vila', 'Luganville', 'Norsup', 'Isangel', 'Sola'],
  population: 320000,
  mainLanguages: ['Bislama', 'English', 'French'],
  currency: 'Vanuatu vatu (VUV)',
  timezone: 'Pacific/Efate',
  foundingLeader: 'Walter Lini (first Prime Minister)',
  currentLeader: 'Charlot Salwai (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['VU'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['VU'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['VU'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['VU'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['VU'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['VU'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['VU'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['VU'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['VU'],
  stockExchange: 'Vanuatu Securities Exchange',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['VU'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['VU'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['VU'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['VU'],
}
