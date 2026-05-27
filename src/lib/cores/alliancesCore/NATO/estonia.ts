import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const estonia: NatoCountry = {
  name: 'Estonia',
  iso3166Alpha2: 'EE',
  capital: 'Tallinn',
  coordinates: { latitude: 59.437, longitude: 24.7536 },
  independence:
    '1991 Restoration; EU since 2004; euro 2011; NATO Ally since Mar 2004 Baltic Air Policing pillar — informational',
  topMajorCities: ['Tallinn', 'Tartu', 'Narva', 'Pärnu', 'Kohtla-Järve'],
  population: 1370000,
  mainLanguages: ['Estonian', 'Russian', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Tallinn',
  foundingLeader: 'Lennart Meri early republic reference — informational',
  currentLeader: 'President Alar Karis; Prime Minister — verify',
  cryptocurrencyExchanges: ['EU CASPs onboarding; Startup Estonia narratives — informational'],
  stablecoin: 'EUR stablecoins; MiCA-aligned — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['EE'],
  newsOutlets: NATO_NEWS_OUTLETS['EE'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['EE'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['EE'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['EE'],
  rareEarths: NATO_RARE_EARTHS['EE'],
  stockExchange: 'Nasdaq Tallinn',
  bondMarkets: NATO_BOND_MARKETS['EE'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['EE'],
}
