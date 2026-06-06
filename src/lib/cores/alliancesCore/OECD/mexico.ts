import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OECD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const mexico: OecdCountry = {
  name: 'Mexico',
  iso3166Alpha2: 'MX',
  capital: 'Mexico City',
  coordinates: { latitude: 19.4326, longitude: -99.1332 },
  independence:
    '1821 Mexican independence consolidated; OECD member since May 1994 — informational',
  topMajorCities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana'],
  population: 130000000,
  mainLanguages: ['Spanish', 'Nahuatl / indigenous languages', 'English (near-border business)'],
  currency: 'Mexican peso (MXN)',
  timezone: 'America/Mexico_City',
  foundingLeader:
    'Miguel Hidalgo y Costilla insurgency era; Benito Juárez reform reference — informational',
  currentLeader: 'President Claudia Sheinbaum — verify',
  cryptocurrencyExchanges: ['Bitso', 'CNBV fintech registration evolution — informational'],
  stablecoin: 'MXN fiat-backed issuance pilots vs informal USDT — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['MX'],
  newsOutlets: OECD_NEWS_OUTLETS['MX'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['MX'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['MX'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['MX'],
  rareEarths: OECD_RARE_EARTHS['MX'],
  stockExchange: 'Bolsa Mexicana de Valores (BMV)',
  bondMarkets: OECD_BOND_MARKETS['MX'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['MX'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['MX'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['MX'],
}
