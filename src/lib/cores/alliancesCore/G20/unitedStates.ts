import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { G20_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { G20_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G20_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { G20_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { G20_RARE_EARTHS } from './rareEarthsByIso'
import { G20_BOND_MARKETS } from './bondMarketsByIso'
import { G20_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { G20_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { G20_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { G20_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const unitedStates: G20Country = {
  name: 'United States',
  iso3166Alpha2: 'US',
  capital: 'Washington, D.C.',
  coordinates: { latitude: 38.9072, longitude: -77.0369 },
  independence:
    '1776 United States Declaration; Bretton Woods/IMF architect; G20 founding member (finance track 1999 originated by US Treasury convening; 2009 Pittsburgh leaders summit host) — informational',
  topMajorCities: ['New York City', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  population: 342000000,
  mainLanguages: ['English', 'Spanish', 'Chinese (community)'],
  currency: 'United States dollar (USD)',
  timezone: 'America/New_York',
  foundingLeader:
    'George Washington (constitutional formation reference); Roosevelt-era multilateral monetary order — informational',
  currentLeader: 'President / Vice-President — verify (federal inauguration cycle)',
  cryptocurrencyExchanges: ['Coinbase', 'Kraken', 'Gemini state MSB/licensing patchwork — informational'],
  stablecoin: 'USDT/USDC and USD fiat-backed issuance (federal/stablecoin legislation evolution — informational)',
  domesticCourierServices: G20_DOMESTIC_COURIERS['US'],
  domesticPostService: G20_DOMESTIC_POST_SERVICES['US'],
  nationalBankingInstitutions: G20_NATIONAL_BANKING_INSTITUTIONS['US'],
  corporationFormationOffice: G20_CORPORATION_FORMATION_OFFICES['US'],
  newsOutlets: G20_NEWS_OUTLETS['US'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['US'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['US'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['US'],
  rareEarths: G20_RARE_EARTHS['US'],
  stockExchange: 'NYSE/Nasdaq consolidated US equity liquidity (dual listing customary — informational)',
  bondMarkets: G20_BOND_MARKETS['US'],
  mainInternationalAirport: G20_MAIN_INTERNATIONAL_AIRPORTS['US'],
  mainInternationalSeaport: G20_MAIN_INTERNATIONAL_SEAPORTS['US'],
  intellectualPropertyDepartments: G20_INTELLECTUAL_PROPERTY_DEPARTMENTS['US'],
  securitiesExchangeCommission: G20_SECURITIES_EXCHANGE_COMMISSIONS['US'],
}
