import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const slovakia: OecdCountry = {
  name: 'Slovakia',
  iso3166Alpha2: 'SK',
  capital: 'Bratislava',
  coordinates: { latitude: 48.1486, longitude: 17.1077 },
  independence:
    '1993 Velvet Divorce Slovak line; EU 2004; euro participant; OECD member since Dec 2000 — informational',
  topMajorCities: ['Bratislava', 'Košice', 'Prešov', 'Žilina', 'Nitra'],
  population: 5400000,
  mainLanguages: ['Slovak', 'Hungarian (minority)', 'Romani'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Bratislava',
  foundingLeader: 'Michal Kováč early republic reference — informational',
  currentLeader: 'President Peter Pellegrini; Prime Minister Robert Fico — verify',
  cryptocurrencyExchanges: ['MiCA-aligned EU CASPs Slovak retail onboarding — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['SK'],
  newsOutlets: OECD_NEWS_OUTLETS['SK'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['SK'],
  stockExchange: 'Bratislava Stock Exchange',
}
