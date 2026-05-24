import type { G7Country } from './types'
import { G7_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G7_NEWS_OUTLETS } from './newsOutletsByIso'
import { G7_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G7_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const germany: G7Country = {
  name: 'Germany',
  iso3166Alpha2: 'DE',
  capital: 'Berlin',
  coordinates: { latitude: 52.52, longitude: 13.405 },
  independence:
    '1990 reunification continuity; Bonn then Berlin FRG lineage; IMF/G7 heavyweight economy — informational',
  topMajorCities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
  population: 83200000,
  mainLanguages: ['German', 'Turkish (community)', 'Polish'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Berlin',
  foundingLeader: 'Konrad Adenauer (Federal Chancellor FRG; post-war economic reconstruction reference)',
  currentLeader: 'Federal President Frank-Walter Steinmeier; Federal Chancellor — verify',
  cryptocurrencyExchanges: ['Bitstamp EU', 'Börse Stuttgart Digital Custody narratives', 'MiCA licences'],
  stablecoin: 'EUR stablecoins; ECB digital euro projects — informational',
  domesticCourierServices: G7_DOMESTIC_COURIERS['DE'],
  newsOutlets: G7_NEWS_OUTLETS['DE'],
  notableUniversities: G7_NOTABLE_UNIVERSITIES['DE'],
  mainExportCommodities: G7_MAIN_EXPORT_COMMODITIES['DE'],
  stockExchange: 'Deutsche Börse (Frankfurt)',
}
