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

export const southAfrica: G20Country = {
  name: 'South Africa',
  iso3166Alpha2: 'ZA',
  capital: 'Pretoria (executive); Cape Town (legislative); Bloemfontein (judicial)',
  coordinates: { latitude: -25.7479, longitude: 28.2293 },
  independence:
    '1910 Union of South Africa; 1961 Republic; 1994 democratic non-racial constitution; BRICS / G20 founding member (finance track 1999; 2025 Johannesburg leaders summit host — first African host) — informational',
  topMajorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth (Gqeberha)'],
  population: 62000000,
  mainLanguages: ['English (lingua franca)', 'Zulu', 'Xhosa / Afrikaans / Sotho regional'],
  currency: 'South African rand (ZAR)',
  timezone: 'Africa/Johannesburg',
  foundingLeader:
    'Nelson Mandela (post-apartheid democratic founder); Oliver Tambo / Mahatma Gandhi heritage references — informational',
  currentLeader: 'President Cyril Ramaphosa — verify',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'AltCoinTrader / FSCA CASP licensing regime — informational'],
  stablecoin: 'ZARP (rand-pegged) issuance niche; SARB Project Khokha wholesale settlement experiments — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['ZA'],
  domesticPostService: G20_DOMESTIC_POST_SERVICES['ZA'],
  nationalBankingInstitutions: G20_NATIONAL_BANKING_INSTITUTIONS['ZA'],
  corporationFormationOffice: G20_CORPORATION_FORMATION_OFFICES['ZA'],
  newsOutlets: G20_NEWS_OUTLETS['ZA'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['ZA'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['ZA'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['ZA'],
  rareEarths: G20_RARE_EARTHS['ZA'],
  stockExchange: 'Johannesburg Stock Exchange (JSE)',
  bondMarkets: G20_BOND_MARKETS['ZA'],
  mainInternationalAirport: G20_MAIN_INTERNATIONAL_AIRPORTS['ZA'],
  mainInternationalSeaport: G20_MAIN_INTERNATIONAL_SEAPORTS['ZA'],
  intellectualPropertyDepartments: G20_INTELLECTUAL_PROPERTY_DEPARTMENTS['ZA'],
  securitiesExchangeCommission: G20_SECURITIES_EXCHANGE_COMMISSIONS['ZA'],
}
