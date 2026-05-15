import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'

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
  stockExchange: 'Deutsche Börse (Frankfurt)',
}
