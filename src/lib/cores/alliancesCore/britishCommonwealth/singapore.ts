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

export const singapore: CommonwealthCountry = {
  name: 'Singapore',
  iso3166Alpha2: 'SG',
  commonwealthStatus: 'member',
  capital: 'Singapore (city-state)',
  coordinates: { latitude: 1.3521, longitude: 103.8198 },
  independence: '1965-08-09',
  topMajorCities: ['Singapore', 'Jurong East', 'Tampines', 'Woodlands', 'Bedok'],
  population: 6000000,
  mainLanguages: ['English', 'Mandarin', 'Malay'],
  currency: 'Singapore dollar (SGD)',
  timezone: 'Asia/Singapore',
  foundingLeader: 'Lee Kuan Yew (first Prime Minister)',
  currentLeader: 'Lawrence Wong (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Coinbase', 'Crypto.com', 'Independent Reserve'],
  stablecoin: 'XSGD and USDC (regulated venues); USDT',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['SG'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['SG'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['SG'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['SG'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['SG'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['SG'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['SG'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['SG'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['SG'],
  stockExchange: 'Singapore Exchange (SGX)',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['SG'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['SG'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['SG'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['SG'],
}
