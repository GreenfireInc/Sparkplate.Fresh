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
export const tunisia: BeltAndRoadInitiativeCountry = {
  name: 'Tunisia',
  iso3166Alpha2: 'TN',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Tunis',
  coordinates: { latitude: 36.8065, longitude: 10.1815 },
  independence: '1956-03-20',
  topMajorCities: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte'] as [string, string, string, string, string],
  population: 11972169,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Tunisian dinar (TND)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Habib Bourguiba',
  currentLeader: 'Kais Saied (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional brokers', 'OTC'],
  stablecoin: 'USDT informal; e-dinar discussions',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['TN'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['TN'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['TN'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['TN'],
  newsOutlets: BRI_NEWS_OUTLETS['TN'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['TN'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['TN'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['TN'],
  rareEarths: BRI_RARE_EARTHS['TN'],
  stockExchange: 'Bourse de Tunis',
  bondMarkets: BRI_BOND_MARKETS['TN'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['TN'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['TN'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['TN'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['TN'],
}
