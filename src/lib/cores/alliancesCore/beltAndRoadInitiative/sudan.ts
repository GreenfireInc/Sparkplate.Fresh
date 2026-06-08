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
export const sudan: BeltAndRoadInitiativeCountry = {
  name: 'Sudan',
  iso3166Alpha2: 'SD',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Khartoum',
  coordinates: { latitude: 15.5007, longitude: 32.5599 },
  independence: '1956-01-01',
  topMajorCities: ['Omdurman', 'Khartoum', 'Khartoum North', 'Port Sudan', 'Kassala'] as [string, string, string, string, string],
  population: 51662000,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Sudanese pound (SDG)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Ismail al-Azhari',
  currentLeader: 'Abdel Fattah al-Burhan (General; Chair, Sovereignty Council)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Informal P2P amid conflict'],
  stablecoin: 'USDT informal; banking disruption during conflict',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SD'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['SD'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['SD'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['SD'],
  newsOutlets: BRI_NEWS_OUTLETS['SD'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SD'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SD'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['SD'],
  rareEarths: BRI_RARE_EARTHS['SD'],
  stockExchange: 'Khartoum Stock Exchange (operations disrupted)',
  bondMarkets: BRI_BOND_MARKETS['SD'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['SD'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['SD'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['SD'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['SD'],
}
