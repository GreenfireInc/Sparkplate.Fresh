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
export const zimbabwe: AfricanUnionCountry = {
  name: 'Zimbabwe',
  iso3166Alpha2: 'ZW',
  africanUnionStatus: 'member',
  capital: 'Harare',
  coordinates: { latitude: -17.8252, longitude: 31.0335 },
  independence: '1980-04-18',
  topMajorCities: ['Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru'],
  population: 16000000,
  mainLanguages: ['English', 'Shona', 'Ndebele'],
  currency: 'Zimbabwean dollar (ZWL); United States dollar widely used',
  timezone: 'Africa/Harare',
  foundingLeader: 'Robert Mugabe (first Prime Minister)',
  currentLeader: 'Emmerson Mnangagwa (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Golix (historical)', 'Local P2P'],
  stablecoin: 'USDT / USDC; USD cash economy',
  domesticCourierServices: AU_DOMESTIC_COURIERS['ZW'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['ZW'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['ZW'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['ZW'],
  newsOutlets: AU_NEWS_OUTLETS['ZW'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['ZW'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['ZW'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['ZW'],
  rareEarths: AU_RARE_EARTHS['ZW'],
  stockExchange: 'Zimbabwe Stock Exchange (ZSE)',
  bondMarkets: AU_BOND_MARKETS['ZW'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['ZW'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['ZW'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['ZW'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['ZW'],
}
