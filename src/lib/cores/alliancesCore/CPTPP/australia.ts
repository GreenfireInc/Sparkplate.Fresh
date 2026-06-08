import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CPTPP_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { CPTPP_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { CPTPP_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { CPTPP_NEWS_OUTLETS } from './newsOutletsByIso'
import { CPTPP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CPTPP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CPTPP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CPTPP_RARE_EARTHS } from './rareEarthsByIso'
import { CPTPP_BOND_MARKETS } from './bondMarketsByIso'
import { CPTPP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CPTPP_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { CPTPP_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const australia: CptppCountry = {
  name: 'Australia',
  iso3166Alpha2: 'AU',
  capital: 'Canberra',
  coordinates: { latitude: -35.2809, longitude: 149.13 },
  independence: '1901-01-01 (Commonwealth of Australia / federation — informational)',
  topMajorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  population: 27000000,
  mainLanguages: ['English', 'Mandarin Chinese', 'Arabic'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Australia/Canberra',
  foundingLeader: 'Edmund Barton (first Prime Minister)',
  currentLeader: 'Prime Minister Anthony Albanese — verify',
  cryptocurrencyExchanges: ['Independent Reserve', 'CoinSpot', 'Kraken (global)', 'Binance (offshore context)'],
  stablecoin: 'AUD-pegged tokens limited; USDT / USDC widely traded',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['AU'],
  domesticPostService: CPTPP_DOMESTIC_POST_SERVICES['AU'],
  nationalBankingInstitutions: CPTPP_NATIONAL_BANKING_INSTITUTIONS['AU'],
  corporationFormationOffice: CPTPP_CORPORATION_FORMATION_OFFICES['AU'],
  newsOutlets: CPTPP_NEWS_OUTLETS['AU'],
  notableUniversities: CPTPP_NOTABLE_UNIVERSITIES['AU'],
  mainExportCommodities: CPTPP_MAIN_EXPORT_COMMODITIES['AU'],
  mainExportedElements: CPTPP_MAIN_EXPORTED_ELEMENTS['AU'],
  rareEarths: CPTPP_RARE_EARTHS['AU'],
  stockExchange: 'Australian Securities Exchange (ASX)',
  bondMarkets: CPTPP_BOND_MARKETS['AU'],
  intellectualPropertyDepartments: CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS['AU'],
  securitiesExchangeCommission: CPTPP_SECURITIES_EXCHANGE_COMMISSIONS['AU'],
  mainInternationalAirport: CPTPP_MAIN_INTERNATIONAL_AIRPORTS['AU'],
  mainInternationalSeaport: CPTPP_MAIN_INTERNATIONAL_SEAPORTS['AU'],
}
