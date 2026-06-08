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

export const dominica: CommonwealthCountry = {
  name: 'Dominica',
  iso3166Alpha2: 'DM',
  commonwealthStatus: 'member',
  capital: 'Roseau',
  coordinates: { latitude: 15.3092, longitude: -61.3794 },
  independence: '1978-11-03',
  topMajorCities: ['Roseau', 'Portsmouth', 'Marigot', 'Mahaut', 'Saint Joseph'],
  population: 72000,
  mainLanguages: ['English', 'Dominican French Creole', 'Kokoy'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/Dominica',
  foundingLeader: 'Patrick John (first Prime Minister)',
  currentLeader: 'Roosevelt Skerrit (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD regional peg; USDT/USDC',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['DM'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['DM'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['DM'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['DM'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['DM'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['DM'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['DM'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['DM'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['DM'],
  stockExchange: 'Eastern Caribbean Securities Exchange (regional)',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['DM'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['DM'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['DM'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['DM'],
}
