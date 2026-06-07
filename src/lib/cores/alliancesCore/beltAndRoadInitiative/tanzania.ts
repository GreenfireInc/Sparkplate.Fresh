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
export const tanzania: BeltAndRoadInitiativeCountry = {
  name: 'Tanzania',
  iso3166Alpha2: 'TZ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Dodoma',
  coordinates: { latitude: -6.163, longitude: 35.7516 },
  independence: '1961-12-09 (Tanganyika); Zanzibar merged 1964',
  topMajorCities: ['Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya'] as [string, string, string, string, string],
  population: 68153004,
  mainLanguages: [ 'English', 'Swahili', 'Regional languages' ],
  currency: 'Tanzanian shilling (TZS)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Julius Nyerere',
  currentLeader: 'Samia Suluhu Hassan (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local fintech'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['TZ'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['TZ'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['TZ'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['TZ'],
  newsOutlets: BRI_NEWS_OUTLETS['TZ'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['TZ'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['TZ'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['TZ'],
  rareEarths: BRI_RARE_EARTHS['TZ'],
  stockExchange: 'Dar es Salaam Stock Exchange (DSE)',
  bondMarkets: BRI_BOND_MARKETS['TZ'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['TZ'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['TZ'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['TZ'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['TZ'],
}
