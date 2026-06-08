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
export const bahrain: BeltAndRoadInitiativeCountry = {
  name: 'Bahrain',
  iso3166Alpha2: 'BH',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Manama',
  coordinates: { latitude: 26.2235, longitude: 50.5876 },
  independence: '1971-08-15',
  topMajorCities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'A\'ali'] as [string, string, string, string, string],
  population: 1594654,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Bahraini dinar (BHD)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Isa bin Salman Al Khalifa (Emir)',
  currentLeader: 'Hamad bin Isa Al Khalifa (King); Salman bin Hamad Al Khalifa (Crown Prince & Prime Minister)',
  cryptocurrencyExchanges: ['Rain', 'Binance (regional)', 'International OTC'],
  stablecoin: 'USDT / USDC; CBDC pilots in Gulf context',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['BH'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['BH'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['BH'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['BH'],
  newsOutlets: BRI_NEWS_OUTLETS['BH'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['BH'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['BH'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['BH'],
  rareEarths: BRI_RARE_EARTHS['BH'],
  stockExchange: 'Bahrain Bourse',
  bondMarkets: BRI_BOND_MARKETS['BH'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['BH'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['BH'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['BH'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['BH'],
}
