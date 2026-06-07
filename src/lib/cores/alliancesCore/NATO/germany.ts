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

export const germany: NatoCountry = {
  name: 'Germany',
  iso3166Alpha2: 'DE',
  capital: 'Berlin',
  coordinates: { latitude: 52.52, longitude: 13.405 },
  independence:
    '1990 reunification continuity; EU founding lineage; NATO Ally FRG ascension May 1955 reunified state inherits — informational',
  topMajorCities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
  population: 83200000,
  mainLanguages: ['German', 'Turkish (community)', 'Polish'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Berlin',
  foundingLeader: 'Konrad Adenauer transatlantic embed reference — informational',
  currentLeader: 'Federal President Frank-Walter Steinmeier; Chancellor — verify',
  cryptocurrencyExchanges: ['Bitstamp EU', 'MiCA licences Deutsche Börse narratives — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['DE'],
  domesticPostService: NATO_DOMESTIC_POST_SERVICES['DE'],
  nationalBankingInstitutions: NATO_NATIONAL_BANKING_INSTITUTIONS['DE'],
  corporationFormationOffice: NATO_CORPORATION_FORMATION_OFFICES['DE'],
  newsOutlets: NATO_NEWS_OUTLETS['DE'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['DE'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['DE'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['DE'],
  rareEarths: NATO_RARE_EARTHS['DE'],
  stockExchange: 'Deutsche Börse (Frankfurt)',
  bondMarkets: NATO_BOND_MARKETS['DE'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['DE'],
  mainInternationalSeaport: NATO_MAIN_INTERNATIONAL_SEAPORTS['DE'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['DE'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['DE'],
}
