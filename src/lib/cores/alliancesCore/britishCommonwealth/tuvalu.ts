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

export const tuvalu: CommonwealthCountry = {
  name: 'Tuvalu',
  iso3166Alpha2: 'TV',
  commonwealthStatus: 'member',
  capital: 'Funafuti',
  coordinates: { latitude: -8.5211, longitude: 179.1962 },
  independence: '1978-10-01',
  topMajorCities: ['Funafuti', 'Savave', 'Tanrake', 'Vaitupu', 'Nukulaelae'],
  population: 11000,
  mainLanguages: ['Tuvaluan', 'English', 'Gilbertese (regional)'],
  currency: 'Australian dollar (AUD); Tuvaluan coins',
  timezone: 'Pacific/Funafuti',
  foundingLeader: 'Toaripi Lauti (first Prime Minister)',
  currentLeader: 'Feleti Teo (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'AUD; USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['TV'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['TV'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['TV'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['TV'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['TV'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['TV'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['TV'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['TV'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['TV'],
  stockExchange: 'No national stock exchange — informational',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['TV'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['TV'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['TV'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['TV'],
}
