import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'

export const germany: OecdCountry = {
  name: 'Germany',
  iso3166Alpha2: 'DE',
  capital: 'Berlin',
  coordinates: { latitude: 52.52, longitude: 13.405 },
  independence:
    '1990 reunification continuity; FRG OECD lineage from Sep 1961 founding member — informational',
  topMajorCities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
  population: 83200000,
  mainLanguages: ['German', 'Turkish (community)', 'Polish'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Berlin',
  foundingLeader: 'Konrad Adenauer (Federal Chancellor FRG)',
  currentLeader: 'Federal President Frank-Walter Steinmeier; Chancellor — verify',
  cryptocurrencyExchanges: ['Bitstamp EU', 'Börse Stuttgart Digital Custody narratives', 'MiCA licences'],
  stablecoin: 'EUR stablecoins; ECB digital euro projects — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['DE'],
  newsOutlets: OECD_NEWS_OUTLETS['DE'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['DE'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['DE'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['DE'],
  rareEarths: OECD_RARE_EARTHS['DE'],
  stockExchange: 'Deutsche Börse (Frankfurt)',
  bondMarkets: OECD_BOND_MARKETS['DE'],
}
