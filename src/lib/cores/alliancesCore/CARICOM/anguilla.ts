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

export const anguilla: CaricomCountry = {
  name: 'Anguilla',
  iso3166Alpha2: 'AI',
  caricomStatus: 'associate_member',
  capital: 'The Valley',
  coordinates: { latitude: 18.2206, longitude: -63.0686 },
  independence: 'British Overseas Territory (UK); associate CARICOM member',
  topMajorCities: ['The Valley', 'Stoney Ground', 'Island Harbour', 'Blowing Point', 'Sandy Ground'],
  population: 16000,
  mainLanguages: ['English', 'Anguillian Creole', 'Spanish (regional)'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/Anguilla',
  foundingLeader: 'Chief Minister era — verify',
  currentLeader: 'Premier — verify; Governor (UK) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD peg; USDT informal',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['AI'],
  domesticPostService: CARICOM_DOMESTIC_POST_SERVICES['AI'],
  nationalBankingInstitutions: CARICOM_NATIONAL_BANKING_INSTITUTIONS['AI'],
  corporationFormationOffice: CARICOM_CORPORATION_FORMATION_OFFICES['AI'],
  newsOutlets: CARICOM_NEWS_OUTLETS['AI'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['AI'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['AI'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['AI'],
  rareEarths: CARICOM_RARE_EARTHS['AI'],
  stockExchange: 'No national exchange — informational',
  bondMarkets: CARICOM_BOND_MARKETS['AI'],
  intellectualPropertyDepartments: CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS['AI'],
  securitiesExchangeCommission: CARICOM_SECURITIES_EXCHANGE_COMMISSIONS['AI'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['AI'],
  mainInternationalSeaport: CARICOM_MAIN_INTERNATIONAL_SEAPORTS['AI'],
}
