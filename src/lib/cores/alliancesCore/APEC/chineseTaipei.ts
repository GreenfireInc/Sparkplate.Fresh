import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

/**
 * Listed as **Chinese Taipei** in official APEC fora — informational.
 * Iso uses TW for interoperability with geographic datasets.
 */
export const chineseTaipei: ApecCountry = {
  name: 'Chinese Taipei',
  iso3166Alpha2: 'TW',
  capital: 'Taipei',
  coordinates: { latitude: 25.033, longitude: 121.5654 },
  independence:
    'Separate customs territory participates APEC as Chinese Taipei (MOFA arrangements — informational)',
  topMajorCities: ['Taipei', 'Kaohsiung', 'Taichung', 'Tainan', 'Taoyuan'],
  population: 23900000,
  mainLanguages: ['Traditional Chinese Mandarin', 'Taiwanese Hokkien', 'English education / semiconductor business'],
  currency: 'New Taiwan dollar (TWD)',
  timezone: 'Asia/Taipei',
  foundingLeader: 'Lee Teng-hui democratisation reference — informational',
  currentLeader: 'President Lai Ching-te — verify cross-strait diplomacy volatility',
  cryptocurrencyExchanges: ['MaiCoin MAX regulated VA platforms — informational'],
  stablecoin: 'Taiwan-dollar stable experiments FinTech Sandbox — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['TW'],
  newsOutlets: APEC_NEWS_OUTLETS['TW'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['TW'],
  stockExchange: 'Taiwan Stock Exchange TWSE Taipei',
}
