import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const lithuania: EuCountry = {
  name: 'Lithuania',
  iso3166Alpha2: 'LT',
  capital: 'Vilnius',
  coordinates: { latitude: 54.6872, longitude: 25.2797 },
  independence: '1990 Restoration; EU 2004-05-01; Euro 2015 — informational',
  topMajorCities: ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys'],
  population: 2800000,
  mainLanguages: ['Lithuanian', 'Russian', 'Polish (minority)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Vilnius',
  foundingLeader: 'Vytautas Landsbergis (Sąjūdis reference)',
  currentLeader: 'President Gitanas Nausėda; Prime Minister — verify',
  cryptocurrencyExchanges: ['EU-licensed onboarding; Baltic fintech'],
  stablecoin: 'EUR stablecoins; ECB digital euro research participation',
  domesticCourierServices: EU_DOMESTIC_COURIERS['LT'],
  stockExchange: 'Nasdaq Vilnius',
}
