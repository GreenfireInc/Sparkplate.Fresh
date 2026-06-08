import type { BricsCountry } from './types'
import { BRICS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRICS_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { BRICS_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { BRICS_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { BRICS_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRICS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRICS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRICS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRICS_RARE_EARTHS } from './rareEarthsByIso'
import { BRICS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRICS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRICS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { BRICS_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const china: BricsCountry = {
  name: 'China',
  iso3166Alpha2: 'CN',
  bricsStatus: 'founding_member',
  capital: 'Beijing',
  coordinates: { latitude: 39.9042, longitude: 116.4074 },
  independence: '1949-10-01',
  topMajorCities: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Chengdu'],
  population: 1410000000,
  mainLanguages: ['Standard Chinese (Mandarin)', 'Regional languages (e.g. Cantonese, Uyghur, Tibetan — regional use)', 'English (education and business)'],
  currency: 'Renminbi (CNY)',
  timezone: 'Asia/Shanghai',
  foundingLeader: 'Mao Zedong (PRC founding context — informational)',
  currentLeader: 'Xi Jinping (President; CPC General Secretary)',
  cryptocurrencyExchanges: ['Offshore access only for mainland residents; Hong Kong SAR has separate licensed venues — verify jurisdiction'],
  stablecoin: 'e-CNY pilot (central bank digital currency); private stablecoin trading restricted onshore',
  domesticCourierServices: BRICS_DOMESTIC_COURIERS['CN'],
  domesticPostService: BRICS_DOMESTIC_POST_SERVICES['CN'],
  nationalBankingInstitutions: BRICS_NATIONAL_BANKING_INSTITUTIONS['CN'],
  corporationFormationOffice: BRICS_CORPORATION_FORMATION_OFFICES['CN'],
  newsOutlets: BRICS_NEWS_OUTLETS['CN'],
  notableUniversities: BRICS_NOTABLE_UNIVERSITIES['CN'],
  mainExportCommodities: BRICS_MAIN_EXPORT_COMMODITIES['CN'],
  mainExportedElements: BRICS_MAIN_EXPORTED_ELEMENTS['CN'],
  rareEarths: BRICS_RARE_EARTHS['CN'],
  stockExchange: 'Shanghai Stock Exchange; Shenzhen Stock Exchange',
  intellectualPropertyDepartments: BRICS_INTELLECTUAL_PROPERTY_DEPARTMENTS['CN'],
  securitiesExchangeCommission: BRICS_SECURITIES_EXCHANGE_COMMISSIONS['CN'],
  mainInternationalAirport: BRICS_MAIN_INTERNATIONAL_AIRPORTS['CN'],
  mainInternationalSeaport: BRICS_MAIN_INTERNATIONAL_SEAPORTS['CN'],
}
