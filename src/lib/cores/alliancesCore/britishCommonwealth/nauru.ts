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

export const nauru: CommonwealthCountry = {
  name: 'Nauru',
  iso3166Alpha2: 'NR',
  commonwealthStatus: 'member',
  capital: 'Yaren (de facto)',
  coordinates: { latitude: -0.522778, longitude: 166.931503 },
  independence: '1968-01-31',
  topMajorCities: ['Denigomodu', 'Meneng', 'Aiwo', 'Anabar', 'Boe'],
  population: 13000,
  mainLanguages: ['English', 'Nauruan', 'Pacific Creole'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Pacific/Nauru',
  foundingLeader: 'Hammer DeRoburt (first President)',
  currentLeader: 'David Adeang (President) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'AUD; USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['NR'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['NR'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['NR'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['NR'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['NR'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['NR'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['NR'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['NR'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['NR'],
  stockExchange: 'No national stock exchange — informational',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['NR'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['NR'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['NR'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['NR'],
}
