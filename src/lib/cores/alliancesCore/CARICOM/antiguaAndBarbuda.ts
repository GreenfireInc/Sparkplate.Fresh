import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { CARICOM_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { CARICOM_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { CARICOM_NEWS_OUTLETS } from './newsOutletsByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CARICOM_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CARICOM_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CARICOM_RARE_EARTHS } from './rareEarthsByIso'
import { CARICOM_BOND_MARKETS } from './bondMarketsByIso'
import { CARICOM_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CARICOM_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { CARICOM_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const antiguaAndBarbuda: CaricomCountry = {
  name: 'Antigua and Barbuda',
  iso3166Alpha2: 'AG',
  caricomStatus: 'full_member',
  capital: 'St. John\'s',
  coordinates: { latitude: 17.1274, longitude: -61.8468 },
  independence: '1981-11-01',
  topMajorCities: ['St. John\'s', 'All Saints', 'Liberta', 'Potters Village', 'Bolands'],
  population: 100000,
  mainLanguages: ['English', 'Antiguan Creole', 'Spanish (minor)'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/Antigua',
  foundingLeader: 'Vere Bird (first Prime Minister)',
  currentLeader: 'Gaston Browne (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD peg to USD; USDT/USDC',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['AG'],
  domesticPostService: CARICOM_DOMESTIC_POST_SERVICES['AG'],
  nationalBankingInstitutions: CARICOM_NATIONAL_BANKING_INSTITUTIONS['AG'],
  corporationFormationOffice: CARICOM_CORPORATION_FORMATION_OFFICES['AG'],
  newsOutlets: CARICOM_NEWS_OUTLETS['AG'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['AG'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['AG'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['AG'],
  rareEarths: CARICOM_RARE_EARTHS['AG'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
  bondMarkets: CARICOM_BOND_MARKETS['AG'],
  intellectualPropertyDepartments: CARICOM_INTELLECTUAL_PROPERTY_DEPARTMENTS['AG'],
  securitiesExchangeCommission: CARICOM_SECURITIES_EXCHANGE_COMMISSIONS['AG'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['AG'],
  mainInternationalSeaport: CARICOM_MAIN_INTERNATIONAL_SEAPORTS['AG'],
}
