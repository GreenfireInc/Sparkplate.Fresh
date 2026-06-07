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

export const zimbabwe: ComesaCountry = {
  name: 'Zimbabwe',
  iso3166Alpha2: 'ZW',
  capital: 'Harare',
  coordinates: { latitude: -17.8252, longitude: 31.0335 },
  independence: '1980-04-18',
  topMajorCities: ['Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru'],
  population: 16000000,
  mainLanguages: ['English', 'Shona', 'Ndebele'],
  currency: 'ZiG / ZWL / multicurrency context — verify legal tender mix',
  timezone: 'Africa/Harare',
  foundingLeader: 'Robert Mugabe (first Prime Minister / President era)',
  currentLeader: 'President Emmerson Mnangagwa — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Local P2P'],
  stablecoin: 'USDT / USDC; USD parallel economy',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['ZW'],
  domesticPostService: COMESA_DOMESTIC_POST_SERVICES['ZW'],
  nationalBankingInstitutions: COMESA_NATIONAL_BANKING_INSTITUTIONS['ZW'],
  corporationFormationOffice: COMESA_CORPORATION_FORMATION_OFFICES['ZW'],
  newsOutlets: COMESA_NEWS_OUTLETS['ZW'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['ZW'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['ZW'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['ZW'],
  rareEarths: COMESA_RARE_EARTHS['ZW'],
  stockExchange: 'Zimbabwe Stock Exchange (ZSE)',
  bondMarkets: COMESA_BOND_MARKETS['ZW'],
  intellectualPropertyDepartments: COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS['ZW'],
  securitiesExchangeCommission: COMESA_SECURITIES_EXCHANGE_COMMISSIONS['ZW'],
  mainInternationalAirport: COMESA_MAIN_INTERNATIONAL_AIRPORTS['ZW'],
  mainInternationalSeaport: COMESA_MAIN_INTERNATIONAL_SEAPORTS['ZW'],
}
