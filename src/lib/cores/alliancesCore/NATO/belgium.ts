import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const belgium: NatoCountry = {
  name: 'Belgium',
  iso3166Alpha2: 'BE',
  capital: 'Brussels',
  coordinates: { latitude: 50.8503, longitude: 4.3517 },
  independence:
    '1830 Kingdom; EU founding Treaty of Rome lineage; NATO HQ host state; NATO founding Ally 1949-04-04 — informational',
  topMajorCities: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège'],
  population: 11800000,
  mainLanguages: ['Dutch (Flemish)', 'French', 'German'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Brussels',
  foundingLeader: 'Leopold I constitutional monarchy reference — informational',
  currentLeader: 'Monarch Philippe; Prime Minister — verify coalition',
  cryptocurrencyExchanges: ['Bitstamp (legacy BE ties)', 'EU-licensed CASPs MiCA-era'],
  stablecoin: 'EUR stablecoins; ECB digital euro exploratory',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['BE'],
  newsOutlets: NATO_NEWS_OUTLETS['BE'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['BE'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['BE'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['BE'],
  rareEarths: NATO_RARE_EARTHS['BE'],
  stockExchange: 'Euronext Brussels',
  bondMarkets: NATO_BOND_MARKETS['BE'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['BE'],
}
