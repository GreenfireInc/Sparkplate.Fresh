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

export const greece: NatoCountry = {
  name: 'Greece',
  iso3166Alpha2: 'GR',
  capital: 'Athens',
  coordinates: { latitude: 37.9838, longitude: 23.7275 },
  independence:
    '1830 kingdom lineage; EU since 1981; NATO Ally since Feb 1952 — informational',
  topMajorCities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa'],
  population: 10400000,
  mainLanguages: ['Greek', 'English (tourism)', 'Albanian (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Athens',
  foundingLeader: 'Ioannis Kapodistrias-era reference — informational',
  currentLeader: 'President / Prime Minister — verify',
  cryptocurrencyExchanges: ['EU gateways — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['GR'],
  domesticPostService: NATO_DOMESTIC_POST_SERVICES['GR'],
  nationalBankingInstitutions: NATO_NATIONAL_BANKING_INSTITUTIONS['GR'],
  corporationFormationOffice: NATO_CORPORATION_FORMATION_OFFICES['GR'],
  newsOutlets: NATO_NEWS_OUTLETS['GR'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['GR'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['GR'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['GR'],
  rareEarths: NATO_RARE_EARTHS['GR'],
  stockExchange: 'Athens Stock Exchange',
  bondMarkets: NATO_BOND_MARKETS['GR'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['GR'],
  mainInternationalSeaport: NATO_MAIN_INTERNATIONAL_SEAPORTS['GR'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['GR'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['GR'],
}
