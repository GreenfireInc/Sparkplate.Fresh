import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const montenegro: NatoCountry = {
  name: 'Montenegro',
  iso3166Alpha2: 'ME',
  capital: 'Podgorica',
  coordinates: { latitude: 42.4304, longitude: 19.2594 },
  independence:
    '2006 independence referendum from State Union; EU candidate; NATO Ally since Jun 2017 — informational',
  topMajorCities: ['Podgorica', 'Nikšić', 'Herceg Novi', 'Pljevlja', 'Bar'],
  population: 620000,
  mainLanguages: ['Montenegrin', 'Serbian', 'Bosnian / Albanian communities'],
  currency: 'Euro (EUR) unilateral adoption de facto — informational',
  timezone: 'Europe/Podgorica',
  foundingLeader: 'Milo Đukanović transition-longevity reference — informational',
  currentLeader: 'President Jakov Milatović — verify; Prime Minister Milojko Spajić — verify',
  cryptocurrencyExchanges: ['EU-adjacent brokers; regional OTC — informational'],
  stablecoin: 'EUR informal dominant; USDT overlays — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['ME'],
  stockExchange: 'Montenegro Stock Exchange (thin — informational)',
}
