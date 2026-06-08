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

export const caymanIslands: CaricomCountry = {
  name: 'Cayman Islands',
  iso3166Alpha2: 'KY',
  caricomStatus: 'associate_member',
  capital: 'George Town',
  coordinates: { latitude: 19.3133, longitude: -81.2546 },
  independence: 'British Overseas Territory (UK); associate CARICOM member',
  topMajorCities: ['George Town', 'West Bay', 'Bodden Town', 'East End', 'North Side'],
  population: 69000,
  mainLanguages: ['English', 'Jamaican Creole (community)', 'Spanish'],
  currency: 'Cayman Islands dollar (KYD); USD widely used',
  timezone: 'America/Cayman',
  foundingLeader: 'Chief Minister era — verify',
  currentLeader: 'Premier — verify; Governor (UK) — verify',
  cryptocurrencyExchanges: ['CIMA-regulated entities', 'Offshore funds — verify'],
  stablecoin: 'KYD/USD peg; USDT in offshore context',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['KY'],
  domesticPostService: CARICOM_DOMESTIC_POST_SERVICES['KY'],
  nationalBankingInstitutions: CARICOM_NATIONAL_BANKING_INSTITUTIONS['KY'],
  corporationFormationOffice: CARICOM_CORPORATION_FORMATION_OFFICES['KY'],
  newsOutlets: CARICOM_NEWS_OUTLETS['KY'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['KY'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['KY'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['KY'],
  rareEarths: CARICOM_RARE_EARTHS['KY'],
  stockExchange: 'Cayman Islands Stock Exchange (CSX)',
  bondMarkets: CARICOM_BOND_MARKETS['KY'],
  intellectualPropertyDepartments: CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS['KY'],
  securitiesExchangeCommission: CARICOM_SECURITIES_EXCHANGE_COMMISSIONS['KY'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['KY'],
  mainInternationalSeaport: CARICOM_MAIN_INTERNATIONAL_SEAPORTS['KY'],
}
