import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'

export const ireland: OecdCountry = {
  name: 'Ireland',
  iso3166Alpha2: 'IE',
  capital: 'Dublin',
  coordinates: { latitude: 53.3498, longitude: -6.2603 },
  independence:
    '1922 Dominion to republic evolution; EU since 1973; euro participant; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford'],
  population: 5300000,
  mainLanguages: ['English', 'Irish (Gaelige)', 'Polish (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Dublin',
  foundingLeader: 'Éamon de Valera (early state reference)',
  currentLeader: 'President Michael D. Higgins; Taoiseach — verify',
  cryptocurrencyExchanges: ['Kraken EU', 'IDA tech hub onboarding; MiCA-aligned — informational'],
  stablecoin: 'EUR stablecoins; Irish issuer vehicles referencing SFDR — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['IE'],
  newsOutlets: OECD_NEWS_OUTLETS['IE'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['IE'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['IE'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['IE'],
  rareEarths: OECD_RARE_EARTHS['IE'],
  stockExchange: 'Euronext Dublin',
  bondMarkets: OECD_BOND_MARKETS['IE'],
}
