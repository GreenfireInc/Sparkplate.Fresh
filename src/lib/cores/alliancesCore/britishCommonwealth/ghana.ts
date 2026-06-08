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

export const ghana: CommonwealthCountry = {
  name: 'Ghana',
  iso3166Alpha2: 'GH',
  commonwealthStatus: 'member',
  capital: 'Accra',
  coordinates: { latitude: 5.6037, longitude: -0.187 },
  independence: '1957-03-06',
  topMajorCities: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Ashaiman'],
  population: 34000000,
  mainLanguages: ['English', 'Akan', 'Ewe'],
  currency: 'Ghanaian cedi (GHS)',
  timezone: 'Africa/Accra',
  foundingLeader: 'Kwame Nkrumah (first Prime Minister)',
  currentLeader: 'John Mahama (President) — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Paxful context'],
  stablecoin: 'eCedi (CBDC pilot); USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['GH'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['GH'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['GH'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['GH'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['GH'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['GH'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['GH'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['GH'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['GH'],
  stockExchange: 'Ghana Stock Exchange',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['GH'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['GH'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['GH'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['GH'],
}
