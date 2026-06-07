import type { FiveEyesCountry } from './types'
import { FIVE_EYES_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { FIVE_EYES_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { FIVE_EYES_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { FIVE_EYES_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { FIVE_EYES_NEWS_OUTLETS } from './newsOutletsByIso'
import { FIVE_EYES_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { FIVE_EYES_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { FIVE_EYES_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { FIVE_EYES_RARE_EARTHS } from './rareEarthsByIso'
import { FIVE_EYES_BOND_MARKETS } from './bondMarketsByIso'
import { FIVE_EYES_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { FIVE_EYES_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { FIVE_EYES_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { FIVE_EYES_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const unitedStates: FiveEyesCountry = {
  name: 'United States',
  iso3166Alpha2: 'US',
  capital: 'Washington, D.C.',
  coordinates: { latitude: 38.9072, longitude: -77.0369 },
  independence:
    '1776 United States Declaration; UKUSA bilateral signals pact 1946; Multilateral Agreements evolution alongside CAN/AUS/NZ — informational',
  topMajorCities: ['New York City', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  population: 342000000,
  mainLanguages: ['English', 'Spanish', 'Chinese (community)'],
  currency: 'United States dollar (USD)',
  timezone: 'America/New_York',
  foundingLeader:
    'Franklin D. Roosevelt / Harry S. Truman–era wartime cryptography and institutional continuity (UKUSA genesis — informational)',
  currentLeader: 'President / Vice-President — verify (federal inauguration cycle)',
  cryptocurrencyExchanges: ['Coinbase', 'Kraken', 'Gemini state MSB/licensing patchwork — informational'],
  stablecoin: 'USDT/USDC and USD fiat-backed issuance (federal/stablecoin legislative evolution — informational)',
  domesticCourierServices: FIVE_EYES_DOMESTIC_COURIERS['US'],
  domesticPostService: FIVE_EYES_DOMESTIC_POST_SERVICES['US'],
  nationalBankingInstitutions: FIVE_EYES_NATIONAL_BANKING_INSTITUTIONS['US'],
  corporationFormationOffice: FIVE_EYES_CORPORATION_FORMATION_OFFICES['US'],
  newsOutlets: FIVE_EYES_NEWS_OUTLETS['US'],
  notableUniversities: FIVE_EYES_NOTABLE_UNIVERSITIES['US'],
  mainExportCommodities: FIVE_EYES_MAIN_EXPORT_COMMODITIES['US'],
  mainExportedElements: FIVE_EYES_MAIN_EXPORTED_ELEMENTS['US'],
  rareEarths: FIVE_EYES_RARE_EARTHS['US'],
  stockExchange: 'NYSE/Nasdaq consolidated US equity liquidity (dual listing customary — informational)',
  bondMarkets: FIVE_EYES_BOND_MARKETS['US'],
  intellectualPropertyDepartments: FIVE_EYES_INTELLECTUAL_PROPERTY_DEPARTMENTS['US'],

  securitiesExchangeCommission: FIVE_EYES_SECURITIES_EXCHANGE_COMMISSIONS['US'],
  mainInternationalAirport: FIVE_EYES_MAIN_INTERNATIONAL_AIRPORTS['US'],
  mainInternationalSeaport: FIVE_EYES_MAIN_INTERNATIONAL_SEAPORTS['US'],
}
