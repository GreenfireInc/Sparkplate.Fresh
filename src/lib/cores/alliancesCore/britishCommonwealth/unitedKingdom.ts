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

export const unitedKingdom: CommonwealthCountry = {
  name: 'United Kingdom',
  iso3166Alpha2: 'GB',
  commonwealthStatus: 'member',
  capital: 'London',
  coordinates: { latitude: 51.5074, longitude: -0.1278 },
  independence: 'N/A (sovereign state; devolution dates vary)',
  topMajorCities: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool'],
  population: 67000000,
  mainLanguages: ['English', 'Welsh', 'Scots Gaelic'],
  currency: 'Pound sterling (GBP)',
  timezone: 'Europe/London',
  foundingLeader: 'Robert Walpole (first PM, Westminster system context)',
  currentLeader: 'Keir Starmer (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Coinbase', 'Kraken', 'Revolut crypto'],
  stablecoin: 'GBP stablecoins limited; USDC/USDT on exchanges',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['GB'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['GB'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['GB'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['GB'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['GB'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['GB'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['GB'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['GB'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['GB'],
  stockExchange: 'London Stock Exchange (LSE)',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['GB'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['GB'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['GB'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['GB'],
}
