import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const malta: EuCountry = {
  name: 'Malta',
  iso3166Alpha2: 'MT',
  capital: 'Valletta',
  coordinates: { latitude: 35.8989, longitude: 14.5146 },
  independence: '1964 UK independence; EU 2004-05-01; Euro 2008 — informational',
  topMajorCities: ['Birkirkara', 'Mosta', 'Qormi', 'Żabbar', 'San Pawl il-Baħar'],
  population: 540000,
  mainLanguages: ['Maltese', 'English', 'Italian'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Malta',
  foundingLeader: 'Dom Mintoff (Republic / EU path reference)',
  currentLeader: 'President Myriam Spiteri Debono / successor — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['Remote gaming licensed firms; MiCA EU passport base'],
  stablecoin: 'EUR stablecoins servicing',
  domesticCourierServices: EU_DOMESTIC_COURIERS['MT'],
  newsOutlets: EU_NEWS_OUTLETS['MT'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['MT'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['MT'],
  stockExchange: 'Malta Stock Exchange',
}
