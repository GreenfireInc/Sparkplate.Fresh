import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { BRI_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { BRI_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRI_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { BRI_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export const zimbabwe: BeltAndRoadInitiativeCountry = {
  name: 'Zimbabwe',
  iso3166Alpha2: 'ZW',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Harare',
  coordinates: { latitude: -17.8252, longitude: 31.0335 },
  independence: '1980-04-18',
  topMajorCities: ['Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru'] as [string, string, string, string, string],
  population: 17073087,
  mainLanguages: [ 'Chibarwe', 'English', 'Kalanga' ],
  currency: 'Zimbabwean dollar (ZWL)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Robert Mugabe (first Prime Minister)',
  currentLeader: 'Emmerson Mnangagwa (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Golix (historical)', 'Local P2P'],
  stablecoin: 'USDT / USDC; USD cash economy',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['ZW'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['ZW'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['ZW'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['ZW'],
  newsOutlets: BRI_NEWS_OUTLETS['ZW'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['ZW'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['ZW'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['ZW'],
  rareEarths: BRI_RARE_EARTHS['ZW'],
  stockExchange: 'Zimbabwe Stock Exchange (ZSE)',
  bondMarkets: BRI_BOND_MARKETS['ZW'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['ZW'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['ZW'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['ZW'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['ZW'],
}
