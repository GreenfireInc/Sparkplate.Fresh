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
export const qatar: BeltAndRoadInitiativeCountry = {
  name: 'Qatar',
  iso3166Alpha2: 'QA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Doha',
  coordinates: { latitude: 25.2854, longitude: 51.531 },
  independence: '1971-09-03',
  topMajorCities: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Al Khor', 'Dukhan'] as [string, string, string, string, string],
  population: 3173024,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Qatari riyal (QAR)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Ahmad bin Ali Al Thani (Emir at independence)',
  currentLeader: 'Tamim bin Hamad Al Thani (Emir)',
  cryptocurrencyExchanges: ['Regional OTC', 'International brokers; cautious local licensing'],
  stablecoin: 'USDT / USDC informal; wealth-fund economy',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['QA'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['QA'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['QA'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['QA'],
  newsOutlets: BRI_NEWS_OUTLETS['QA'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['QA'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['QA'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['QA'],
  rareEarths: BRI_RARE_EARTHS['QA'],
  stockExchange: 'Qatar Stock Exchange',
  bondMarkets: BRI_BOND_MARKETS['QA'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['QA'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['QA'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['QA'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['QA'],
}
