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
export const centralAfricanRepublic: BeltAndRoadInitiativeCountry = {
  name: 'Central African Republic',
  iso3166Alpha2: 'CF',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bangui',
  coordinates: { latitude: 4.3947, longitude: 18.5582 },
  independence: '1960-08-13',
  topMajorCities: ['Bangui', 'Bimbo', 'Berbérati', 'Carnot', 'Bambari'] as [string, string, string, string, string],
  population: 6470307,
  mainLanguages: [ 'French', 'Sango', 'Regional languages' ],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'UTC+01:00',
  foundingLeader: 'David Dacko',
  currentLeader: 'Faustin-Archange Touadéra (President)',
  cryptocurrencyExchanges: ['Sango Coin ecosystem (national project)', 'Binance (P2P)', 'OTC'],
  stablecoin: 'USDT / USDC P2P; experimental sovereign crypto references',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CF'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['CF'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['CF'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['CF'],
  newsOutlets: BRI_NEWS_OUTLETS['CF'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CF'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CF'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CF'],
  rareEarths: BRI_RARE_EARTHS['CF'],
  stockExchange: 'Bangui Stock Exchange (very limited)',
  bondMarkets: BRI_BOND_MARKETS['CF'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['CF'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['CF'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['CF'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['CF'],
}
