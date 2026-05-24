import type { MintCountry } from './types'
import { MINT_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { MINT_NEWS_OUTLETS } from './newsOutletsByIso'
import { MINT_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { MINT_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const mexico: MintCountry = {
  name: 'Mexico',
  iso3166Alpha2: 'MX',
  capital: 'Mexico City',
  coordinates: { latitude: 19.4326, longitude: -99.1332 },
  independence:
    '1821 Mexican independence from Spain consolidated; bicentennial federation; large emerging-consumer market MINT acronym context — informational',
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
  domesticCourierServices: MINT_DOMESTIC_COURIERS['MX'],
  newsOutlets: MINT_NEWS_OUTLETS['MX'],
  notableUniversities: MINT_NOTABLE_UNIVERSITIES['MX'],
  mainExportCommodities: MINT_MAIN_EXPORT_COMMODITIES['MX'],
  stockExchange: 'Mexican Stock Exchange BMV Bolsa Mexicana de Valores',
}
