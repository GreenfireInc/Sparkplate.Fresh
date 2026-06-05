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

export const iceland: NatoCountry = {
  name: 'Iceland',
  iso3166Alpha2: 'IS',
  capital: 'Reykjavík',
  coordinates: { latitude: 64.1466, longitude: -21.9426 },
  independence:
    '1944 sovereignty from Danish crown; no standing military (Allied air policing); NATO founding Ally 1949-04-04 — informational',
  topMajorCities: ['Reykjavík', 'Kópavogur', 'Hafnarfjörður', 'Akureyri', 'Reykjanesbær'],
  population: 400000,
  mainLanguages: ['Icelandic', 'English', 'Polish / Lithuanian (immigrant communities)'],
  currency: 'Icelandic króna (ISK)',
  timezone: 'Atlantic/Reykjavik',
  foundingLeader: 'Post-war alignment under Bjarni Benediktsson-era reference — informational',
  currentLeader: 'President Halla Tómasdóttir; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nordic EU passport venues; thin licensed retail — informational'],
  stablecoin: 'ISK thin; USD/EUR-stable informal — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['IS'],
  newsOutlets: NATO_NEWS_OUTLETS['IS'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['IS'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['IS'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['IS'],
  rareEarths: NATO_RARE_EARTHS['IS'],
  stockExchange: 'Nasdaq Iceland',
  bondMarkets: NATO_BOND_MARKETS['IS'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['IS'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['IS'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['IS'],
}
