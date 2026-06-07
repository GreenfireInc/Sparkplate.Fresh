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

export const norway: NatoCountry = {
  name: 'Norway',
  iso3166Alpha2: 'NO',
  capital: 'Oslo',
  coordinates: { latitude: 59.9139, longitude: 10.7522 },
  independence:
    '1905 separation from Sweden sovereignty; EEA participant not EU MS; NATO founding Ally 1949-04-04 — informational',
  topMajorCities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen'],
  population: 5600000,
  mainLanguages: ['Norwegian', 'Sámi (co-official pockets)', 'English'],
  currency: 'Norwegian krone (NOK)',
  timezone: 'Europe/Oslo',
  foundingLeader: 'Haakon VII-era Atlantic alignment reference — informational',
  currentLeader: 'Monarch Harald V; Prime Minister Jonas Gahr Støre — verify coalition',
  cryptocurrencyExchanges: ['Finanstilsynet registered providers — informational'],
  stablecoin: 'NOK OTC; EUR-stable common — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['NO'],
  domesticPostService: NATO_DOMESTIC_POST_SERVICES['NO'],
  nationalBankingInstitutions: NATO_NATIONAL_BANKING_INSTITUTIONS['NO'],
  corporationFormationOffice: NATO_CORPORATION_FORMATION_OFFICES['NO'],
  newsOutlets: NATO_NEWS_OUTLETS['NO'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['NO'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['NO'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['NO'],
  rareEarths: NATO_RARE_EARTHS['NO'],
  stockExchange: 'Oslo Børs (Euronext)',
  bondMarkets: NATO_BOND_MARKETS['NO'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['NO'],
  mainInternationalSeaport: NATO_MAIN_INTERNATIONAL_SEAPORTS['NO'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['NO'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['NO'],
}
