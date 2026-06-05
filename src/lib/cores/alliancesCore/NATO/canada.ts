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

export const canada: NatoCountry = {
  name: 'Canada',
  iso3166Alpha2: 'CA',
  capital: 'Ottawa',
  coordinates: { latitude: 45.4215, longitude: -75.6972 },
  independence:
    '1867 Dominion federation; patriation 1982; NATO founding Ally Washington Treaty 1949-04-04 — informational',
  topMajorCities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton'],
  population: 40100000,
  mainLanguages: ['English', 'French', 'Mandarin (community)'],
  currency: 'Canadian dollar (CAD)',
  timezone: 'America/Toronto',
  foundingLeader: 'Louis St-Laurent / Pearson NATO institutional reference — informational',
  currentLeader: 'Prime Minister — verify (federal electoral cycle)',
  cryptocurrencyExchanges: ['Bitbuy', 'Newton', 'CSA provincial licensing — informational'],
  stablecoin: 'CAD fiat-backed tokens; OSFI guidance evolution — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['CA'],
  newsOutlets: NATO_NEWS_OUTLETS['CA'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['CA'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['CA'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['CA'],
  rareEarths: NATO_RARE_EARTHS['CA'],
  stockExchange: 'Toronto Stock Exchange (TMX)',
  bondMarkets: NATO_BOND_MARKETS['CA'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['CA'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['CA'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['CA'],
}
