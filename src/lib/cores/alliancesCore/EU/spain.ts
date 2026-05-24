import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const spain: EuCountry = {
  name: 'Spain',
  iso3166Alpha2: 'ES',
  capital: 'Madrid',
  coordinates: { latitude: 40.4168, longitude: -3.7038 },
  independence: '1978 Constitution monarchy continuity; EU 1986; Euro — informational',
  topMajorCities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza'],
  population: 48100000,
  mainLanguages: ['Spanish (Castilian)', 'Catalan / Galician / Basque (co-official regions)', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Madrid',
  foundingLeader: 'Adolfo Suárez (transition reference)',
  currentLeader: 'King Felipe VI; President of Government Pedro Sánchez — verify elections',
  cryptocurrencyExchanges: ['Bit2Me', 'European MiCA registry ES CNMV'],
  stablecoin: 'EUR stablecoins; Iberian liquidity',
  domesticCourierServices: EU_DOMESTIC_COURIERS['ES'],
  newsOutlets: EU_NEWS_OUTLETS['ES'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['ES'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['ES'],
  stockExchange: 'BME Growth / Euronext Spain context',
}
