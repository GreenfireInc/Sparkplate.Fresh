import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { SADC_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { SADC_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { SADC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { SADC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { SADC_RARE_EARTHS } from './rareEarthsByIso'
import { SADC_BOND_MARKETS } from './bondMarketsByIso'
import { SADC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { SADC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { SADC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { SADC_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const botswana: SadcCountry = {
  name: 'Botswana',
  iso3166Alpha2: 'BW',
  capital: 'Gaborone',
  coordinates: { latitude: -24.6282, longitude: 25.9231 },
  independence: '1966-09-30',
  topMajorCities: ['Gaborone', 'Francistown', 'Maun', 'Molepolole', 'Serowe'],
  population: 2400000,
  mainLanguages: ['English', 'Setswana', 'Kalanga'],
  currency: 'Botswana pula (BWP)',
  timezone: 'Africa/Gaborone',
  foundingLeader: 'Seretse Khama (first President)',
  currentLeader: 'President Duma Boko — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Compliance evolving — verify'],
  stablecoin: 'Pula floated; informal USD/USDT',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['BW'],
  domesticPostService: SADC_DOMESTIC_POST_SERVICES['BW'],
  nationalBankingInstitutions: SADC_NATIONAL_BANKING_INSTITUTIONS['BW'],
  corporationFormationOffice: SADC_CORPORATION_FORMATION_OFFICES['BW'],
  newsOutlets: SADC_NEWS_OUTLETS['BW'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['BW'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['BW'],
  mainExportedElements: SADC_MAIN_EXPORTED_ELEMENTS['BW'],
  rareEarths: SADC_RARE_EARTHS['BW'],
  stockExchange: 'Botswana Stock Exchange (BSE)',
  bondMarkets: SADC_BOND_MARKETS['BW'],
  mainInternationalAirport: SADC_MAIN_INTERNATIONAL_AIRPORTS['BW'],
  mainInternationalSeaport: SADC_MAIN_INTERNATIONAL_SEAPORTS['BW'],
  intellectualPropertyDepartments: SADC_INTELLECTUAL_PROPERTY_DEPARTMENTS['BW'],
  securitiesExchangeCommission: SADC_SECURITIES_EXCHANGE_COMMISSIONS['BW'],
}
