import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { AU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { AU_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { AU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { AU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { AU_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export const guinea: AfricanUnionCountry = {
  name: 'Guinea',
  iso3166Alpha2: 'GN',
  africanUnionStatus: 'member',
  capital: 'Conakry',
  coordinates: { latitude: 9.6412, longitude: -13.5784 },
  independence: '1958-10-02',
  topMajorCities: ['Conakry', 'Nzérékoré', 'Kankan', 'Kindia', 'Labé'],
  population: 14000000,
  mainLanguages: ['French', 'Fula', 'Maninka'],
  currency: 'Guinean franc (GNF)',
  timezone: 'Africa/Conakry',
  foundingLeader: 'Ahmed Sékou Touré',
  currentLeader: 'Mamady Doumbouya (Colonel; transitional leadership)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card (regional)', 'OTC'],
  stablecoin: 'USDT informal; no GNF stablecoin',
  domesticCourierServices: AU_DOMESTIC_COURIERS['GN'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['GN'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['GN'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['GN'],
  newsOutlets: AU_NEWS_OUTLETS['GN'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['GN'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['GN'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['GN'],
  rareEarths: AU_RARE_EARTHS['GN'],
  stockExchange: 'No major national exchange; informal OTC and regional brokers',
  bondMarkets: AU_BOND_MARKETS['GN'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['GN'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['GN'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['GN'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['GN'],
}
