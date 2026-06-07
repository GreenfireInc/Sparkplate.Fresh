import type { EacCountry } from './types'
import { EAC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EAC_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { EAC_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { EAC_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { EAC_NEWS_OUTLETS } from './newsOutletsByIso'
import { EAC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EAC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EAC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EAC_RARE_EARTHS } from './rareEarthsByIso'
import { EAC_BOND_MARKETS } from './bondMarketsByIso'
import { EAC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { EAC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { EAC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { EAC_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const uganda: EacCountry = {
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
  foundingLeader: 'Milton Obote (early Prime Minister era)',
  currentLeader: 'President Yoweri Museveni — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Chipper Cash'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: EAC_DOMESTIC_COURIERS['UG'],
  domesticPostService: EAC_DOMESTIC_POST_SERVICES['UG'],
  nationalBankingInstitutions: EAC_NATIONAL_BANKING_INSTITUTIONS['UG'],
  corporationFormationOffice: EAC_CORPORATION_FORMATION_OFFICES['UG'],
  newsOutlets: EAC_NEWS_OUTLETS['UG'],
  notableUniversities: EAC_NOTABLE_UNIVERSITIES['UG'],
  mainExportCommodities: EAC_MAIN_EXPORT_COMMODITIES['UG'],
  mainExportedElements: EAC_MAIN_EXPORTED_ELEMENTS['UG'],
  rareEarths: EAC_RARE_EARTHS['UG'],
  stockExchange: 'Uganda Securities Exchange',
  bondMarkets: EAC_BOND_MARKETS['UG'],
  intellectualPropertyDepartments: EAC_INTELLECTUAL_PROPERTY_DEPARTMENTS['UG'],

  securitiesExchangeCommission: EAC_SECURITIES_EXCHANGE_COMMISSIONS['UG'],
  mainInternationalAirport: EAC_MAIN_INTERNATIONAL_AIRPORTS['UG'],
  mainInternationalSeaport: EAC_MAIN_INTERNATIONAL_SEAPORTS['UG'],
}
