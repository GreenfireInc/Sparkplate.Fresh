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

export const sweden: OecdCountry = {
  name: 'Sweden',
  iso3166Alpha2: 'SE',
  capital: 'Stockholm',
  coordinates: { latitude: 59.3293, longitude: 18.0686 },
  independence:
    'Constitutional monarchy continuity; EU since 1995 (euro opt-out); OECD founding member Sep 1961 — informational',
  topMajorCities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås'],
  population: 10600000,
  mainLanguages: ['Swedish', 'English', 'Arabic / Somali / Persian (immigrant communities)'],
  currency: 'Swedish krona (SEK)',
  timezone: 'Europe/Stockholm',
  foundingLeader: 'Olof Palme social-democratic reference — informational',
  currentLeader: 'Monarch Carl XVI Gustaf; Prime Minister Ulf Kristersson — verify',
  cryptocurrencyExchanges: ['European brokers; Nasdaq Nordic crypto ETP wrappers — informational'],
  stablecoin: 'EUR/USD-stable pairs; Riksbank e-krona pilot — verify status',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['SE'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['SE'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['SE'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['SE'],
  newsOutlets: OECD_NEWS_OUTLETS['SE'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['SE'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['SE'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['SE'],
  rareEarths: OECD_RARE_EARTHS['SE'],
  stockExchange: 'Nasdaq Stockholm',
  bondMarkets: OECD_BOND_MARKETS['SE'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['SE'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['SE'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['SE'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['SE'],
}
