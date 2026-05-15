import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const slovakia: EuCountry = {
  name: 'Slovakia',
  iso3166Alpha2: 'SK',
  capital: 'Bratislava',
  coordinates: { latitude: 48.1486, longitude: 17.1077 },
  independence: '1993 Velvet Divorce; EU 2004-05-01; Euro 2009 — informational',
  topMajorCities: ['Bratislava', 'Košice', 'Prešov', 'Žilina', 'Nitra'],
  population: 5400000,
  mainLanguages: ['Slovak', 'Hungarian (minority)', 'Romani'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Bratislava',
  foundingLeader: 'Michal Kováč (first president era reference)',
  currentLeader: 'President Peter Pellegrini; Prime Minister Robert Fico — verify',
  cryptocurrencyExchanges: ['European MiCA CASPs onboarding SK retail'],
  stablecoin: 'EUR stablecoins; banking integration',
  domesticCourierServices: EU_DOMESTIC_COURIERS['SK'],
  stockExchange: 'Bratislava Stock Exchange',
}
