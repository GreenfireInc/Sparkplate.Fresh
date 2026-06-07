import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { COMMONWEALTH_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const malta: CommonwealthCountry = {
  name: 'Malta',
  iso3166Alpha2: 'MT',
  commonwealthStatus: 'member',
  capital: 'Valletta',
  coordinates: { latitude: 35.8989, longitude: 14.5146 },
  independence: '1964-09-21',
  topMajorCities: ['Birkirkara', 'Mosta', 'Qormi', 'Żabbar', 'Valletta'],
  population: 535000,
  mainLanguages: ['Maltese', 'English', 'Italian'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Malta',
  foundingLeader: 'Giorgio Borg Olivier (first Prime Minister)',
  currentLeader: 'Robert Abela (Prime Minister) — verify',
  cryptocurrencyExchanges: ['EU-licensed venues', 'Binance', 'Kraken'],
  stablecoin: 'EUR stablecoins (MiCA); USDT',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['MT'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['MT'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['MT'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['MT'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['MT'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['MT'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['MT'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['MT'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['MT'],
  stockExchange: 'Malta Stock Exchange',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['MT'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['MT'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['MT'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['MT'],
}
