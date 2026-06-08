import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { IORA_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { IORA_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IORA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IORA_RARE_EARTHS } from './rareEarthsByIso'
import { IORA_BOND_MARKETS } from './bondMarketsByIso'
import { IORA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { IORA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { IORA_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const australia: IoraCountry = {
  name: 'Australia',
  iso3166Alpha2: 'AU',
  capital: 'Canberra',
  coordinates: { latitude: -35.2809, longitude: 149.13 },
  independence:
    '1901 Commonwealth federation; Indian Ocean strategic rim economy; IORA member since formative Mar 1997 Charter era — informational',
  topMajorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  population: 26700000,
  mainLanguages: ['English', 'Mandarin (community)', 'Arabic (community)'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Australia/Sydney',
  foundingLeader: 'Regional Indian Ocean Dialogue host reference Perth-era — informational',
  currentLeader: 'Prime Minister Anthony Albanese — verify',
  cryptocurrencyExchanges: ['Independent Reserve', 'BTC Markets', 'ASIC-regulated onboarding — informational'],
  stablecoin: 'AUD stablecoins; Treasury supervisory evolution — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['AU'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['AU'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['AU'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['AU'],
  newsOutlets: IORA_NEWS_OUTLETS['AU'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['AU'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['AU'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['AU'],
  rareEarths: IORA_RARE_EARTHS['AU'],
  stockExchange: 'Australian Securities Exchange (ASX)',
  bondMarkets: IORA_BOND_MARKETS['AU'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['AU'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['AU'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['AU'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['AU'],
}
