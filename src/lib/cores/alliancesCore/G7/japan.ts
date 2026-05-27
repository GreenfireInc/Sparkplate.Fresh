import type { G7Country } from './types'
import { G7_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G7_NEWS_OUTLETS } from './newsOutletsByIso'
import { G7_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G7_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { G7_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { G7_RARE_EARTHS } from './rareEarthsByIso'
import { G7_BOND_MARKETS } from './bondMarketsByIso'
import { G7_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const japan: G7Country = {
  name: 'Japan',
  iso3166Alpha2: 'JP',
  capital: 'Tokyo',
  coordinates: { latitude: 35.6762, longitude: 139.6503 },
  independence:
    'Modern nation-state Meiji restoration continuity; occupied-era constitution 1947; OECD/G7 heavyweight — informational',
  topMajorCities: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo'],
  population: 124500000,
  mainLanguages: ['Japanese', 'Korean (community)', 'English (education / business)'],
  currency: 'Japanese yen (JPY)',
  timezone: 'Asia/Tokyo',
  foundingLeader: 'Post-war Yoshida Shigeru (economic diplomacy / IMF anchor reference — informational)',
  currentLeader: 'Prime Minister — verify (Liberal Democratic Party–led cabinets rotate)',
  cryptocurrencyExchanges: ['bitFlyer', 'Zaif / registered PSAP-era providers — informational'],
  stablecoin: 'JPY-stable experiments; Bank of Japan CBDC pilots — informational',
  domesticCourierServices: G7_DOMESTIC_COURIERS['JP'],
  newsOutlets: G7_NEWS_OUTLETS['JP'],
  notableUniversities: G7_NOTABLE_UNIVERSITIES['JP'],
  mainExportCommodities: G7_MAIN_EXPORT_COMMODITIES['JP'],
  mainExportedElements: G7_MAIN_EXPORTED_ELEMENTS['JP'],
  rareEarths: G7_RARE_EARTHS['JP'],
  stockExchange: 'Tokyo Stock Exchange (Japan Exchange Group)',
  bondMarkets: G7_BOND_MARKETS['JP'],
  mainInternationalAirport: G7_MAIN_INTERNATIONAL_AIRPORTS['JP'],
}
