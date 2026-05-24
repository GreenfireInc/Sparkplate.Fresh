import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

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
  stockExchange: 'Bolsa Mexicana de Valores (BMV)',
}
