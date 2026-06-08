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

export const burkinaFaso: AllianceOfSahelStatesCountry = {
  name: 'Burkina Faso',
  iso3166Alpha2: 'BF',
  allianceOfSahelStatesStatus: 'founding_member',
  capital: 'Ouagadougou',
  coordinates: { latitude: 12.3714, longitude: -1.5197 },
  independence: '1960-08-05',
  topMajorCities: ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Ouahigouya', 'Banfora'],
  population: 23000000,
  mainLanguages: ['French', 'Mooré', 'Dioula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Ouagadougou',
  foundingLeader: 'Maurice Yaméogo',
  currentLeader: 'Ibrahim Traoré (Transitional President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Informal P2P'],
  stablecoin: 'USDT via P2P; XOF CFA peg',
  domesticCourierServices: AES_DOMESTIC_COURIERS['BF'],
  domesticPostService: AES_DOMESTIC_POST_SERVICES['BF'],
  nationalBankingInstitutions: AES_NATIONAL_BANKING_INSTITUTIONS['BF'],
  corporationFormationOffice: AES_CORPORATION_FORMATION_OFFICES['BF'],
  newsOutlets: AES_NEWS_OUTLETS['BF'],
  notableUniversities: AES_NOTABLE_UNIVERSITIES['BF'],
  mainExportCommodities: AES_MAIN_EXPORT_COMMODITIES['BF'],
  mainExportedElements: AES_MAIN_EXPORTED_ELEMENTS['BF'],
  rareEarths: AES_RARE_EARTHS['BF'],
  stockExchange: 'Burkina Faso — BRVM listings (limited local activity)',
  bondMarkets: AES_BOND_MARKETS['BF'],
  intellectualPropertyDepartments: AES_INTELLECTUAL_PROPERTY_DEPARTMENTS['BF'],
  securitiesExchangeCommission: AES_SECURITIES_EXCHANGE_COMMISSIONS['BF'],
  mainInternationalAirport: AES_MAIN_INTERNATIONAL_AIRPORTS['BF'],
  mainInternationalSeaport: AES_MAIN_INTERNATIONAL_SEAPORTS['BF'],
}
