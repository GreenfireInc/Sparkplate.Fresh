import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

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
  newsOutlets: NATO_NEWS_OUTLETS['LV'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['LV'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['LV'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['LV'],
  rareEarths: NATO_RARE_EARTHS['LV'],
  stockExchange: 'Nasdaq Riga',
  bondMarkets: NATO_BOND_MARKETS['LV'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['LV'],
}
