import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { OECD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { OECD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OECD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { OECD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const unitedStates: OecdCountry = {
  name: 'United States',
  iso3166Alpha2: 'US',
  capital: 'Washington, D.C.',
  coordinates: { latitude: 38.9072, longitude: -77.0369 },
  independence:
    '1776 United States Declaration; Bretton Woods anchor; OECD founding member Sep 1961 — informational',
  topMajorCities: ['New York City', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  population: 342000000,
  mainLanguages: ['English', 'Spanish', 'Chinese (community)'],
  currency: 'United States dollar (USD)',
  timezone: 'America/New_York',
  foundingLeader:
    'Franklin D. Roosevelt post-war international economic institutions reference — informational',
  currentLeader: 'President / Vice-President — verify (federal inauguration cycle)',
  cryptocurrencyExchanges: ['Coinbase', 'Kraken', 'Gemini MSB state patchwork — informational'],
  stablecoin: 'USDT/USDC and USD fiat-backed issuance (federal legislation evolution — informational)',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['US'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['US'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['US'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['US'],
  newsOutlets: OECD_NEWS_OUTLETS['US'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['US'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['US'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['US'],
  rareEarths: OECD_RARE_EARTHS['US'],
  stockExchange: 'NYSE / Nasdaq consolidated US equity liquidity',
  bondMarkets: OECD_BOND_MARKETS['US'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['US'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['US'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['US'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['US'],
}
