import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { NATO_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { NATO_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { NATO_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { NATO_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const unitedStates: NatoCountry = {
  name: 'United States',
  iso3166Alpha2: 'US',
  capital: 'Washington, D.C.',
  coordinates: { latitude: 38.9072, longitude: -77.0369 },
  independence:
    '1776 United States lineage; indispensable NATO Ally founding depositary Washington Treaty 1949-04-04 — informational',
  topMajorCities: ['New York City', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  population: 342000000,
  mainLanguages: ['English', 'Spanish', 'Chinese (community)'],
  currency: 'United States dollar (USD)',
  timezone: 'America/New_York',
  foundingLeader:
    'Dean Acheson / Truman-era Article 5 guarantor framing — informational',
  currentLeader: 'President / Vice-President — verify (inaugural cycle)',
  cryptocurrencyExchanges: ['Coinbase', 'Kraken', 'Gemini MSB patchwork — informational'],
  stablecoin: 'USDT/USDC USD issuance legislative evolution — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['US'],
  domesticPostService: NATO_DOMESTIC_POST_SERVICES['US'],
  nationalBankingInstitutions: NATO_NATIONAL_BANKING_INSTITUTIONS['US'],
  corporationFormationOffice: NATO_CORPORATION_FORMATION_OFFICES['US'],
  newsOutlets: NATO_NEWS_OUTLETS['US'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['US'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['US'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['US'],
  rareEarths: NATO_RARE_EARTHS['US'],
  stockExchange: 'NYSE / Nasdaq consolidated US equities',
  bondMarkets: NATO_BOND_MARKETS['US'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['US'],
  mainInternationalSeaport: NATO_MAIN_INTERNATIONAL_SEAPORTS['US'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['US'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['US'],
}
