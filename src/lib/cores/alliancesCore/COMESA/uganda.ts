import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { COMESA_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { COMESA_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMESA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMESA_RARE_EARTHS } from './rareEarthsByIso'
import { COMESA_BOND_MARKETS } from './bondMarketsByIso'
import { COMESA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMESA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { COMESA_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const uganda: ComesaCountry = {
  name: 'Uganda',
  iso3166Alpha2: 'UG',
  capital: 'Kampala',
  coordinates: { latitude: 0.3476, longitude: 32.5825 },
  independence: '1962-10-09',
  topMajorCities: ['Kampala', 'Nansana', 'Kira', 'Mbarara', 'Mukono'],
  population: 49000000,
  mainLanguages: ['English', 'Swahili', 'Luganda'],
  currency: 'Ugandan shilling (UGX)',
  timezone: 'Africa/Kampala',
  foundingLeader: 'Milton Obote (first Prime Minister era)',
  currentLeader: 'President Yoweri Museveni — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Chipper Cash'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['UG'],
  domesticPostService: COMESA_DOMESTIC_POST_SERVICES['UG'],
  nationalBankingInstitutions: COMESA_NATIONAL_BANKING_INSTITUTIONS['UG'],
  corporationFormationOffice: COMESA_CORPORATION_FORMATION_OFFICES['UG'],
  newsOutlets: COMESA_NEWS_OUTLETS['UG'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['UG'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['UG'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['UG'],
  rareEarths: COMESA_RARE_EARTHS['UG'],
  stockExchange: 'Uganda Securities Exchange',
  bondMarkets: COMESA_BOND_MARKETS['UG'],
  intellectualPropertyDepartments: COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS['UG'],
  securitiesExchangeCommission: COMESA_SECURITIES_EXCHANGE_COMMISSIONS['UG'],
  mainInternationalAirport: COMESA_MAIN_INTERNATIONAL_AIRPORTS['UG'],
  mainInternationalSeaport: COMESA_MAIN_INTERNATIONAL_SEAPORTS['UG'],
}
