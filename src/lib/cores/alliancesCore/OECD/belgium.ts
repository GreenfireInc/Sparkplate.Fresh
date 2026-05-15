import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const belgium: OecdCountry = {
  name: 'Belgium',
  iso3166Alpha2: 'BE',
  capital: 'Brussels',
  coordinates: { latitude: 50.8503, longitude: 4.3517 },
  independence:
    '1830 Kingdom; EU founding state (Treaty of Rome); OECD founding member Sep 1961 — informational',
  topMajorCities: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège'],
  population: 11800000,
  mainLanguages: ['Dutch (Flemish)', 'French', 'German'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Brussels',
  foundingLeader: 'EU institutions host; Leopold I constitutional monarchy reference — informational',
  currentLeader: 'Monarch Philippe; Prime Minister — verify coalition',
  cryptocurrencyExchanges: ['Bitstamp (legacy BE ties)', 'EU-licensed CASPs MiCA-era'],
  stablecoin: 'EUR stablecoins; ECB digital euro exploratory',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['BE'],
  stockExchange: 'Euronext Brussels',
}
