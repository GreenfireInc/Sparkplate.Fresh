import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EU_RARE_EARTHS } from './rareEarthsByIso'
import { EU_BOND_MARKETS } from './bondMarketsByIso'

export const belgium: EuCountry = {
  name: 'Belgium',
  iso3166Alpha2: 'BE',
  capital: 'Brussels',
  coordinates: { latitude: 50.8503, longitude: 4.3517 },
  independence: '1830 Kingdom; EU founding state (Treaty of Rome 1957) — informational',
  topMajorCities: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège'],
  population: 11800000,
  mainLanguages: ['Dutch (Flemish)', 'French', 'German'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Brussels',
  foundingLeader: 'EU institutions host; Érasme / Leopold I national reference — informational',
  currentLeader: 'Monarch Philippe; Prime Minister — verify coalition',
  cryptocurrencyExchanges: ['Bitstamp (legacy BE ties)', 'EU-licensed CASPs MiCA-era'],
  stablecoin: 'EUR stablecoins; ECB digital euro exploratory',
  domesticCourierServices: EU_DOMESTIC_COURIERS['BE'],
  newsOutlets: EU_NEWS_OUTLETS['BE'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['BE'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['BE'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['BE'],
  rareEarths: EU_RARE_EARTHS['BE'],
  stockExchange: 'Euronext Brussels',
  bondMarkets: EU_BOND_MARKETS['BE'],
}
