import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const estonia: EuCountry = {
  name: 'Estonia',
  iso3166Alpha2: 'EE',
  capital: 'Tallinn',
  coordinates: { latitude: 59.437, longitude: 24.7536 },
  independence: '1991 Restoration; EU since 2004-05-01; Euro 2011 — informational',
  topMajorCities: ['Tallinn', 'Tartu', 'Narva', 'Pärnu', 'Kohtla-Järve'],
  population: 1370000,
  mainLanguages: ['Estonian', 'Russian', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Tallinn',
  foundingLeader: 'Lennart Meri (early republic reference)',
  currentLeader: 'President Alar Karis; Prime Minister — verify',
  cryptocurrencyExchanges: ['e residency digital nomad onboarding; regulated EU CASPs'],
  stablecoin: 'EUR stablecoins; digital euro CBDC narratives',
  domesticCourierServices: EU_DOMESTIC_COURIERS['EE'],
  newsOutlets: EU_NEWS_OUTLETS['EE'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['EE'],
  stockExchange: 'Nasdaq Tallinn',
}
