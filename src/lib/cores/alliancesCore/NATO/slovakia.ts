import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const slovakia: NatoCountry = {
  name: 'Slovakia',
  iso3166Alpha2: 'SK',
  capital: 'Bratislava',
  coordinates: { latitude: 48.1486, longitude: 17.1077 },
  independence:
    '1993 Velvet Divorce; EU 2004 euro participant; NATO Ally since Mar 2004 — informational',
  topMajorCities: ['Bratislava', 'Košice', 'Prešov', 'Žilina', 'Nitra'],
  population: 5400000,
  mainLanguages: ['Slovak', 'Hungarian (minority)', 'Romani'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Bratislava',
  foundingLeader: 'Michal Kováč referendum — informational',
  currentLeader: 'President Peter Pellegrini; Prime Minister Robert Fico — verify',
  cryptocurrencyExchanges: ['MiCA CASPs Slovak retail onboarding — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['SK'],
  newsOutlets: NATO_NEWS_OUTLETS['SK'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['SK'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['SK'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['SK'],
  rareEarths: NATO_RARE_EARTHS['SK'],
  stockExchange: 'Bratislava Stock Exchange',
  bondMarkets: NATO_BOND_MARKETS['SK'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['SK'],
}
