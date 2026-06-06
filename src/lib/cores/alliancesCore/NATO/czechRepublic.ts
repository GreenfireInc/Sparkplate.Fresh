import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { NATO_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const czechRepublic: NatoCountry = {
  name: 'Czech Republic',
  iso3166Alpha2: 'CZ',
  capital: 'Prague',
  coordinates: { latitude: 50.0755, longitude: 14.4378 },
  independence:
    '1993 Velvet Divorce lineage; EU since 2004; NATO Ally since Mar 1999 — informational',
  topMajorCities: ['Prague', 'Brno', 'Ostrava', 'Plzeň', 'Liberec'],
  population: 10900000,
  mainLanguages: ['Czech', 'Slovak (minority)', 'Romani'],
  currency: 'Czech koruna (CZK)',
  timezone: 'Europe/Prague',
  foundingLeader: 'Václav Havel first president ČR reference — informational',
  currentLeader: 'President Petr Pavel; Prime Minister — verify',
  cryptocurrencyExchanges: ['European brokers; cautious Czech National Bank stance — informational'],
  stablecoin: 'CZK OTC; EUR-stable dominant — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['CZ'],
  newsOutlets: NATO_NEWS_OUTLETS['CZ'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['CZ'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['CZ'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['CZ'],
  rareEarths: NATO_RARE_EARTHS['CZ'],
  stockExchange: 'Prague Stock Exchange (PX)',
  bondMarkets: NATO_BOND_MARKETS['CZ'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['CZ'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['CZ'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['CZ'],
}
