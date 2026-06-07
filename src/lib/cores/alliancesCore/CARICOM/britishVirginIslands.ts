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

export const britishVirginIslands: CaricomCountry = {
  name: 'British Virgin Islands',
  iso3166Alpha2: 'VG',
  caricomStatus: 'associate_member',
  capital: 'Road Town',
  coordinates: { latitude: 18.4289, longitude: -64.6185 },
  independence: 'British Overseas Territory (UK); associate CARICOM member',
  topMajorCities: ['Road Town', 'Spanish Town', 'East End', 'West End', 'The Settlement'],
  population: 30000,
  mainLanguages: ['English', 'Virgin Islands Creole', 'Spanish'],
  currency: 'United States dollar (USD)',
  timezone: 'America/Tortola',
  foundingLeader: 'Chief Minister era — verify',
  currentLeader: 'Premier — verify; Governor (UK) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Offshore crypto funds context — verify'],
  stablecoin: 'USD; USDT/USDC common',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['VG'],
  domesticPostService: CARICOM_DOMESTIC_POST_SERVICES['VG'],
  nationalBankingInstitutions: CARICOM_NATIONAL_BANKING_INSTITUTIONS['VG'],
  corporationFormationOffice: CARICOM_CORPORATION_FORMATION_OFFICES['VG'],
  newsOutlets: CARICOM_NEWS_OUTLETS['VG'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['VG'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['VG'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['VG'],
  rareEarths: CARICOM_RARE_EARTHS['VG'],
  stockExchange: 'BVI finance centre; no large local bourse like major markets',
  bondMarkets: CARICOM_BOND_MARKETS['VG'],
  intellectualPropertyDepartments: CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS['VG'],
  securitiesExchangeCommission: CARICOM_SECURITIES_EXCHANGE_COMMISSIONS['VG'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['VG'],
  mainInternationalSeaport: CARICOM_MAIN_INTERNATIONAL_SEAPORTS['VG'],
}
