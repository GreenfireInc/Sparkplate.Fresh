import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CPTPP_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { CPTPP_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { CPTPP_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { CPTPP_NEWS_OUTLETS } from './newsOutletsByIso'
import { CPTPP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CPTPP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CPTPP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CPTPP_RARE_EARTHS } from './rareEarthsByIso'
import { CPTPP_BOND_MARKETS } from './bondMarketsByIso'
import { CPTPP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CPTPP_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { CPTPP_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const peru: CptppCountry = {
  name: 'Peru',
  iso3166Alpha2: 'PE',
  capital: 'Lima',
  coordinates: { latitude: -12.0464, longitude: -77.0428 },
  independence: '1821-07-28 (Spain — national day)',
  topMajorCities: ['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Huancayo'],
  population: 34000000,
  mainLanguages: ['Spanish', 'Quechua', 'Aymara'],
  currency: 'Peruvian sol (PEN)',
  timezone: 'America/Lima',
  foundingLeader: 'José de San Martín / independence cohort — informational',
  currentLeader:
    'President — verify (transitional administrations and 2026 general election cycles — informational)',
  cryptocurrencyExchanges: ['Buda.com (cross-border LATAM)', 'OTC predominant'],
  stablecoin: 'USDT/USDC informal',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['PE'],
  domesticPostService: CPTPP_DOMESTIC_POST_SERVICES['PE'],
  nationalBankingInstitutions: CPTPP_NATIONAL_BANKING_INSTITUTIONS['PE'],
  corporationFormationOffice: CPTPP_CORPORATION_FORMATION_OFFICES['PE'],
  newsOutlets: CPTPP_NEWS_OUTLETS['PE'],
  notableUniversities: CPTPP_NOTABLE_UNIVERSITIES['PE'],
  mainExportCommodities: CPTPP_MAIN_EXPORT_COMMODITIES['PE'],
  mainExportedElements: CPTPP_MAIN_EXPORTED_ELEMENTS['PE'],
  rareEarths: CPTPP_RARE_EARTHS['PE'],
  stockExchange: 'Lima Stock Exchange (Bolsa de Valores de Lima)',
  bondMarkets: CPTPP_BOND_MARKETS['PE'],
  intellectualPropertyDepartments: CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS['PE'],
  securitiesExchangeCommission: CPTPP_SECURITIES_EXCHANGE_COMMISSIONS['PE'],
  mainInternationalAirport: CPTPP_MAIN_INTERNATIONAL_AIRPORTS['PE'],
  mainInternationalSeaport: CPTPP_MAIN_INTERNATIONAL_SEAPORTS['PE'],
}
