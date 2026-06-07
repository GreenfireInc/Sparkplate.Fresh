import type { AllianceOfSahelStatesCountry } from './types'
import { AES_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AES_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { AES_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { AES_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { AES_NEWS_OUTLETS } from './newsOutletsByIso'
import { AES_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AES_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AES_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AES_RARE_EARTHS } from './rareEarthsByIso'
import { AES_BOND_MARKETS } from './bondMarketsByIso'
import { AES_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { AES_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { AES_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { AES_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const mali: AllianceOfSahelStatesCountry = {
  name: 'Mali',
  iso3166Alpha2: 'ML',
  allianceOfSahelStatesStatus: 'founding_member',
  capital: 'Bamako',
  coordinates: { latitude: 12.6392, longitude: -8.0029 },
  independence: '1960-09-22',
  topMajorCities: ['Bamako', 'Sikasso', 'Mopti', 'Koutiala', 'Kayes'],
  population: 23000000,
  mainLanguages: ['French', 'Bambara', 'Fula'],
  currency: 'West African CFA franc (XOF) — ECOWAS transition context',
  timezone: 'Africa/Bamako',
  foundingLeader: 'Modibo Keïta',
  currentLeader: 'Assimi Goïta (Colonel; transitional leadership)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'OTC'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: AES_DOMESTIC_COURIERS['ML'],
  domesticPostService: AES_DOMESTIC_POST_SERVICES['ML'],
  nationalBankingInstitutions: AES_NATIONAL_BANKING_INSTITUTIONS['ML'],
  corporationFormationOffice: AES_CORPORATION_FORMATION_OFFICES['ML'],
  newsOutlets: AES_NEWS_OUTLETS['ML'],
  notableUniversities: AES_NOTABLE_UNIVERSITIES['ML'],
  mainExportCommodities: AES_MAIN_EXPORT_COMMODITIES['ML'],
  mainExportedElements: AES_MAIN_EXPORTED_ELEMENTS['ML'],
  rareEarths: AES_RARE_EARTHS['ML'],
  stockExchange: 'Bourse des Valeurs du Mali (limited)',
  bondMarkets: AES_BOND_MARKETS['ML'],
  intellectualPropertyDepartments: AES_INTELLECTUAL_PROPERTY_DEPARTMENTS['ML'],
  securitiesExchangeCommission: AES_SECURITIES_EXCHANGE_COMMISSIONS['ML'],
  mainInternationalAirport: AES_MAIN_INTERNATIONAL_AIRPORTS['ML'],
  mainInternationalSeaport: AES_MAIN_INTERNATIONAL_SEAPORTS['ML'],
}
