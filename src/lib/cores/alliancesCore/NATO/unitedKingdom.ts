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

export const unitedKingdom: NatoCountry = {
  name: 'United Kingdom',
  iso3166Alpha2: 'GB',
  capital: 'London',
  coordinates: { latitude: 51.5074, longitude: -0.1278 },
  independence:
    'UK state continuity; EU exit 2020; NATO founding Ally Washington Treaty 1949-04-04 — informational',
  topMajorCities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
  population: 68500000,
  mainLanguages: ['English', 'Polish (community)', 'Welsh'],
  currency: 'Pound sterling (GBP)',
  timezone: 'Europe/London',
  foundingLeader:
    'Clement Attlee / Ernest Bevin NATO founding diplomacy reference — informational',
  currentLeader:
    'Monarch Charles III; Prime Minister Sir Keir Starmer — verify',
  cryptocurrencyExchanges: ['Coinbase e-money UK', 'Kraken', 'FCA context — informational'],
  stablecoin: 'GBP stablecoins UK cryptoasset regime evolution — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['GB'],
  domesticPostService: NATO_DOMESTIC_POST_SERVICES['GB'],
  nationalBankingInstitutions: NATO_NATIONAL_BANKING_INSTITUTIONS['GB'],
  corporationFormationOffice: NATO_CORPORATION_FORMATION_OFFICES['GB'],
  newsOutlets: NATO_NEWS_OUTLETS['GB'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['GB'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['GB'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['GB'],
  rareEarths: NATO_RARE_EARTHS['GB'],
  stockExchange: 'London Stock Exchange Group',
  bondMarkets: NATO_BOND_MARKETS['GB'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['GB'],
  mainInternationalSeaport: NATO_MAIN_INTERNATIONAL_SEAPORTS['GB'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['GB'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['GB'],
}
