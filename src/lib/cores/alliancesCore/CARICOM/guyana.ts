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

export const guyana: CaricomCountry = {
  name: 'Guyana',
  iso3166Alpha2: 'GY',
  caricomStatus: 'full_member',
  capital: 'Georgetown',
  coordinates: { latitude: 6.8013, longitude: -58.1551 },
  independence: '1966-05-26',
  topMajorCities: ['Georgetown', 'Linden', 'New Amsterdam', 'Bartica', 'Skeldon'],
  population: 800000,
  mainLanguages: ['English', 'Guyanese Creole', 'Hindi'],
  currency: 'Guyanese dollar (GYD)',
  timezone: 'America/Guyana',
  foundingLeader: 'Forbes Burnham (Executive President era)',
  currentLeader: 'Irfaan Ali (President)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['GY'],
  domesticPostService: CARICOM_DOMESTIC_POST_SERVICES['GY'],
  nationalBankingInstitutions: CARICOM_NATIONAL_BANKING_INSTITUTIONS['GY'],
  corporationFormationOffice: CARICOM_CORPORATION_FORMATION_OFFICES['GY'],
  newsOutlets: CARICOM_NEWS_OUTLETS['GY'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['GY'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['GY'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['GY'],
  rareEarths: CARICOM_RARE_EARTHS['GY'],
  stockExchange: 'Guyana Stock Exchange',
  bondMarkets: CARICOM_BOND_MARKETS['GY'],
  intellectualPropertyDepartments: CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS['GY'],
  securitiesExchangeCommission: CARICOM_SECURITIES_EXCHANGE_COMMISSIONS['GY'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['GY'],
  mainInternationalSeaport: CARICOM_MAIN_INTERNATIONAL_SEAPORTS['GY'],
}
