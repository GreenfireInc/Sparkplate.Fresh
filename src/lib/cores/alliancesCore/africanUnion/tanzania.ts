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
export const tanzania: AfricanUnionCountry = {
  name: 'Tanzania',
  iso3166Alpha2: 'TZ',
  africanUnionStatus: 'member',
  capital: 'Dodoma',
  coordinates: { latitude: -6.163, longitude: 35.7516 },
  independence: '1961-12-09 (Tanganyika); Zanzibar merged 1964',
  topMajorCities: ['Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya'],
  population: 68000000,
  mainLanguages: ['Swahili', 'English', 'Sukuma'],
  currency: 'Tanzanian shilling (TZS)',
  timezone: 'Africa/Dar_es_Salaam',
  foundingLeader: 'Julius Nyerere',
  currentLeader: 'Samia Suluhu Hassan (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local fintech'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: AU_DOMESTIC_COURIERS['TZ'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['TZ'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['TZ'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['TZ'],
  newsOutlets: AU_NEWS_OUTLETS['TZ'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['TZ'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['TZ'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['TZ'],
  rareEarths: AU_RARE_EARTHS['TZ'],
  stockExchange: 'Dar es Salaam Stock Exchange (DSE)',
  bondMarkets: AU_BOND_MARKETS['TZ'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['TZ'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['TZ'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['TZ'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['TZ'],
}
