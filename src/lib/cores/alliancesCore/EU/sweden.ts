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

export const sweden: EuCountry = {
  name: 'Sweden',
  iso3166Alpha2: 'SE',
  capital: 'Stockholm',
  coordinates: { latitude: 59.3293, longitude: 18.0686 },
  independence: 'Constitutional monarchy continuity; EU 1995-01-01; euro opt-out — informational',
  topMajorCities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås'],
  population: 10600000,
  mainLanguages: ['Swedish', 'English', 'Arabic / Somali / Persian (immigrant communities)'],
  currency: 'Swedish krona (SEK)',
  timezone: 'Europe/Stockholm',
  foundingLeader: 'Olof Palme social-democratic era reference — informational',
  currentLeader: 'Monarch Carl XVI Gustaf; Prime Minister Ulf Kristersson — verify',
  cryptocurrencyExchanges: ['European brokers; Nasdaq Nordic crypto ETP wrappers'],
  stablecoin: 'EUR/USD-stable pairs; Swedbank / Riksbank e-krona pilot — verify status',
  domesticCourierServices: EU_DOMESTIC_COURIERS['SE'],
  domesticPostService: EU_DOMESTIC_POST_SERVICES['SE'],
  nationalBankingInstitutions: EU_NATIONAL_BANKING_INSTITUTIONS['SE'],
  corporationFormationOffice: EU_CORPORATION_FORMATION_OFFICES['SE'],
  newsOutlets: EU_NEWS_OUTLETS['SE'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['SE'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['SE'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['SE'],
  rareEarths: EU_RARE_EARTHS['SE'],
  stockExchange: 'Nasdaq Stockholm',
  bondMarkets: EU_BOND_MARKETS['SE'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['SE'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['SE'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['SE'],
  mainInternationalSeaport: EU_MAIN_INTERNATIONAL_SEAPORTS['SE'],
}
