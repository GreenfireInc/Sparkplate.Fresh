import type { G7Country } from './types'
import { G7_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G7_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const france: G7Country = {
  name: 'France',
  iso3166Alpha2: 'FR',
  capital: 'Paris',
  coordinates: { latitude: 48.8566, longitude: 2.3522 },
  independence:
    'Fifth Republic continuity; G7 Rambouillet host context (France as convener — informational)',
  topMajorCities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  population: 68000000,
  mainLanguages: ['French', 'Occitan / regional languages', 'Arabic (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Paris',
  foundingLeader: 'Charles de Gaulle (Fifth Republic reference; post-war IMF/Bretton Woods continuity — informational)',
  currentLeader: 'President Emmanuel Macron; Prime Minister — verify',
  cryptocurrencyExchanges: ['Coinhouse', 'European MiCA-compliant CASPs', 'Paymium'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots — informational',
  domesticCourierServices: G7_DOMESTIC_COURIERS['FR'],
  notableUniversities: G7_NOTABLE_UNIVERSITIES['FR'],
  stockExchange: 'Euronext Paris',
}
