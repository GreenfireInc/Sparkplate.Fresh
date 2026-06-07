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
export const democraticRepublicOfTheCongo: AfricanUnionCountry = {
  name: 'Democratic Republic of the Congo',
  iso3166Alpha2: 'CD',
  africanUnionStatus: 'member',
  capital: 'Kinshasa',
  coordinates: { latitude: -4.3276, longitude: 15.3136 },
  independence: '1960-06-30',
  topMajorCities: ['Kinshasa', 'Lubumbashi', 'Mbuji-Mayi', 'Kisangani', 'Kananga'],
  population: 105000000,
  mainLanguages: ['French', 'Lingala', 'Swahili'],
  currency: 'Congolese franc (CDF)',
  timezone: 'Africa/Kinshasa',
  foundingLeader: 'Joseph Kasa-Vubu (President); Patrice Lumumba (Prime Minister)',
  currentLeader: 'Félix Tshisekedi (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC widespread P2P; no official CDF stablecoin',
  domesticCourierServices: AU_DOMESTIC_COURIERS['CD'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['CD'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['CD'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['CD'],
  newsOutlets: AU_NEWS_OUTLETS['CD'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['CD'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['CD'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['CD'],
  rareEarths: AU_RARE_EARTHS['CD'],
  stockExchange: 'No liquid national exchange; informal OTC and regional listings',
  bondMarkets: AU_BOND_MARKETS['CD'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['CD'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['CD'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['CD'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['CD'],
}
