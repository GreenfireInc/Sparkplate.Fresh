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

export const zambia: CommonwealthCountry = {
  name: 'Zambia',
  iso3166Alpha2: 'ZM',
  commonwealthStatus: 'member',
  capital: 'Lusaka',
  coordinates: { latitude: -15.3875, longitude: 28.3228 },
  independence: '1964-10-24',
  topMajorCities: ['Lusaka', 'Kitwe', 'Ndola', 'Kabwe', 'Chingola'],
  population: 20000000,
  mainLanguages: ['English', 'Bemba', 'Nyanja'],
  currency: 'Zambian kwacha (ZMW)',
  timezone: 'Africa/Lusaka',
  foundingLeader: 'Kenneth Kaunda (first President)',
  currentLeader: 'Hakainde Hichilema (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['ZM'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['ZM'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['ZM'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['ZM'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['ZM'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['ZM'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['ZM'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['ZM'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['ZM'],
  stockExchange: 'Lusaka Securities Exchange',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['ZM'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['ZM'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['ZM'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['ZM'],
}
