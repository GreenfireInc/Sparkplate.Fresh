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

export const haiti: CaricomCountry = {
  name: 'Haiti',
  iso3166Alpha2: 'HT',
  caricomStatus: 'full_member',
  capital: 'Port-au-Prince',
  coordinates: { latitude: 18.5944, longitude: -72.3074 },
  independence: '1804-01-01',
  topMajorCities: ['Port-au-Prince', 'Cap-Haïtien', 'Les Cayes', 'Jacmel', 'Gonaïves'],
  population: 11500000,
  mainLanguages: ['French', 'Haitian Creole', 'English (limited)'],
  currency: 'Haitian gourde (HTG)',
  timezone: 'America/Port-au-Prince',
  foundingLeader: 'Jean-Jacques Dessalines (independence era)',
  currentLeader: 'Transitional context — verify official Head of State',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal; HTG volatility — verify',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['HT'],
  domesticPostService: CARICOM_DOMESTIC_POST_SERVICES['HT'],
  nationalBankingInstitutions: CARICOM_NATIONAL_BANKING_INSTITUTIONS['HT'],
  corporationFormationOffice: CARICOM_CORPORATION_FORMATION_OFFICES['HT'],
  newsOutlets: CARICOM_NEWS_OUTLETS['HT'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['HT'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['HT'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['HT'],
  rareEarths: CARICOM_RARE_EARTHS['HT'],
  stockExchange: 'No major national exchange — informational',
  bondMarkets: CARICOM_BOND_MARKETS['HT'],
  intellectualPropertyDepartments: CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS['HT'],
  securitiesExchangeCommission: CARICOM_SECURITIES_EXCHANGE_COMMISSIONS['HT'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['HT'],
  mainInternationalSeaport: CARICOM_MAIN_INTERNATIONAL_SEAPORTS['HT'],
}
