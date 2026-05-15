import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const latvia: NatoCountry = {
  name: 'Latvia',
  iso3166Alpha2: 'LV',
  capital: 'Riga',
  coordinates: { latitude: 56.9496, longitude: 24.1052 },
  independence:
    '1991 Restoration; EU 2004; euro participant; NATO Ally since Mar 2004 Baltic pillar — informational',
  topMajorCities: ['Riga', 'Daugavpils', 'Liepāja', 'Jelgava', 'Jūrmala'],
  population: 1870000,
  mainLanguages: ['Latvian', 'Russian', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Riga',
  foundingLeader: 'Vaira Vīķe-Freiberga Western pivot reference — informational',
  currentLeader: 'President Edgars Rinkēvičs; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nasdaq Baltic; MiCA — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['LV'],
  stockExchange: 'Nasdaq Riga',
}
