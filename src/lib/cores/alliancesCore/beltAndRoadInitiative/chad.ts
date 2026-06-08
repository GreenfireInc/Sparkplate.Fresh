import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { BRI_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { BRI_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRI_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { BRI_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export const chad: BeltAndRoadInitiativeCountry = {
  name: 'Chad',
  iso3166Alpha2: 'TD',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'N\'Djamena',
  coordinates: { latitude: 12.1348, longitude: 15.0557 },
  independence: '1960-08-11',
  topMajorCities: ["N'Djamena", 'Moundou', 'Sarh', 'Abéché', 'Kélo'] as [string, string, string, string, string],
  population: 19340757,
  mainLanguages: [ 'Arabic', 'French', 'Regional languages' ],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'UTC+01:00',
  foundingLeader: 'François Tombalbaye',
  currentLeader: 'Mahamat Idriss Déby Itno (Transitional President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card (regional)', 'OTC'],
  stablecoin: 'USDT informal; XAF peg',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['TD'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['TD'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['TD'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['TD'],
  newsOutlets: BRI_NEWS_OUTLETS['TD'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['TD'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['TD'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['TD'],
  rareEarths: BRI_RARE_EARTHS['TD'],
  stockExchange: 'Financial Market of Central Africa (CEMAC hub; thin Chad listings)',
  bondMarkets: BRI_BOND_MARKETS['TD'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['TD'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['TD'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['TD'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['TD'],
}
