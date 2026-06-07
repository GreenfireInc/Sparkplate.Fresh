import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { CENSAD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { CENSAD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'
import { CENSAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CENSAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { CENSAD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const gambia: CensadCountry = {
  name: 'Gambia',
  iso3166Alpha2: 'GM',
  capital: 'Banjul',
  coordinates: { latitude: 13.4549, longitude: -16.579 },
  independence: '1965-02-18',
  topMajorCities: ['Serrekunda', 'Brikama', 'Bakau', 'Farafenni', 'Banjul'],
  population: 2790000,
  mainLanguages: ['English', 'Mandinka', 'Wolof'],
  currency: 'Gambian dalasi (GMD)',
  timezone: 'Africa/Banjul',
  foundingLeader: 'Dawda Jawara (first Prime Minister)',
  currentLeader: 'President Adama Barrow — verify',
  cryptocurrencyExchanges: ['Regional Binance P2P reported', 'Informal'],
  stablecoin: 'USDT informal',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['GM'],
  domesticPostService: CENSAD_DOMESTIC_POST_SERVICES['GM'],
  nationalBankingInstitutions: CENSAD_NATIONAL_BANKING_INSTITUTIONS['GM'],
  corporationFormationOffice: CENSAD_CORPORATION_FORMATION_OFFICES['GM'],
  newsOutlets: CENSAD_NEWS_OUTLETS['GM'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['GM'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['GM'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['GM'],
  rareEarths: CENSAD_RARE_EARTHS['GM'],
  stockExchange: 'Gambia Stock Exchange (small / developing — verify)',
  bondMarkets: CENSAD_BOND_MARKETS['GM'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['GM'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['GM'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['GM'],
  mainInternationalSeaport: CENSAD_MAIN_INTERNATIONAL_SEAPORTS['GM'],
}
