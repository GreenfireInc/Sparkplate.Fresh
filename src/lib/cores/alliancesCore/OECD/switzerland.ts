import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { OECD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { OECD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OECD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { OECD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const switzerland: OecdCountry = {
  name: 'Switzerland',
  iso3166Alpha2: 'CH',
  capital: 'Bern (de facto federal city)',
  coordinates: { latitude: 46.948, longitude: 7.4474 },
  independence:
    '1291 confederal legacy / 1848 federal state; EFTA; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Zurich', 'Geneva', 'Basel', 'Lausanne', 'Bern'],
  population: 8900000,
  mainLanguages: ['German', 'French', 'Italian / Romansh (national languages)'],
  currency: 'Swiss franc (CHF)',
  timezone: 'Europe/Zurich',
  foundingLeader: 'Federal charter consolidation under nineteenth-century liberal era — informational',
  currentLeader: 'Federal Council collective executive; annual President — verify rotation',
  cryptocurrencyExchanges: ['Swiss-regulated SIX Digital Exchange; FINMA VQF intermediaries — informational'],
  stablecoin: 'CHF-referenced instruments; stablecoin banking pilot programmes — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['CH'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['CH'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['CH'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['CH'],
  newsOutlets: OECD_NEWS_OUTLETS['CH'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['CH'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['CH'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['CH'],
  rareEarths: OECD_RARE_EARTHS['CH'],
  stockExchange: 'SIX Swiss Exchange (Zurich)',
  bondMarkets: OECD_BOND_MARKETS['CH'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['CH'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['CH'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['CH'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['CH'],
}
