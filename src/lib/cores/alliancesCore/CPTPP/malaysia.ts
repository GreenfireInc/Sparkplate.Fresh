import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CPTPP_NEWS_OUTLETS } from './newsOutletsByIso'
import { CPTPP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CPTPP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CPTPP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CPTPP_RARE_EARTHS } from './rareEarthsByIso'
import { CPTPP_BOND_MARKETS } from './bondMarketsByIso'

export const malaysia: CptppCountry = {
  name: 'Malaysia',
  iso3166Alpha2: 'MY',
  capital: 'Kuala Lumpur',
  coordinates: { latitude: 3.139, longitude: 101.6869 },
  independence: '1957-08-31 (Federation evolution; Malaysia 1963 — informational)',
  topMajorCities: ['Kuala Lumpur', 'George Town', 'Ipoh', 'Shah Alam', 'Johor Bahru'],
  population: 34700000,
  mainLanguages: ['Malay', 'Chinese (Mandarin & dialects)', 'English'],
  currency: 'Malaysian ringgit (MYR)',
  timezone: 'Asia/Kuala_Lumpur',
  foundingLeader: 'Tunku Abdul Rahman (first Prime Minister)',
  currentLeader: 'Prime Minister Anwar Ibrahim — verify',
  cryptocurrencyExchanges: ['Luno', 'Tokenize', 'Regulated DAX evolution — verify'],
  stablecoin: 'MYR token pilots; USDT dominant informal',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['MY'],
  newsOutlets: CPTPP_NEWS_OUTLETS['MY'],
  notableUniversities: CPTPP_NOTABLE_UNIVERSITIES['MY'],
  mainExportCommodities: CPTPP_MAIN_EXPORT_COMMODITIES['MY'],
  mainExportedElements: CPTPP_MAIN_EXPORTED_ELEMENTS['MY'],
  rareEarths: CPTPP_RARE_EARTHS['MY'],
  stockExchange: 'Bursa Malaysia',
  bondMarkets: CPTPP_BOND_MARKETS['MY'],
}
