import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { EU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { EU_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EU_RARE_EARTHS } from './rareEarthsByIso'
import { EU_BOND_MARKETS } from './bondMarketsByIso'
import { EU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { EU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { EU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { EU_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const estonia: EuCountry = {
  name: 'Estonia',
  iso3166Alpha2: 'EE',
  capital: 'Tallinn',
  coordinates: { latitude: 59.437, longitude: 24.7536 },
  independence: '1991 Restoration; EU since 2004-05-01; Euro 2011 — informational',
  topMajorCities: ['Tallinn', 'Tartu', 'Narva', 'Pärnu', 'Kohtla-Järve'],
  population: 1370000,
  mainLanguages: ['Estonian', 'Russian', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Tallinn',
  foundingLeader: 'Lennart Meri (early republic reference)',
  currentLeader: 'President Alar Karis; Prime Minister — verify',
  cryptocurrencyExchanges: ['e residency digital nomad onboarding; regulated EU CASPs'],
  stablecoin: 'EUR stablecoins; digital euro CBDC narratives',
  domesticCourierServices: EU_DOMESTIC_COURIERS['EE'],
  domesticPostService: EU_DOMESTIC_POST_SERVICES['EE'],
  nationalBankingInstitutions: EU_NATIONAL_BANKING_INSTITUTIONS['EE'],
  corporationFormationOffice: EU_CORPORATION_FORMATION_OFFICES['EE'],
  newsOutlets: EU_NEWS_OUTLETS['EE'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['EE'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['EE'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['EE'],
  rareEarths: EU_RARE_EARTHS['EE'],
  stockExchange: 'Nasdaq Tallinn',
  bondMarkets: EU_BOND_MARKETS['EE'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['EE'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['EE'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['EE'],
  mainInternationalSeaport: EU_MAIN_INTERNATIONAL_SEAPORTS['EE'],
}
