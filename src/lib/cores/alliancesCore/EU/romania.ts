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

export const romania: EuCountry = {
  name: 'Romania',
  iso3166Alpha2: 'RO',
  capital: 'Bucharest',
  coordinates: { latitude: 44.4268, longitude: 26.1025 },
  independence: '1989 revolution lineage; EU 2007-01-01; euro aspirant — informational',
  topMajorCities: ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța'],
  population: 19000000,
  mainLanguages: ['Romanian', 'Hungarian (minority)', 'Romani'],
  currency: 'Romanian leu (RON)',
  timezone: 'Europe/Bucharest',
  foundingLeader: 'Ion Iliescu (post-Ceaușescu reference)',
  currentLeader: 'President Klaus Johannis — verify successor cycle; Prime Minister — verify',
  cryptocurrencyExchanges: ['EU gateways; OTC alongside banking conservatism — informational'],
  stablecoin: 'RON FX; predominant EUR-stable rails',
  domesticCourierServices: EU_DOMESTIC_COURIERS['RO'],
  domesticPostService: EU_DOMESTIC_POST_SERVICES['RO'],
  nationalBankingInstitutions: EU_NATIONAL_BANKING_INSTITUTIONS['RO'],
  corporationFormationOffice: EU_CORPORATION_FORMATION_OFFICES['RO'],
  newsOutlets: EU_NEWS_OUTLETS['RO'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['RO'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['RO'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['RO'],
  rareEarths: EU_RARE_EARTHS['RO'],
  stockExchange: 'Bucharest Stock Exchange',
  bondMarkets: EU_BOND_MARKETS['RO'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['RO'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['RO'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['RO'],
  mainInternationalSeaport: EU_MAIN_INTERNATIONAL_SEAPORTS['RO'],
}
