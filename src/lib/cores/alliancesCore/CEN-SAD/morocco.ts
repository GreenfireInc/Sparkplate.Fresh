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

export const morocco: CensadCountry = {
  name: 'Morocco',
  iso3166Alpha2: 'MA',
  capital: 'Rabat',
  coordinates: { latitude: 34.0209, longitude: -6.8417 },
  independence: '1956-03-02 (France); Spanish zones phased — verify detail',
  topMajorCities: ['Casablanca', 'Rabat', 'Fès', 'Marrakesh', 'Tanger'],
  population: 37500000,
  mainLanguages: ['Arabic (Darija Moroccan)', 'Berber Tamazight', 'French'],
  currency: 'Moroccan dirham (MAD)',
  timezone: 'Africa/Casablanca',
  foundingLeader: 'Mohammed V (sovereignty transition era)',
  currentLeader: 'King Mohammed VI; Head of Government Aziz Akhannouch — verify',
  cryptocurrencyExchanges: ['Regulatory evolution; peer markets reported'],
  stablecoin: 'Informal USDT',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['MA'],
  domesticPostService: CENSAD_DOMESTIC_POST_SERVICES['MA'],
  nationalBankingInstitutions: CENSAD_NATIONAL_BANKING_INSTITUTIONS['MA'],
  corporationFormationOffice: CENSAD_CORPORATION_FORMATION_OFFICES['MA'],
  newsOutlets: CENSAD_NEWS_OUTLETS['MA'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['MA'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['MA'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['MA'],
  rareEarths: CENSAD_RARE_EARTHS['MA'],
  stockExchange: 'Casablanca Stock Exchange',
  bondMarkets: CENSAD_BOND_MARKETS['MA'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['MA'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['MA'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['MA'],
  mainInternationalSeaport: CENSAD_MAIN_INTERNATIONAL_SEAPORTS['MA'],
}
