import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EU_RARE_EARTHS } from './rareEarthsByIso'
import { EU_BOND_MARKETS } from './bondMarketsByIso'

export const denmark: EuCountry = {
  name: 'Denmark',
  iso3166Alpha2: 'DK',
  capital: 'Copenhagen',
  coordinates: { latitude: 55.6761, longitude: 12.5683 },
  independence: 'Constitutional kingdom continuity; EU since 1973-01-01; euro opt-out — informational',
  topMajorCities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg'],
  population: 6000000,
  mainLanguages: ['Danish', 'English', 'German'],
  currency: 'Danish krone (DKK) — ECB peg regime',
  timezone: 'Europe/Copenhagen',
  foundingLeader: 'Frederik IX-era constitutional monarchy continuity — informational',
  currentLeader: 'Monarch Frederik X; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nordic fintech onboarding; MiCA-aligned EU passport'],
  stablecoin: 'DKK token pilots; predominantly EUR/USD crypto pairs',
  domesticCourierServices: EU_DOMESTIC_COURIERS['DK'],
  newsOutlets: EU_NEWS_OUTLETS['DK'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['DK'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['DK'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['DK'],
  rareEarths: EU_RARE_EARTHS['DK'],
  stockExchange: 'Nasdaq Copenhagen',
  bondMarkets: EU_BOND_MARKETS['DK'],
}
