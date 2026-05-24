import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const spain: OecdCountry = {
  name: 'Spain',
  iso3166Alpha2: 'ES',
  capital: 'Madrid',
  coordinates: { latitude: 40.4168, longitude: -3.7038 },
  independence:
    '1978 constitution monarchy continuity; EU since 1986; euro participant; OECD founding member Aug 1961 — informational',
  topMajorCities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza'],
  population: 48100000,
  mainLanguages: ['Spanish (Castilian)', 'Catalan / Basque / Galician (regions)', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Madrid',
  foundingLeader: 'Adolfo Suárez democratic transition reference — informational',
  currentLeader: 'King Felipe VI; President of Government Pedro Sánchez — verify elections',
  cryptocurrencyExchanges: ['Bit2Me', 'CNMV MiCA registry — informational'],
  stablecoin: 'EUR stablecoins; Iberian liquidity — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['ES'],
  newsOutlets: OECD_NEWS_OUTLETS['ES'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['ES'],
  stockExchange: 'BME / Euronext Spain consolidation — informational',
}
