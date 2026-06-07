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

export const mali: CensadCountry = {
  name: 'Mali',
  iso3166Alpha2: 'ML',
  capital: 'Bamako',
  coordinates: { latitude: 12.6392, longitude: -8.0029 },
  independence: '1960-09-22 (transitional military administrations recurring — verify)',
  topMajorCities: ['Bamako', 'Sikasso', 'Mopti', 'Koutiala', 'Kayes'],
  population: 23700000,
  mainLanguages: ['French', 'Bambara', 'Fula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Bamako',
  foundingLeader: 'Modibo Keïta (first President)',
  currentLeader: 'Assimi Goïta (transitional military administration) — verify',
  cryptocurrencyExchanges: ['Informal OTC'],
  stablecoin: 'Informal USDT/USDC',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['ML'],
  domesticPostService: CENSAD_DOMESTIC_POST_SERVICES['ML'],
  nationalBankingInstitutions: CENSAD_NATIONAL_BANKING_INSTITUTIONS['ML'],
  corporationFormationOffice: CENSAD_CORPORATION_FORMATION_OFFICES['ML'],
  newsOutlets: CENSAD_NEWS_OUTLETS['ML'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['ML'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['ML'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['ML'],
  rareEarths: CENSAD_RARE_EARTHS['ML'],
  stockExchange: 'BRVM listing context (WAEMU)',
  bondMarkets: CENSAD_BOND_MARKETS['ML'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['ML'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['ML'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['ML'],
  mainInternationalSeaport: CENSAD_MAIN_INTERNATIONAL_SEAPORTS['ML'],
}
