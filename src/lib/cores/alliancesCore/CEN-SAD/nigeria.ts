import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'
import { CENSAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CENSAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const nigeria: CensadCountry = {
  name: 'Nigeria',
  iso3166Alpha2: 'NG',
  capital: 'Abuja',
  coordinates: { latitude: 9.0765, longitude: 7.3986 },
  independence: '1960-10-01',
  topMajorCities: ['Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt'],
  population: 232000000,
  mainLanguages: ['English', 'Hausa', 'Yoruba'],
  currency: 'Nigerian naira (NGN)',
  timezone: 'Africa/Lagos',
  foundingLeader: 'Nnamdi Azikiwe / Abubakar Tafawa Balewa era — informational',
  currentLeader: 'President Bola Tinubu — verify',
  cryptocurrencyExchanges: ['Luno', 'Yellow Card regional', 'informal OTC (CBN policy evolution — verify)'],
  stablecoin: 'eNaira (CBDC); USDT/USDC informal markets',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['NG'],
  newsOutlets: CENSAD_NEWS_OUTLETS['NG'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['NG'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['NG'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['NG'],
  rareEarths: CENSAD_RARE_EARTHS['NG'],
  stockExchange: 'Nigerian Exchange Group ( NGX )',
  bondMarkets: CENSAD_BOND_MARKETS['NG'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['NG'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['NG'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['NG'],
}
