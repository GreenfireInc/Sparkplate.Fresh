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

export const rwanda: ComesaCountry = {
  name: 'Rwanda',
  iso3166Alpha2: 'RW',
  capital: 'Kigali',
  coordinates: { latitude: -1.9441, longitude: 30.0619 },
  independence: '1962-07-01',
  topMajorCities: ['Kigali', 'Huye (Butare)', 'Muhanga (Gitarama)', 'Musanze', 'Rusizi'],
  population: 14000000,
  mainLanguages: ['Kinyarwanda', 'French', 'English'],
  currency: 'Rwandan franc (RWF)',
  timezone: 'Africa/Kigali',
  foundingLeader: 'Grégoire Kayibanda (first President)',
  currentLeader: 'President Paul Kagame — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Kigali fintech hubs'],
  stablecoin: 'USDT / USDC; CBDC explorations — verify',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['RW'],
  domesticPostService: COMESA_DOMESTIC_POST_SERVICES['RW'],
  nationalBankingInstitutions: COMESA_NATIONAL_BANKING_INSTITUTIONS['RW'],
  corporationFormationOffice: COMESA_CORPORATION_FORMATION_OFFICES['RW'],
  newsOutlets: COMESA_NEWS_OUTLETS['RW'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['RW'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['RW'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['RW'],
  rareEarths: COMESA_RARE_EARTHS['RW'],
  stockExchange: 'Rwanda Stock Exchange',
  bondMarkets: COMESA_BOND_MARKETS['RW'],
  intellectualPropertyDepartments: COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS['RW'],
  securitiesExchangeCommission: COMESA_SECURITIES_EXCHANGE_COMMISSIONS['RW'],
  mainInternationalAirport: COMESA_MAIN_INTERNATIONAL_AIRPORTS['RW'],
  mainInternationalSeaport: COMESA_MAIN_INTERNATIONAL_SEAPORTS['RW'],
}
