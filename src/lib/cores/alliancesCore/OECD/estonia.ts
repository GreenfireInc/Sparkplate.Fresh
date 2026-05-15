import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const estonia: OecdCountry = {
  name: 'Estonia',
  iso3166Alpha2: 'EE',
  capital: 'Tallinn',
  coordinates: { latitude: 59.437, longitude: 24.7536 },
  independence:
    '1991 Restoration; EU since 2004-05-01; euro 2011; OECD member since Dec 2010 — informational',
  topMajorCities: ['Tallinn', 'Tartu', 'Narva', 'Pärnu', 'Kohtla-Järve'],
  population: 1370000,
  mainLanguages: ['Estonian', 'Russian', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Tallinn',
  foundingLeader: 'Lennart Meri (early republic reference)',
  currentLeader: 'President Alar Karis; Prime Minister — verify',
  cryptocurrencyExchanges: ['EU CASPs onboarding; Startup Estonia narratives — informational'],
  stablecoin: 'EUR stablecoins; digital euro preparedness — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['EE'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['EE'],
  stockExchange: 'Nasdaq Tallinn',
}
