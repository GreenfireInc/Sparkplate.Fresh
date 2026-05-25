import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_NEWS_OUTLETS } from './newsOutletsByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ASEAN_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ASEAN_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ASEAN_RARE_EARTHS } from './rareEarthsByIso'
import { ASEAN_BOND_MARKETS } from './bondMarketsByIso'

export const vietnam: AseanCountry = {
  name: 'Vietnam',
  iso3166Alpha2: 'VN',
  capital: 'Hanoi',
  coordinates: { latitude: 21.0285, longitude: 105.8542 },
  independence:
    '1945 proclaimed Democratic Republic lineage; reunification 1975; ASEAN member since Jul 1995 — informational',
  topMajorCities: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Haiphong', 'Can Tho'],
  population: 100300000,
  mainLanguages: ['Vietnamese', 'English', 'Khmer / Hmong ethnic languages regional'],
  currency: 'Vietnamese dong (VND)',
  timezone: 'Asia/Ho_Chi_Minh',
  foundingLeader:
    'Hồ Chí Minh independence reference; Đổi Mới reform-era stewardship — informational',
  currentLeader:
    'Communist Party General Secretary — verify; State President — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['State prohibition retail crypto trading; OTC informal — informational'],
  stablecoin: 'State bank pilot digital currency narratives; predominately VND fiat — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['VN'],
  newsOutlets: ASEAN_NEWS_OUTLETS['VN'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['VN'],
  mainExportCommodities: ASEAN_MAIN_EXPORT_COMMODITIES['VN'],
  mainExportedElements: ASEAN_MAIN_EXPORTED_ELEMENTS['VN'],
  rareEarths: ASEAN_RARE_EARTHS['VN'],
  stockExchange: 'Ho Chi Minh Stock Exchange; Hanoi Stock Exchange (consolidated plans — informational)',
  bondMarkets: ASEAN_BOND_MARKETS['VN'],
}
