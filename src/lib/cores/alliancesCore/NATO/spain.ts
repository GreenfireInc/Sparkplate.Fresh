import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { NATO_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const spain: NatoCountry = {
  name: 'Spain',
  iso3166Alpha2: 'ES',
  capital: 'Madrid',
  coordinates: { latitude: 40.4168, longitude: -3.7038 },
  independence:
    '1978 constitutional monarchy continuity; EU since 1986; NATO Ally since May 1982 Iberian pillar — informational',
  topMajorCities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza'],
  population: 48100000,
  mainLanguages: ['Spanish (Castilian)', 'Catalan / Basque / Galician (regions)', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Madrid',
  foundingLeader: 'Adolfo Suárez referendum reference — informational',
  currentLeader: 'King Felipe VI; President of Government Pedro Sánchez — verify elections',
  cryptocurrencyExchanges: ['Bit2Me', 'CNMV MiCA registry — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['ES'],
  newsOutlets: NATO_NEWS_OUTLETS['ES'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['ES'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['ES'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['ES'],
  rareEarths: NATO_RARE_EARTHS['ES'],
  stockExchange: 'BME / Euronext Spain consolidated context — informational',
  bondMarkets: NATO_BOND_MARKETS['ES'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['ES'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['ES'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['ES'],
}
