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

export const southSudan: EacCountry = {
  name: 'South Sudan',
  iso3166Alpha2: 'SS',
  capital: 'Juba',
  coordinates: { latitude: 4.8594, longitude: 31.5713 },
  independence: '2011-07-09',
  topMajorCities: ['Juba', 'Wau', 'Malakal', 'Yei', 'Aweil'],
  population: 11000000,
  mainLanguages: ['English', 'Dinka', 'Nuer'],
  currency: 'South Sudanese pound (SSP)',
  timezone: 'Africa/Juba',
  foundingLeader: 'Salva Kiir Mayardit (founding President)',
  currentLeader: 'President Salva Kiir Mayardit — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Informal P2P', 'Diaspora OTC'],
  stablecoin: 'USDT informal; humanitarian USD economy',
  domesticCourierServices: EAC_DOMESTIC_COURIERS['SS'],
  domesticPostService: EAC_DOMESTIC_POST_SERVICES['SS'],
  nationalBankingInstitutions: EAC_NATIONAL_BANKING_INSTITUTIONS['SS'],
  corporationFormationOffice: EAC_CORPORATION_FORMATION_OFFICES['SS'],
  newsOutlets: EAC_NEWS_OUTLETS['SS'],
  notableUniversities: EAC_NOTABLE_UNIVERSITIES['SS'],
  mainExportCommodities: EAC_MAIN_EXPORT_COMMODITIES['SS'],
  mainExportedElements: EAC_MAIN_EXPORTED_ELEMENTS['SS'],
  rareEarths: EAC_RARE_EARTHS['SS'],
  stockExchange: 'Juba Stock Exchange (nascent / limited)',
  bondMarkets: EAC_BOND_MARKETS['SS'],
  intellectualPropertyDepartments: EAC_INTELLECTUAL_PROPERTY_DEPARTMENTS['SS'],

  securitiesExchangeCommission: EAC_SECURITIES_EXCHANGE_COMMISSIONS['SS'],
  mainInternationalAirport: EAC_MAIN_INTERNATIONAL_AIRPORTS['SS'],
  mainInternationalSeaport: EAC_MAIN_INTERNATIONAL_SEAPORTS['SS'],
}
