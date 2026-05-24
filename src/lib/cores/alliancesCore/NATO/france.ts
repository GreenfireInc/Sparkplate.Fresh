import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const france: NatoCountry = {
  name: 'France',
  iso3166Alpha2: 'FR',
  capital: 'Paris',
  coordinates: { latitude: 48.8566, longitude: 2.3522 },
  independence:
    'Fifth Republic continuity; EU founding member; NATO founding Ally 1949-04-04 (Integrated Military Command evolution — informational)',
  topMajorCities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  population: 68000000,
  mainLanguages: ['French', 'Occitan / regional languages', 'Arabic (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Paris',
  foundingLeader: 'Charles de Gaulle Fourth/Fifth Republic reference — informational',
  currentLeader: 'President Emmanuel Macron; Prime Minister — verify',
  cryptocurrencyExchanges: ['Coinhouse', 'MiCA-compliant CASPs', 'Paymium'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['FR'],
  newsOutlets: NATO_NEWS_OUTLETS['FR'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['FR'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['FR'],
  stockExchange: 'Euronext Paris',
}
