import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CPTPP_NEWS_OUTLETS } from './newsOutletsByIso'
import { CPTPP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CPTPP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CPTPP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CPTPP_RARE_EARTHS } from './rareEarthsByIso'
import { CPTPP_BOND_MARKETS } from './bondMarketsByIso'
import { CPTPP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const japan: CptppCountry = {
  name: 'Japan',
  iso3166Alpha2: 'JP',
  capital: 'Tokyo',
  coordinates: { latitude: 35.6762, longitude: 139.6503 },
  independence: 'Sovereign state continuity; post-1945 constitutional monarchy era — informational',
  topMajorCities: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo'],
  population: 124000000,
  mainLanguages: ['Japanese', 'English', 'Ryukyuan languages'],
  currency: 'Japanese yen (JPY)',
  timezone: 'Asia/Tokyo',
  foundingLeader: 'Emperor Meiji (modern state reference); Yoshida Shigeru PM post-war — informational',
  currentLeader: 'Prime Minister — verify',
  cryptocurrencyExchanges: ['bitFlyer', 'Coincheck', 'GMO Coin', 'Global institutional participation'],
  stablecoin: 'Stablecoin issuance rules evolving — verify ; USDT limited domestic retail',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['JP'],
  newsOutlets: CPTPP_NEWS_OUTLETS['JP'],
  notableUniversities: CPTPP_NOTABLE_UNIVERSITIES['JP'],
  mainExportCommodities: CPTPP_MAIN_EXPORT_COMMODITIES['JP'],
  mainExportedElements: CPTPP_MAIN_EXPORTED_ELEMENTS['JP'],
  rareEarths: CPTPP_RARE_EARTHS['JP'],
  stockExchange: 'Tokyo Stock Exchange (TSE)',
  bondMarkets: CPTPP_BOND_MARKETS['JP'],
  mainInternationalAirport: CPTPP_MAIN_INTERNATIONAL_AIRPORTS['JP'],
}
