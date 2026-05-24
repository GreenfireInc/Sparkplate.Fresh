import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const chile: ApecCountry = {
  name: 'Chile',
  iso3166Alpha2: 'CL',
  capital: 'Santiago',
  coordinates: { latitude: -33.4489, longitude: -70.6693 },
  independence:
    '1818 Spanish-American independence lineage; Pacific Latin America copper-export APEC pillar — informational',
  topMajorCities: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta'],
  population: 19500000,
  mainLanguages: ['Spanish', 'Mapudungun (Mapuche)', 'English (business)'],
  currency: 'Chilean peso (CLP)',
  timezone: 'America/Santiago',
  foundingLeader: 'Augusto Pinochet-to-democracy economists Chicago Boys contrast — informational',
  currentLeader: 'President — verify electoral calendar',
  cryptocurrencyExchanges: ['Buda LATAM onboarding; CMF supervision — informational'],
  stablecoin: 'CLP digital pilots thin — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['CL'],
  newsOutlets: APEC_NEWS_OUTLETS['CL'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['CL'],
  stockExchange: 'Bolsa de Santiago',
}
