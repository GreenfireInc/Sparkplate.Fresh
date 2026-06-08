import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { APEC_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { APEC_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { APEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { APEC_RARE_EARTHS } from './rareEarthsByIso'
import { APEC_BOND_MARKETS } from './bondMarketsByIso'
import { APEC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { APEC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { APEC_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const unitedStates: ApecCountry = {
  name: 'United States',
  iso3166Alpha2: 'US',
  capital: 'Washington, D.C.',
  coordinates: { latitude: 38.9072, longitude: -77.0369 },
  independence:
    '1776 United States lineage; dollar-area reserve-currency heavyweight Leaders\' Meeting rotational host APEC economy — informational',
  topMajorCities: ['New York City', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  population: 342000000,
  mainLanguages: ['English', 'Spanish', 'Chinese community'],
  currency: 'United States dollar (USD)',
  timezone: 'America/New_York',
  foundingLeader:
    'Clinton-era APEC Leaders institutionalisation reference — informational',
  currentLeader: 'President / Vice-President — verify inaugural cycle',
  cryptocurrencyExchanges: ['Coinbase Kraken Gemini regulatory patchwork — informational'],
  stablecoin: 'USDT USDC fiat-backed issuance congressional evolution — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['US'],
  domesticPostService: APEC_DOMESTIC_POST_SERVICES['US'],
  nationalBankingInstitutions: APEC_NATIONAL_BANKING_INSTITUTIONS['US'],
  corporationFormationOffice: APEC_CORPORATION_FORMATION_OFFICES['US'],
  newsOutlets: APEC_NEWS_OUTLETS['US'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['US'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['US'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['US'],
  rareEarths: APEC_RARE_EARTHS['US'],
  stockExchange: 'NYSE / Nasdaq consolidated equities',
  bondMarkets: APEC_BOND_MARKETS['US'],
  intellectualPropertyDepartments: APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['US'],
  securitiesExchangeCommission: APEC_SECURITIES_EXCHANGE_COMMISSIONS['US'],
  mainInternationalAirport: APEC_MAIN_INTERNATIONAL_AIRPORTS['US'],
  mainInternationalSeaport: APEC_MAIN_INTERNATIONAL_SEAPORTS['US'],
}
