import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { CENSAD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { CENSAD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'
import { CENSAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CENSAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { CENSAD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const tunisia: CensadCountry = {
  name: 'Tunisia',
  iso3166Alpha2: 'TN',
  capital: 'Tunis',
  coordinates: { latitude: 36.8065, longitude: 10.1815 },
  independence: '1956-03-20 (France)',
  topMajorCities: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte'],
  population: 12200000,
  mainLanguages: ['Arabic (Tunisian)', 'French', 'Berber (small communities)'],
  currency: 'Tunisian dinar (TND)',
  timezone: 'Africa/Tunis',
  foundingLeader: 'Habib Bourguiba (first President republic era)',
  currentLeader:
    'President Kais Saied (institutional contested period post-2021 — verify PM/cabinet roster)',
  cryptocurrencyExchanges: ['Startup licensing experiments; OTC informal'],
  stablecoin: 'Informal USD/USDT',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['TN'],
  domesticPostService: CENSAD_DOMESTIC_POST_SERVICES['TN'],
  nationalBankingInstitutions: CENSAD_NATIONAL_BANKING_INSTITUTIONS['TN'],
  corporationFormationOffice: CENSAD_CORPORATION_FORMATION_OFFICES['TN'],
  newsOutlets: CENSAD_NEWS_OUTLETS['TN'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['TN'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['TN'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['TN'],
  rareEarths: CENSAD_RARE_EARTHS['TN'],
  stockExchange: 'Bourse de Tunis',
  bondMarkets: CENSAD_BOND_MARKETS['TN'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['TN'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['TN'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['TN'],
  mainInternationalSeaport: CENSAD_MAIN_INTERNATIONAL_SEAPORTS['TN'],
}
