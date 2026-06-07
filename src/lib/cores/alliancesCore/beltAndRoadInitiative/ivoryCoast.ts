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
export const ivoryCoast: BeltAndRoadInitiativeCountry = {
  name: 'Côte d\'Ivoire',
  iso3166Alpha2: 'CI',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Yamoussoukro',
  coordinates: { latitude: 6.8276, longitude: -5.2893 },
  independence: '1960-08-07',
  topMajorCities: ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro'] as [string, string, string, string, string],
  population: 31719275,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'West African CFA franc (XOF)',
  timezone: 'UTC',
  foundingLeader: 'Félix Houphouët-Boigny',
  currentLeader: 'Alassane Ouattara (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Luno (regional)'],
  stablecoin: 'USDT / USDC; XOF pegged via CFA',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CI'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['CI'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['CI'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['CI'],
  newsOutlets: BRI_NEWS_OUTLETS['CI'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CI'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CI'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CI'],
  rareEarths: BRI_RARE_EARTHS['CI'],
  stockExchange: 'BRVM (Abidjan — regional hub)',
  bondMarkets: BRI_BOND_MARKETS['CI'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['CI'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['CI'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['CI'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['CI'],
}
