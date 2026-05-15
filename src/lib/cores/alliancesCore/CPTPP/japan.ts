import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'

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
  stockExchange: 'Tokyo Stock Exchange (TSE)',
}
