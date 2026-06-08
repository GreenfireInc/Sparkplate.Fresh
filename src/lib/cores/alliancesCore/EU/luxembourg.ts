import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { EU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { EU_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EU_RARE_EARTHS } from './rareEarthsByIso'
import { EU_BOND_MARKETS } from './bondMarketsByIso'
import { EU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { EU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { EU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { EU_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const luxembourg: EuCountry = {
  name: 'Luxembourg',
  iso3166Alpha2: 'LU',
  capital: 'Luxembourg City',
  coordinates: { latitude: 49.6116, longitude: 6.1319 },
  independence: '1867 neutrality / grand duchy continuity; EU founding 1958 — informational',
  topMajorCities: ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange', 'Dudelange', 'Pétange'],
  population: 670000,
  mainLanguages: ['Luxembourgish', 'French', 'German'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Luxembourg',
  foundingLeader: 'Jean Monnet-era steel community reference — informational',
  currentLeader: 'Grand Duke Henri; Prime Minister — verify',
  cryptocurrencyExchanges: ['Bitstamp historical HQ LU; MiCA-compliant EU crypto hub'],
  stablecoin: 'EUR stablecoins; asset servicing sector',
  domesticCourierServices: EU_DOMESTIC_COURIERS['LU'],
  domesticPostService: EU_DOMESTIC_POST_SERVICES['LU'],
  nationalBankingInstitutions: EU_NATIONAL_BANKING_INSTITUTIONS['LU'],
  corporationFormationOffice: EU_CORPORATION_FORMATION_OFFICES['LU'],
  newsOutlets: EU_NEWS_OUTLETS['LU'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['LU'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['LU'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['LU'],
  rareEarths: EU_RARE_EARTHS['LU'],
  stockExchange: 'Luxembourg Stock Exchange',
  bondMarkets: EU_BOND_MARKETS['LU'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['LU'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['LU'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['LU'],
  mainInternationalSeaport: EU_MAIN_INTERNATIONAL_SEAPORTS['LU'],
}
