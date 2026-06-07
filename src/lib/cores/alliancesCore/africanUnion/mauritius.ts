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
export const mauritius: AfricanUnionCountry = {
  name: 'Mauritius',
  iso3166Alpha2: 'MU',
  africanUnionStatus: 'member',
  capital: 'Port Louis',
  coordinates: { latitude: -20.1609, longitude: 57.5012 },
  independence: '1968-03-12',
  topMajorCities: ['Port Louis', 'Beau Bassin-Rose Hill', 'Vacoas-Phoenix', 'Curepipe', 'Quatre Bornes'],
  population: 1300000,
  mainLanguages: ['English', 'French', 'Mauritian Creole'],
  currency: 'Mauritian rupee (MUR)',
  timezone: 'Indian/Mauritius',
  foundingLeader: 'Seewoosagur Ramgoolam',
  currentLeader: 'Navin Ramgoolam (Prime Minister)',
  cryptocurrencyExchanges: ['Luno', 'Binance (international)', 'VALR (regional)'],
  stablecoin: 'USDT / USDC; offshore financial center activity',
  domesticCourierServices: AU_DOMESTIC_COURIERS['MU'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['MU'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['MU'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['MU'],
  newsOutlets: AU_NEWS_OUTLETS['MU'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['MU'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['MU'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['MU'],
  rareEarths: AU_RARE_EARTHS['MU'],
  stockExchange: 'Stock Exchange of Mauritius (SEM)',
  bondMarkets: AU_BOND_MARKETS['MU'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['MU'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['MU'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['MU'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['MU'],
}
