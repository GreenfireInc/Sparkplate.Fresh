import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const austria: OecdCountry = {
  name: 'Austria',
  iso3166Alpha2: 'AT',
  capital: 'Vienna',
  coordinates: { latitude: 48.2082, longitude: 16.3738 },
  independence:
    '1955 State Treaty neutrality era; EU since 1995-01-01; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck'],
  population: 9100000,
  mainLanguages: ['German (Austrian Standard)', 'Bosnian / Croatian / Serbian (minority)', 'Turkish (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Vienna',
  foundingLeader: 'Leopold Figl (Federal Chancellor; republic reference)',
  currentLeader: 'Federal President / Federal Chancellor coalition — verify',
  cryptocurrencyExchanges: ['European MiCA-aligned providers; Kraken EUR', 'Bitpanda (AT)'],
  stablecoin: 'EUR-stable tokens under MiCA; USDC/USDT EUR pairs',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['AT'],
  newsOutlets: OECD_NEWS_OUTLETS['AT'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['AT'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['AT'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['AT'],
  rareEarths: OECD_RARE_EARTHS['AT'],
  stockExchange: 'Wiener Börse (Vienna Stock Exchange)',
  bondMarkets: OECD_BOND_MARKETS['AT'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['AT'],
}
