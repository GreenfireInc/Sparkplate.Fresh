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

export const romania: NatoCountry = {
  name: 'Romania',
  iso3166Alpha2: 'RO',
  capital: 'Bucharest',
  coordinates: { latitude: 44.4268, longitude: 26.1025 },
  independence:
    '1989 revolution lineage; EU since 2007; NATO Ally since Mar 2004 Black Sea pillar — informational',
  topMajorCities: ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța'],
  population: 19000000,
  mainLanguages: ['Romanian', 'Hungarian (minority)', 'Romani'],
  currency: 'Romanian leu (RON)',
  timezone: 'Europe/Bucharest',
  foundingLeader: 'Ion Iliescu post-Ceaușescu reference — informational',
  currentLeader: 'President — verify succession; Prime Minister — verify',
  cryptocurrencyExchanges: ['EU gateways; conservative banking tenor — informational'],
  stablecoin: 'RON FX; EUR-stable predominant — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['RO'],
  newsOutlets: NATO_NEWS_OUTLETS['RO'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['RO'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['RO'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['RO'],
  rareEarths: NATO_RARE_EARTHS['RO'],
  stockExchange: 'Bucharest Stock Exchange',
  bondMarkets: NATO_BOND_MARKETS['RO'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['RO'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['RO'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['RO'],
}
