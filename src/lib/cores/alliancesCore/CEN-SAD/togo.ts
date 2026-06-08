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

export const togo: CensadCountry = {
  name: 'Togo',
  iso3166Alpha2: 'TG',
  capital: 'Lomé',
  coordinates: { latitude: 6.1725, longitude: 1.2314 },
  independence: '1960-04-27 (French Togoland)',
  topMajorCities: ['Lomé', 'Sokodé', 'Kara', 'Atakpamé', 'Palimé'],
  population: 9000000,
  mainLanguages: ['French', 'Ewe', 'Kabye'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Lome',
  foundingLeader: 'Sylvanus Olympio (first Prime Minister)',
  currentLeader: 'President Faure Gnassingbé — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Informal crypto markets'],
  stablecoin: 'USDT informal; CFA peg',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['TG'],
  domesticPostService: CENSAD_DOMESTIC_POST_SERVICES['TG'],
  nationalBankingInstitutions: CENSAD_NATIONAL_BANKING_INSTITUTIONS['TG'],
  corporationFormationOffice: CENSAD_CORPORATION_FORMATION_OFFICES['TG'],
  newsOutlets: CENSAD_NEWS_OUTLETS['TG'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['TG'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['TG'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['TG'],
  rareEarths: CENSAD_RARE_EARTHS['TG'],
  stockExchange: 'BRVM (WAEMU securities context)',
  bondMarkets: CENSAD_BOND_MARKETS['TG'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['TG'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['TG'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['TG'],
  mainInternationalSeaport: CENSAD_MAIN_INTERNATIONAL_SEAPORTS['TG'],
}
