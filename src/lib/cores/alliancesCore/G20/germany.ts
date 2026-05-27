import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G20_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { G20_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { G20_RARE_EARTHS } from './rareEarthsByIso'
import { G20_BOND_MARKETS } from './bondMarketsByIso'
import { G20_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const germany: G20Country = {
  name: 'Germany',
  iso3166Alpha2: 'DE',
  capital: 'Berlin',
  coordinates: { latitude: 52.52, longitude: 13.405 },
  independence:
    '1990 reunification continuity; Bonn then Berlin FRG lineage; IMF/G7 heavyweight; G20 founding member (finance track 1999; 2017 Hamburg leaders summit host) — informational',
  topMajorCities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
  population: 83200000,
  mainLanguages: ['German', 'Turkish (community)', 'Polish'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Berlin',
  foundingLeader: 'Konrad Adenauer (Federal Chancellor FRG; post-war economic reconstruction reference)',
  currentLeader: 'Federal President Frank-Walter Steinmeier; Federal Chancellor — verify',
  cryptocurrencyExchanges: ['Bitstamp EU', 'Börse Stuttgart Digital Custody narratives', 'MiCA licences'],
  stablecoin: 'EUR stablecoins; ECB digital euro projects — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['DE'],
  newsOutlets: G20_NEWS_OUTLETS['DE'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['DE'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['DE'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['DE'],
  rareEarths: G20_RARE_EARTHS['DE'],
  stockExchange: 'Deutsche Börse (Frankfurt)',
  bondMarkets: G20_BOND_MARKETS['DE'],
  mainInternationalAirport: G20_MAIN_INTERNATIONAL_AIRPORTS['DE'],
}
