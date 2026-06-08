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

export const cyprus: CommonwealthCountry = {
  name: 'Cyprus',
  iso3166Alpha2: 'CY',
  commonwealthStatus: 'member',
  capital: 'Nicosia',
  coordinates: { latitude: 35.1856, longitude: 33.3823 },
  independence: '1960-08-16',
  topMajorCities: ['Nicosia', 'Limassol', 'Larnaca', 'Paphos', 'Famagusta'],
  population: 1250000,
  mainLanguages: ['Greek', 'Turkish', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Asia/Nicosia',
  foundingLeader: 'Archbishop Makarios III (first President)',
  currentLeader: 'Nikos Christodoulides (President) — verify',
  cryptocurrencyExchanges: ['EU-licensed venues', 'Binance', 'Kraken'],
  stablecoin: 'EUR stablecoins (EU MiCA context); USDT',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['CY'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['CY'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['CY'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['CY'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['CY'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['CY'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['CY'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['CY'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['CY'],
  stockExchange: 'Cyprus Stock Exchange (CSE)',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['CY'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['CY'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['CY'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['CY'],
}
