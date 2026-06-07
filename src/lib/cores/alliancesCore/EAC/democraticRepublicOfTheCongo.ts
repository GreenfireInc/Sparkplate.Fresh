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

export const democraticRepublicOfTheCongo: EacCountry = {
  name: 'Democratic Republic of the Congo',
  iso3166Alpha2: 'CD',
  capital: 'Kinshasa',
  coordinates: { latitude: -4.3276, longitude: 15.3136 },
  independence: '1960-06-30',
  topMajorCities: ['Kinshasa', 'Lubumbashi', 'Mbuji-Mayi', 'Kisangani', 'Kananga'],
  population: 105000000,
  mainLanguages: ['French', 'Lingala', 'Swahili'],
  currency: 'Congolese franc (CDF)',
  timezone: 'Africa/Kinshasa',
  foundingLeader: 'Joseph Kasa-Vubu (President); Patrice Lumumba (Prime Minister)',
  currentLeader: 'President Félix Tshisekedi — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC widespread P2P',
  domesticCourierServices: EAC_DOMESTIC_COURIERS['CD'],
  domesticPostService: EAC_DOMESTIC_POST_SERVICES['CD'],
  nationalBankingInstitutions: EAC_NATIONAL_BANKING_INSTITUTIONS['CD'],
  corporationFormationOffice: EAC_CORPORATION_FORMATION_OFFICES['CD'],
  newsOutlets: EAC_NEWS_OUTLETS['CD'],
  notableUniversities: EAC_NOTABLE_UNIVERSITIES['CD'],
  mainExportCommodities: EAC_MAIN_EXPORT_COMMODITIES['CD'],
  mainExportedElements: EAC_MAIN_EXPORTED_ELEMENTS['CD'],
  rareEarths: EAC_RARE_EARTHS['CD'],
  stockExchange: 'Domestic equities thin — informal OTC and regional linkage',
  bondMarkets: EAC_BOND_MARKETS['CD'],
  intellectualPropertyDepartments: EAC_INTELLECTUAL_PROPERTY_DEPARTMENTS['CD'],

  securitiesExchangeCommission: EAC_SECURITIES_EXCHANGE_COMMISSIONS['CD'],
  mainInternationalAirport: EAC_MAIN_INTERNATIONAL_AIRPORTS['CD'],
  mainInternationalSeaport: EAC_MAIN_INTERNATIONAL_SEAPORTS['CD'],
}
