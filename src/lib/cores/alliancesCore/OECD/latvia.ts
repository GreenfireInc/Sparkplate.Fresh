import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const latvia: OecdCountry = {
  name: 'Latvia',
  iso3166Alpha2: 'LV',
  capital: 'Riga',
  coordinates: { latitude: 56.9496, longitude: 24.1052 },
  independence:
    '1991 Restoration; EU 2004; euro participant; OECD member since Jul 2016 — informational',
  topMajorCities: ['Riga', 'Daugavpils', 'Liepāja', 'Jelgava', 'Jūrmala'],
  population: 1870000,
  mainLanguages: ['Latvian', 'Russian', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Riga',
  foundingLeader: 'Vaira Vīķe-Freiberga (Western integration reference)',
  currentLeader: 'President Edgars Rinkēvičs; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nasdaq Baltic context; MiCA supervision — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['LV'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['LV'],
  stockExchange: 'Nasdaq Riga',
}
