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
export const lebanon: BeltAndRoadInitiativeCountry = {
  name: 'Lebanon',
  iso3166Alpha2: 'LB',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Beirut',
  coordinates: { latitude: 33.8938, longitude: 35.5018 },
  independence: '1943-11-22',
  topMajorCities: ['Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Byblos'] as [string, string, string, string, string],
  population: 5490000,
  mainLanguages: [ 'Arabic', 'French', 'Regional languages' ],
  currency: 'Lebanese pound (LBP)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Bechara El Khoury (President)',
  currentLeader: 'Joseph Aoun (President); Nawaf Salam (Prime Minister)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Diaspora remittance rails'],
  stablecoin: 'USDT / USDC; USD parallel economy amid crisis',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['LB'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['LB'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['LB'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['LB'],
  newsOutlets: BRI_NEWS_OUTLETS['LB'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['LB'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['LB'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['LB'],
  rareEarths: BRI_RARE_EARTHS['LB'],
  stockExchange: 'Beirut Stock Exchange',
  bondMarkets: BRI_BOND_MARKETS['LB'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['LB'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['LB'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['LB'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['LB'],
}
