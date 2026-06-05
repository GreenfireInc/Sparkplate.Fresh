import type { MiktaCountry } from './types'
import { MIKTA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { MIKTA_NEWS_OUTLETS } from './newsOutletsByIso'
import { MIKTA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { MIKTA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { MIKTA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { MIKTA_RARE_EARTHS } from './rareEarthsByIso'
import { MIKTA_BOND_MARKETS } from './bondMarketsByIso'
import { MIKTA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { MIKTA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { MIKTA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const mexico: MiktaCountry = {
  name: 'Mexico',
  iso3166Alpha2: 'MX',
  capital: 'Mexico City',
  coordinates: { latitude: 19.4326, longitude: -99.1332 },
  independence:
    '1821 Mexican independence from Spain consolidated; bicentennial federation; G20 middle-power voice in MIKTA cross-regional consultative grouping — informational',
  topMajorCities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana'],
  population: 130000000,
  mainLanguages: ['Spanish', 'Nahuatl / indigenous languages', 'English (near-border business)'],
  currency: 'Mexican peso (MXN)',
  timezone: 'America/Mexico_City',
  foundingLeader:
    'Miguel Hidalgo y Costilla insurgency era; Porfirio Díaz / modern state references — informational',
  currentLeader: 'President Claudia Sheinbaum — verify',
  cryptocurrencyExchanges: ['Bitso', 'Mexico CNBV fintech-registration evolution — informational'],
  stablecoin: 'MXN fiat-backed issuance pilots vs informal USDT — informational',
  domesticCourierServices: MIKTA_DOMESTIC_COURIERS['MX'],
  newsOutlets: MIKTA_NEWS_OUTLETS['MX'],
  notableUniversities: MIKTA_NOTABLE_UNIVERSITIES['MX'],
  mainExportCommodities: MIKTA_MAIN_EXPORT_COMMODITIES['MX'],
  mainExportedElements: MIKTA_MAIN_EXPORTED_ELEMENTS['MX'],
  rareEarths: MIKTA_RARE_EARTHS['MX'],
  stockExchange: 'Mexican Stock Exchange BMV Bolsa Mexicana de Valores',
  bondMarkets: MIKTA_BOND_MARKETS['MX'],
  mainInternationalAirport: MIKTA_MAIN_INTERNATIONAL_AIRPORTS['MX'],
  intellectualPropertyDepartments: MIKTA_INTELLECTUAL_PROPERTY_DEPARTMENTS['MX'],
  securitiesExchangeCommission: MIKTA_SECURITIES_EXCHANGE_COMMISSIONS['MX'],
}
