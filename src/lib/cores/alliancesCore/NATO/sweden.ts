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

export const sweden: NatoCountry = {
  name: 'Sweden',
  iso3166Alpha2: 'SE',
  capital: 'Stockholm',
  coordinates: { latitude: 59.3293, longitude: 18.0686 },
  independence:
    'Constitutional monarchy continuity; EU since 1995 (euro opt-out); NATO Ally since Mar 2024 — informational',
  topMajorCities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås'],
  population: 10600000,
  mainLanguages: ['Swedish', 'English', 'Arabic / Somali / Persian (immigrant communities)'],
  currency: 'Swedish krona (SEK)',
  timezone: 'Europe/Stockholm',
  foundingLeader: 'Olof Palme neutrality-to-partnership reference — informational',
  currentLeader: 'Monarch Carl XVI Gustaf; Prime Minister Ulf Kristersson — verify',
  cryptocurrencyExchanges: ['European brokers; Nasdaq Nordic crypto ETP — informational'],
  stablecoin: 'EUR/USD-stable pairs; Riksbank e-krona pilots — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['SE'],
  domesticPostService: NATO_DOMESTIC_POST_SERVICES['SE'],
  nationalBankingInstitutions: NATO_NATIONAL_BANKING_INSTITUTIONS['SE'],
  corporationFormationOffice: NATO_CORPORATION_FORMATION_OFFICES['SE'],
  newsOutlets: NATO_NEWS_OUTLETS['SE'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['SE'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['SE'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['SE'],
  rareEarths: NATO_RARE_EARTHS['SE'],
  stockExchange: 'Nasdaq Stockholm',
  bondMarkets: NATO_BOND_MARKETS['SE'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['SE'],
  mainInternationalSeaport: NATO_MAIN_INTERNATIONAL_SEAPORTS['SE'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['SE'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['SE'],
}
