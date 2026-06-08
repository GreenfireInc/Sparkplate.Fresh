import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { COMMONWEALTH_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const seychelles: CommonwealthCountry = {
  name: 'Seychelles',
  iso3166Alpha2: 'SC',
  commonwealthStatus: 'member',
  capital: 'Victoria',
  coordinates: { latitude: -4.6191, longitude: 55.4513 },
  independence: '1976-06-29',
  topMajorCities: ['Victoria', 'Anse Boileau', 'Beau Vallon', 'Cascade', 'Takamaka'],
  population: 120000,
  mainLanguages: ['Seychellois Creole', 'English', 'French'],
  currency: 'Seychellois rupee (SCR)',
  timezone: 'Indian/Mahe',
  foundingLeader: 'James Mancham (first President)',
  currentLeader: 'Wavel Ramkalawan (President)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['SC'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['SC'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['SC'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['SC'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['SC'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['SC'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['SC'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['SC'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['SC'],
  stockExchange: 'Merj Exchange Limited (Seychelles; international listings)',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['SC'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['SC'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['SC'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['SC'],
}
