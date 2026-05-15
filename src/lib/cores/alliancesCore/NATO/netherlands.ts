import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const netherlands: NatoCountry = {
  name: 'Netherlands',
  iso3166Alpha2: 'NL',
  capital: 'Amsterdam (constitutional); seat of government The Hague',
  coordinates: { latitude: 52.3676, longitude: 4.9041 },
  independence:
    'Kingdom constitution continuity; EU founding 1958; NATO founding Ally 1949-04-04 — informational',
  topMajorCities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
  population: 17800000,
  mainLanguages: ['Dutch', 'English', 'Turkish / Arabic (communities)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Amsterdam',
  foundingLeader: 'Willem Drees post-war reference — informational',
  currentLeader: 'Monarch Willem-Alexander; Prime Minister Dick Schoof — verify',
  cryptocurrencyExchanges: ['Bitstamp', 'MiCA-aligned AFM registry — informational'],
  stablecoin: 'EUR stablecoins; e-money institutions — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['NL'],
  stockExchange: 'Euronext Amsterdam',
}
