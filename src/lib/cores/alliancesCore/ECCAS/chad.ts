import type { EccasCountry } from './types'
import { ECCAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECCAS_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { ECCAS_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { ECCAS_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { ECCAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECCAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECCAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECCAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECCAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECCAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECCAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ECCAS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ECCAS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { ECCAS_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const chad: EccasCountry = {
  name: 'Chad',
  iso3166Alpha2: 'TD',
  capital: "N'Djamena",
  coordinates: { latitude: 12.1348, longitude: 15.0557 },
  independence: '1960-08-11',
  topMajorCities: ["N'Djamena", 'Moundou', 'Sarh', 'Abéché', 'Kélo'],
  population: 19500000,
  mainLanguages: ['French', 'Arabic', 'Sara languages'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Ndjamena',
  foundingLeader: 'François Tombalbaye (first President)',
  currentLeader: 'Mahamat Déby transitional presidency — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card (regional)', 'OTC'],
  stablecoin: 'USDT informal; XAF peg via BEAC',
  domesticCourierServices: ECCAS_DOMESTIC_COURIERS['TD'],
  domesticPostService: ECCAS_DOMESTIC_POST_SERVICES['TD'],
  nationalBankingInstitutions: ECCAS_NATIONAL_BANKING_INSTITUTIONS['TD'],
  corporationFormationOffice: ECCAS_CORPORATION_FORMATION_OFFICES['TD'],
  newsOutlets: ECCAS_NEWS_OUTLETS['TD'],
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['TD'],
  mainExportCommodities: ECCAS_MAIN_EXPORT_COMMODITIES['TD'],
  mainExportedElements: ECCAS_MAIN_EXPORTED_ELEMENTS['TD'],
  rareEarths: ECCAS_RARE_EARTHS['TD'],
  stockExchange: 'CEMAC regional capital markets (thin Chad footprint)',
  bondMarkets: ECCAS_BOND_MARKETS['TD'],
  intellectualPropertyDepartments: ECCAS_INTELLECTUAL_PROPERTY_DEPARTMENTS['TD'],

  securitiesExchangeCommission: ECCAS_SECURITIES_EXCHANGE_COMMISSIONS['TD'],
  mainInternationalAirport: ECCAS_MAIN_INTERNATIONAL_AIRPORTS['TD'],
  mainInternationalSeaport: ECCAS_MAIN_INTERNATIONAL_SEAPORTS['TD'],
}
