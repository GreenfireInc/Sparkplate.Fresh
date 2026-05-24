import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const lithuania: OecdCountry = {
  name: 'Lithuania',
  iso3166Alpha2: 'LT',
  capital: 'Vilnius',
  coordinates: { latitude: 54.6872, longitude: 25.2797 },
  independence:
    '1990 Restoration; EU 2004; euro participant; OECD member since Jul 2018 — informational',
  topMajorCities: ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys'],
  population: 2800000,
  mainLanguages: ['Lithuanian', 'Russian', 'Polish (minority)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Vilnius',
  foundingLeader: 'Vytautas Landsbergis (Sąjūdis reference)',
  currentLeader: 'President Gitanas Nausėda; Prime Minister — verify',
  cryptocurrencyExchanges: ['EU onboarding; Baltic fintech — informational'],
  stablecoin: 'EUR stablecoins; digital euro preparedness — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['LT'],
  newsOutlets: OECD_NEWS_OUTLETS['LT'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['LT'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['LT'],
  stockExchange: 'Nasdaq Vilnius',
}
