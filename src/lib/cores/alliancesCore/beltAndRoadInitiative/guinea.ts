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
export const guinea: BeltAndRoadInitiativeCountry = {
  name: 'Guinea',
  iso3166Alpha2: 'GN',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Conakry',
  coordinates: { latitude: 9.6412, longitude: -13.5784 },
  independence: '1958-10-02',
  topMajorCities: ['Conakry', 'Nzérékoré', 'Kankan', 'Kindia', 'Labé'] as [string, string, string, string, string],
  population: 14363931,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'Guinean franc (GNF)',
  timezone: 'UTC',
  foundingLeader: 'Ahmed Sékou Touré',
  currentLeader: 'Mamady Doumbouya (Colonel; transitional leadership)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card (regional)', 'OTC'],
  stablecoin: 'USDT informal; no GNF stablecoin',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['GN'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['GN'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['GN'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['GN'],
  newsOutlets: BRI_NEWS_OUTLETS['GN'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['GN'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['GN'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['GN'],
  rareEarths: BRI_RARE_EARTHS['GN'],
  stockExchange: 'No major national exchange; informal OTC and regional brokers',
  bondMarkets: BRI_BOND_MARKETS['GN'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['GN'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['GN'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['GN'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['GN'],
}
