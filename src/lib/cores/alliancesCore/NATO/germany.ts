import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const germany: NatoCountry = {
  name: 'Germany',
  iso3166Alpha2: 'DE',
  capital: 'Berlin',
  coordinates: { latitude: 52.52, longitude: 13.405 },
  independence:
    '1990 reunification continuity; EU founding lineage; NATO Ally FRG ascension May 1955 reunified state inherits — informational',
  topMajorCities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
  population: 83200000,
  mainLanguages: ['German', 'Turkish (community)', 'Polish'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Berlin',
  foundingLeader: 'Konrad Adenauer transatlantic embed reference — informational',
  currentLeader: 'Federal President Frank-Walter Steinmeier; Chancellor — verify',
  cryptocurrencyExchanges: ['Bitstamp EU', 'MiCA licences Deutsche Börse narratives — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['DE'],
  newsOutlets: NATO_NEWS_OUTLETS['DE'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['DE'],
  stockExchange: 'Deutsche Börse (Frankfurt)',
}
