import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { RCEP_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { RCEP_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { RCEP_NEWS_OUTLETS } from './newsOutletsByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { RCEP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { RCEP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { RCEP_RARE_EARTHS } from './rareEarthsByIso'
import { RCEP_BOND_MARKETS } from './bondMarketsByIso'
import { RCEP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { RCEP_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { RCEP_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { RCEP_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const japan: RcepCountry = {
  name: 'Japan',
  iso3166Alpha2: 'JP',
  capital: 'Tokyo',
  coordinates: { latitude: 35.6762, longitude: 139.6503 },
  independence:
    'Meiji-state continuity; constitution 1947; RCEP Party (East Asia supply-chain integration 2022 tranche — informational)',
  topMajorCities: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo'],
  population: 124500000,
  mainLanguages: ['Japanese', 'Korean (community)', 'English (education / business)'],
  currency: 'Japanese yen (JPY)',
  timezone: 'Asia/Tokyo',
  foundingLeader: 'Yoshida Shigeru post-war trade-liberalisation reference — informational',
  currentLeader:
    'Emperor Naruhito; Prime Minister — verify (cabinet reshuffle cycles)',
  cryptocurrencyExchanges: ['bitFlyer', 'Coincheck PSAP-registered narratives — informational'],
  stablecoin: 'JPY-stable experiments; Bank of Japan pilots — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['JP'],
  domesticPostService: RCEP_DOMESTIC_POST_SERVICES['JP'],
  nationalBankingInstitutions: RCEP_NATIONAL_BANKING_INSTITUTIONS['JP'],
  corporationFormationOffice: RCEP_CORPORATION_FORMATION_OFFICES['JP'],
  newsOutlets: RCEP_NEWS_OUTLETS['JP'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['JP'],
  mainExportCommodities: RCEP_MAIN_EXPORT_COMMODITIES['JP'],
  mainExportedElements: RCEP_MAIN_EXPORTED_ELEMENTS['JP'],
  rareEarths: RCEP_RARE_EARTHS['JP'],
  stockExchange: 'Tokyo Stock Exchange (Japan Exchange Group)',
  bondMarkets: RCEP_BOND_MARKETS['JP'],
  mainInternationalAirport: RCEP_MAIN_INTERNATIONAL_AIRPORTS['JP'],
  mainInternationalSeaport: RCEP_MAIN_INTERNATIONAL_SEAPORTS['JP'],
  intellectualPropertyDepartments: RCEP_INTELLECTUAL_PROPERTY_DEPARTMENTS['JP'],
  securitiesExchangeCommission: RCEP_SECURITIES_EXCHANGE_COMMISSIONS['JP'],
}
