import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const germany: EuCountry = {
  name: 'Germany',
  iso3166Alpha2: 'DE',
  capital: 'Berlin',
  coordinates: { latitude: 52.52, longitude: 13.405 },
  independence: '1990 reunification state; EU founding member continuity — informational',
  topMajorCities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
  population: 83200000,
  mainLanguages: ['German', 'Turkish (community)', 'Polish'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Berlin',
  foundingLeader: 'Konrad Adenauer (Federal Chancellor FRG)',
  currentLeader: 'Federal President Frank-Walter Steinmeier; Chancellor — verify',
  cryptocurrencyExchanges: ['Bitstamp EU', 'Börse Stuttgart Digital Custody narratives', 'MiCA licences'],
  stablecoin: 'EUR stablecoins; ECB digital euro projects',
  domesticCourierServices: EU_DOMESTIC_COURIERS['DE'],
  newsOutlets: EU_NEWS_OUTLETS['DE'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['DE'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['DE'],
  stockExchange: 'Deutsche Börse (Frankfurt)',
}
