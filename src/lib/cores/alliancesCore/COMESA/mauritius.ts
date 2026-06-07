import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { COMESA_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { COMESA_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMESA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMESA_RARE_EARTHS } from './rareEarthsByIso'
import { COMESA_BOND_MARKETS } from './bondMarketsByIso'
import { COMESA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMESA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { COMESA_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const mauritius: ComesaCountry = {
  name: 'Mauritius',
  iso3166Alpha2: 'MU',
  capital: 'Port Louis',
  coordinates: { latitude: -20.1609, longitude: 57.5012 },
  independence: '1968-03-12',
  topMajorCities: ['Port Louis', 'Beau Bassin-Rose Hill', 'Vacoas-Phoenix', 'Curepipe', 'Quatre Bornes'],
  population: 1300000,
  mainLanguages: ['English', 'French', 'Mauritian Creole'],
  currency: 'Mauritian rupee (MUR)',
  timezone: 'Indian/Mauritius',
  foundingLeader: 'Seewoosagur Ramgoolam (first Prime Minister)',
  currentLeader:
    'Prime Minister Navin Ramgoolam; Head of State (President) — verify (COMESA treaty signed Port Louis)',
  cryptocurrencyExchanges: ['Luno', 'Binance (international)', 'VALR (regional)'],
  stablecoin: 'USDT / USDC; offshore financial center activity',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['MU'],
  domesticPostService: COMESA_DOMESTIC_POST_SERVICES['MU'],
  nationalBankingInstitutions: COMESA_NATIONAL_BANKING_INSTITUTIONS['MU'],
  corporationFormationOffice: COMESA_CORPORATION_FORMATION_OFFICES['MU'],
  newsOutlets: COMESA_NEWS_OUTLETS['MU'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['MU'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['MU'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['MU'],
  rareEarths: COMESA_RARE_EARTHS['MU'],
  stockExchange: 'Stock Exchange of Mauritius (SEM)',
  bondMarkets: COMESA_BOND_MARKETS['MU'],
  intellectualPropertyDepartments: COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS['MU'],
  securitiesExchangeCommission: COMESA_SECURITIES_EXCHANGE_COMMISSIONS['MU'],
  mainInternationalAirport: COMESA_MAIN_INTERNATIONAL_AIRPORTS['MU'],
  mainInternationalSeaport: COMESA_MAIN_INTERNATIONAL_SEAPORTS['MU'],
}
