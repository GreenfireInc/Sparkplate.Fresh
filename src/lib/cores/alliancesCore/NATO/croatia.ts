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

export const croatia: NatoCountry = {
  name: 'Croatia',
  iso3166Alpha2: 'HR',
  capital: 'Zagreb',
  coordinates: { latitude: 45.815, longitude: 15.9819 },
  independence:
    '1991 Yugoslav succession; EU since 2013; Euro from 2023; NATO Ally since Apr 2009 — informational',
  topMajorCities: ['Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar'],
  population: 3900000,
  mainLanguages: ['Croatian', 'Italian (minority regions)', 'Serbian (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Zagreb',
  foundingLeader: 'Franjo Tuđman reference — informational',
  currentLeader: 'President / Prime Minister — verify',
  cryptocurrencyExchanges: ['EU MiCA-regulated onboarding; Binance EUR context'],
  stablecoin: 'EUR stablecoins MiCA-aligned — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['HR'],
  domesticPostService: NATO_DOMESTIC_POST_SERVICES['HR'],
  nationalBankingInstitutions: NATO_NATIONAL_BANKING_INSTITUTIONS['HR'],
  corporationFormationOffice: NATO_CORPORATION_FORMATION_OFFICES['HR'],
  newsOutlets: NATO_NEWS_OUTLETS['HR'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['HR'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['HR'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['HR'],
  rareEarths: NATO_RARE_EARTHS['HR'],
  stockExchange: 'Zagreb Stock Exchange',
  bondMarkets: NATO_BOND_MARKETS['HR'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['HR'],
  mainInternationalSeaport: NATO_MAIN_INTERNATIONAL_SEAPORTS['HR'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['HR'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['HR'],
}
