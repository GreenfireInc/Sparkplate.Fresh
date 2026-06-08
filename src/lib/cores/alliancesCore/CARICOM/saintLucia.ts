import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { CARICOM_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { CARICOM_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { CARICOM_NEWS_OUTLETS } from './newsOutletsByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CARICOM_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CARICOM_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CARICOM_RARE_EARTHS } from './rareEarthsByIso'
import { CARICOM_BOND_MARKETS } from './bondMarketsByIso'
import { CARICOM_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CARICOM_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { CARICOM_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const saintLucia: CaricomCountry = {
  name: 'Saint Lucia',
  iso3166Alpha2: 'LC',
  caricomStatus: 'full_member',
  capital: 'Castries',
  coordinates: { latitude: 14.0101, longitude: -60.9877 },
  independence: '1979-02-22',
  topMajorCities: ['Castries', 'Vieux Fort', 'Micoud', 'Soufrière', 'Dennery'],
  population: 180000,
  mainLanguages: ['English', 'Saint Lucian Creole French', 'French'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/St_Lucia',
  foundingLeader: 'John Compton (first Prime Minister)',
  currentLeader: 'Philip J. Pierre (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD peg; USDT/USDC',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['LC'],
  domesticPostService: CARICOM_DOMESTIC_POST_SERVICES['LC'],
  nationalBankingInstitutions: CARICOM_NATIONAL_BANKING_INSTITUTIONS['LC'],
  corporationFormationOffice: CARICOM_CORPORATION_FORMATION_OFFICES['LC'],
  newsOutlets: CARICOM_NEWS_OUTLETS['LC'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['LC'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['LC'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['LC'],
  rareEarths: CARICOM_RARE_EARTHS['LC'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
  bondMarkets: CARICOM_BOND_MARKETS['LC'],
  intellectualPropertyDepartments: CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS['LC'],
  securitiesExchangeCommission: CARICOM_SECURITIES_EXCHANGE_COMMISSIONS['LC'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['LC'],
  mainInternationalSeaport: CARICOM_MAIN_INTERNATIONAL_SEAPORTS['LC'],
}
