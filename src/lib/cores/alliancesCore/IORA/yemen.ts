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

export const yemen: IoraCountry = {
  name: 'Yemen',
  iso3166Alpha2: 'YE',
  capital: 'Sana\'a (de jure disputed; provisional authorities Aden-era narratives — informational)',
  coordinates: { latitude: 15.3694, longitude: 44.191 },
  independence:
    '1990 North-South Yemen unification ruptured civil war arcs; Bab-el-Mandeb Red Sea chokepoint littoral stakeholder; fragile IORA member — informational',
  topMajorCities: ['Sana\'a', 'Aden', 'Taiz', 'Hodeidah', 'Ibb'],
  population: 34500000,
  mainLanguages: ['Arabic', 'Soqotri (Soqotra)', 'Somali coastal communities minority'],
  currency: 'Yemeni rial (YER fractured banking sovereignty — informational)',
  timezone: 'Asia/Aden',
  foundingLeader: 'Ali Abdullah Saleh long-rule reference contrast — informational',
  currentLeader:
    'Dual-authority fragmentation Presidential Leadership Council vs Sana’a administration — verify',
  cryptocurrencyExchanges: ['Infrastructure collapse; OTC informal hawala predominant — informational'],
  stablecoin: 'USD predominant informal economy — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['YE'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['YE'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['YE'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['YE'],
  newsOutlets: IORA_NEWS_OUTLETS['YE'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['YE'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['YE'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['YE'],
  rareEarths: IORA_RARE_EARTHS['YE'],
  stockExchange: 'Aden Securities micro-market disruptions — informational',
  bondMarkets: IORA_BOND_MARKETS['YE'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['YE'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['YE'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['YE'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['YE'],
}
