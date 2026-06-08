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

export const barbados: CaricomCountry = {
  name: 'Barbados',
  iso3166Alpha2: 'BB',
  caricomStatus: 'full_member',
  capital: 'Bridgetown',
  coordinates: { latitude: 13.1, longitude: -59.6167 },
  independence: '1966-11-30',
  topMajorCities: ['Bridgetown', 'Speightstown', 'Oistins', 'Holetown', 'Bathsheba'],
  population: 282000,
  mainLanguages: ['English', 'Bajan Creole', 'Portuguese (small)'],
  currency: 'Barbadian dollar (BBD)',
  timezone: 'America/Barbados',
  foundingLeader: 'Errol Barrow (first Prime Minister)',
  currentLeader: 'Mia Mottley (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'BBD peg to USD; USDT/USDC',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['BB'],
  domesticPostService: CARICOM_DOMESTIC_POST_SERVICES['BB'],
  nationalBankingInstitutions: CARICOM_NATIONAL_BANKING_INSTITUTIONS['BB'],
  corporationFormationOffice: CARICOM_CORPORATION_FORMATION_OFFICES['BB'],
  newsOutlets: CARICOM_NEWS_OUTLETS['BB'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['BB'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['BB'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['BB'],
  rareEarths: CARICOM_RARE_EARTHS['BB'],
  stockExchange: 'Barbados Stock Exchange',
  bondMarkets: CARICOM_BOND_MARKETS['BB'],
  intellectualPropertyDepartments: CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS['BB'],
  securitiesExchangeCommission: CARICOM_SECURITIES_EXCHANGE_COMMISSIONS['BB'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['BB'],
  mainInternationalSeaport: CARICOM_MAIN_INTERNATIONAL_SEAPORTS['BB'],
}
