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

export const rwanda: EacCountry = {
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
  stablecoin: 'USDT / USDC; CBDC narratives — verify',
  domesticCourierServices: EAC_DOMESTIC_COURIERS['RW'],
  domesticPostService: EAC_DOMESTIC_POST_SERVICES['RW'],
  nationalBankingInstitutions: EAC_NATIONAL_BANKING_INSTITUTIONS['RW'],
  corporationFormationOffice: EAC_CORPORATION_FORMATION_OFFICES['RW'],
  newsOutlets: EAC_NEWS_OUTLETS['RW'],
  notableUniversities: EAC_NOTABLE_UNIVERSITIES['RW'],
  mainExportCommodities: EAC_MAIN_EXPORT_COMMODITIES['RW'],
  mainExportedElements: EAC_MAIN_EXPORTED_ELEMENTS['RW'],
  rareEarths: EAC_RARE_EARTHS['RW'],
  stockExchange: 'Rwanda Stock Exchange',
  bondMarkets: EAC_BOND_MARKETS['RW'],
  intellectualPropertyDepartments: EAC_INTELLECTUAL_PROPERTY_DEPARTMENTS['RW'],

  securitiesExchangeCommission: EAC_SECURITIES_EXCHANGE_COMMISSIONS['RW'],
  mainInternationalAirport: EAC_MAIN_INTERNATIONAL_AIRPORTS['RW'],
  mainInternationalSeaport: EAC_MAIN_INTERNATIONAL_SEAPORTS['RW'],
}
