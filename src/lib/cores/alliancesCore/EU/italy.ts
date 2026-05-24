import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const italy: EuCountry = {
  name: 'Italy',
  iso3166Alpha2: 'IT',
  capital: 'Rome',
  coordinates: { latitude: 41.9028, longitude: 12.4964 },
  independence: '1946 republic; EU founding member lineage — informational',
  topMajorCities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo'],
  population: 58700000,
  mainLanguages: ['Italian', 'German (South Tyrol)', 'French (Valle d Aosta)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Rome',
  foundingLeader: 'Alcide De Gasperi (Republic / integration reference)',
  currentLeader: 'President Sergio Mattarella / successor — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['Conio', 'Young Platform', 'MiCA-aligned CASPs'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots',
  domesticCourierServices: EU_DOMESTIC_COURIERS['IT'],
  newsOutlets: EU_NEWS_OUTLETS['IT'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['IT'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['IT'],
  stockExchange: 'Euronext Milan (Borsa Italiana legacy)',
}
