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

export const lesotho: CommonwealthCountry = {
  name: 'Lesotho',
  iso3166Alpha2: 'LS',
  commonwealthStatus: 'member',
  capital: 'Maseru',
  coordinates: { latitude: -29.31, longitude: 27.48 },
  independence: '1966-10-04',
  topMajorCities: ['Maseru', 'Teyateyaneng', 'Mafeteng', 'Hlotse', 'Mohale\'s Hoek'],
  population: 2300000,
  mainLanguages: ['Sesotho', 'English', 'Zulu'],
  currency: 'Lesotho loti (LSL); South African rand circulates',
  timezone: 'Africa/Maseru',
  foundingLeader: 'Moshoeshoe II (King); Chief Leabua Jonathan (PM era)',
  currentLeader: 'Sam Matekane (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['LS'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['LS'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['LS'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['LS'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['LS'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['LS'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['LS'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['LS'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['LS'],
  stockExchange: 'Maseru Securities Market',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['LS'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['LS'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['LS'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['LS'],
}
