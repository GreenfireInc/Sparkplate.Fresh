import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { AU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { AU_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { AU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { AU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { AU_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export const uganda: AfricanUnionCountry = {
  name: 'Uganda',
  iso3166Alpha2: 'UG',
  africanUnionStatus: 'member',
  capital: 'Kampala',
  coordinates: { latitude: 0.3476, longitude: 32.5825 },
  independence: '1962-10-09',
  topMajorCities: ['Kampala', 'Nansana', 'Kira', 'Mbarara', 'Mukono'],
  population: 49000000,
  mainLanguages: ['English', 'Swahili', 'Luganda'],
  currency: 'Ugandan shilling (UGX)',
  timezone: 'Africa/Kampala',
  foundingLeader: 'Milton Obote',
  currentLeader: 'Yoweri Museveni (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Chipper Cash'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: AU_DOMESTIC_COURIERS['UG'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['UG'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['UG'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['UG'],
  newsOutlets: AU_NEWS_OUTLETS['UG'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['UG'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['UG'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['UG'],
  rareEarths: AU_RARE_EARTHS['UG'],
  stockExchange: 'Uganda Securities Exchange',
  bondMarkets: AU_BOND_MARKETS['UG'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['UG'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['UG'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['UG'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['UG'],
}
