import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EU_RARE_EARTHS } from './rareEarthsByIso'
import { EU_BOND_MARKETS } from './bondMarketsByIso'

export const latvia: EuCountry = {
  name: 'Latvia',
  iso3166Alpha2: 'LV',
  capital: 'Riga',
  coordinates: { latitude: 56.9496, longitude: 24.1052 },
  independence: '1991 Restoration; EU 2004-05-01; Euro 2014 — informational',
  topMajorCities: ['Riga', 'Daugavpils', 'Liepāja', 'Jelgava', 'Jūrmala'],
  population: 1870000,
  mainLanguages: ['Latvian', 'Russian', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Riga',
  foundingLeader: 'Vaira Vīķe-Freiberga (EU accession-era reference)',
  currentLeader: 'President Edgars Rinkēvičs; Prime Minister — verify',
  cryptocurrencyExchanges: ['Baltic-regulated gateways; Nasdaq Baltic'],
  stablecoin: 'EUR stablecoins; MiCA supervision',
  domesticCourierServices: EU_DOMESTIC_COURIERS['LV'],
  newsOutlets: EU_NEWS_OUTLETS['LV'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['LV'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['LV'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['LV'],
  rareEarths: EU_RARE_EARTHS['LV'],
  stockExchange: 'Nasdaq Riga',
  bondMarkets: EU_BOND_MARKETS['LV'],
}
