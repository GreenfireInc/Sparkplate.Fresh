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

export const saintVincentAndTheGrenadines: CaricomCountry = {
  name: 'Saint Vincent and the Grenadines',
  iso3166Alpha2: 'VC',
  caricomStatus: 'full_member',
  capital: 'Kingstown',
  coordinates: { latitude: 13.1587, longitude: -61.2248 },
  independence: '1979-10-27',
  topMajorCities: ['Kingstown', 'Georgetown', 'Barrouallie', 'Port Elizabeth', 'Layou'],
  population: 110000,
  mainLanguages: ['English', 'Vincentian Creole', 'French patois (historical)'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/St_Vincent',
  foundingLeader: 'Milton Cato (first Prime Minister)',
  currentLeader: 'Ralph Gonsalves (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD peg; USDT/USDC',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['VC'],
  domesticPostService: CARICOM_DOMESTIC_POST_SERVICES['VC'],
  nationalBankingInstitutions: CARICOM_NATIONAL_BANKING_INSTITUTIONS['VC'],
  corporationFormationOffice: CARICOM_CORPORATION_FORMATION_OFFICES['VC'],
  newsOutlets: CARICOM_NEWS_OUTLETS['VC'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['VC'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['VC'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['VC'],
  rareEarths: CARICOM_RARE_EARTHS['VC'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
  bondMarkets: CARICOM_BOND_MARKETS['VC'],
  intellectualPropertyDepartments: CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS['VC'],
  securitiesExchangeCommission: CARICOM_SECURITIES_EXCHANGE_COMMISSIONS['VC'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['VC'],
  mainInternationalSeaport: CARICOM_MAIN_INTERNATIONAL_SEAPORTS['VC'],
}
