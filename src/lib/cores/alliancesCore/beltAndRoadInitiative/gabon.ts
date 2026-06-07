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
export const gabon: BeltAndRoadInitiativeCountry = {
  name: 'Gabon',
  iso3166Alpha2: 'GA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Libreville',
  coordinates: { latitude: 0.4162, longitude: 9.4673 },
  independence: '1960-08-17',
  topMajorCities: ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda'] as [string, string, string, string, string],
  population: 2469296,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: 'Brice Clotaire Oligui Nguema (Transitional President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'CFA-region OTC'],
  stablecoin: 'USDT P2P; XAF peg',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['GA'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['GA'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['GA'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['GA'],
  newsOutlets: BRI_NEWS_OUTLETS['GA'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['GA'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['GA'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['GA'],
  rareEarths: BRI_RARE_EARTHS['GA'],
  stockExchange: 'Bourse Régionale des Valeurs Mobilières (BRVM) — regional',
  bondMarkets: BRI_BOND_MARKETS['GA'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['GA'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['GA'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['GA'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['GA'],
}
