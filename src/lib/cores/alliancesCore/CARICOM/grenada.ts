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

export const grenada: CaricomCountry = {
  name: 'Grenada',
  iso3166Alpha2: 'GD',
  caricomStatus: 'full_member',
  capital: 'St. George\'s',
  coordinates: { latitude: 12.0564, longitude: -61.7485 },
  independence: '1974-02-07',
  topMajorCities: ['St. George\'s', 'Gouyave', 'Grenville', 'Victoria', 'Sauteurs'],
  population: 126000,
  mainLanguages: ['English', 'Grenadian Creole French', 'Patois'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/Grenada',
  foundingLeader: 'Eric Gairy (first Prime Minister)',
  currentLeader: 'Dickon Mitchell (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD peg; USDT/USDC',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['GD'],
  domesticPostService: CARICOM_DOMESTIC_POST_SERVICES['GD'],
  nationalBankingInstitutions: CARICOM_NATIONAL_BANKING_INSTITUTIONS['GD'],
  corporationFormationOffice: CARICOM_CORPORATION_FORMATION_OFFICES['GD'],
  newsOutlets: CARICOM_NEWS_OUTLETS['GD'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['GD'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['GD'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['GD'],
  rareEarths: CARICOM_RARE_EARTHS['GD'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
  bondMarkets: CARICOM_BOND_MARKETS['GD'],
  intellectualPropertyDepartments: CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS['GD'],
  securitiesExchangeCommission: CARICOM_SECURITIES_EXCHANGE_COMMISSIONS['GD'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['GD'],
  mainInternationalSeaport: CARICOM_MAIN_INTERNATIONAL_SEAPORTS['GD'],
}
