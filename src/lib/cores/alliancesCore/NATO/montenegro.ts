import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'

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
  newsOutlets: NATO_NEWS_OUTLETS['ME'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['ME'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['ME'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['ME'],
  rareEarths: NATO_RARE_EARTHS['ME'],
  stockExchange: 'Montenegro Stock Exchange (thin — informational)',
  bondMarkets: NATO_BOND_MARKETS['ME'],
}
